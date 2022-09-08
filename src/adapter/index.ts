import { BaseDatabase, BaseResource, PropertyType } from 'adminjs';
import KnexFunction, { Knex } from 'knex';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { ResourceInfo } from '../info/ResourceInfo';
import { ConnectionOptions } from '../typing/ConnectionOptions';
import { Database } from './Database';
import { Property } from './Property';
import { Resource } from './Resource';

export class Adapter {
  public static Database: typeof BaseDatabase = Database as any;
  public static Resource: typeof BaseResource = Resource as any;
  private constructor() {}

  public static async database(
    options: ConnectionOptions
  ): Promise<DatabaseInfo> {
    if (!options?.database) {
      throw new Error('options.database is undefined');
    }

    const knex = KnexFunction({ client: 'mysql2', connection: options });
    const tableNames = await this.getTableNames(knex, options.database);
    const resources = await this.getResources(
      knex,
      options.database,
      tableNames
    );
    const resourceMap = new Map<string, ResourceInfo>();
    resources.forEach((r) => {
      resourceMap.set(r.tableName, r);
    });

    return new DatabaseInfo(options.database, resourceMap);
  }

  private static async getTableNames(
    knex: Knex,
    databaseName: string
  ): Promise<string[]> {
    const query = await knex.raw(`show tables from \`${databaseName}\``);
    const [res] = await query;
    const key = Object.keys(res[0])[0];
    return res.map((r: any) => r[key]);
  }

  private static async getResources(
    knex: Knex,
    databaseName: string,
    tableNames: string[]
  ): Promise<ResourceInfo[]> {
    return Promise.all(
      tableNames.map(async (tableName) => {
        return new ResourceInfo(
          databaseName,
          tableName,
          await this.getProperties(knex, databaseName, tableName)
        );
      })
    );
  }

  private static async getProperties(
    knex: Knex,
    databaseName: string,
    tableName: string
  ): Promise<Property[]> {
    const query = knex
      .from('information_schema.columns as col')
      .select(
        'col.column_name',
        'col.ordinal_position',
        'col.column_default',
        'col.is_nullable',
        'col.data_type',
        'col.column_type',
        'col.column_key',
        'col.extra',
        'col.column_comment',
        'key.referenced_table_name',
        'key.referenced_column_name'
      )
      .leftJoin('information_schema.key_column_usage as key', (c) =>
        c
          .on('key.table_schema', 'col.table_schema')
          .on('key.table_name', 'col.table_name')
          .on('key.column_name', 'col.column_name')
          .on('key.referenced_table_schema', 'col.table_schema')
      )
      .where('col.table_schema', databaseName)
      .where('col.table_name', tableName);
    const rows = await query;
    return rows.map((row) => this.newProperty(row));
  }

  private static newProperty(row: {
    COLUMN_NAME: string;
    ORDINAL_POSITION: number;
    COLUMN_DEFAULT: string | null;
    IS_NULLABLE: 'NO' | 'YES';
    DATA_TYPE: string;
    COLUMN_TYPE: string;
    COLUMN_KEY: '' | 'PRI' | 'UNI' | 'MUL';
    EXTRA: string;
    COLUMN_COMMENT: string;
    REFERENCED_TABLE_NAME: string | null;
    REFERENCED_COLUMN_NAME: string | null;
  }): Property {
    const type = row.DATA_TYPE.toLowerCase();
    const columnType = row.COLUMN_TYPE.toLowerCase();
    let availableValues: string[] | null = null;
    if (type === 'set' || type === 'enum') {
      if (!columnType.startsWith(type)) {
        throw new Error('Unexpected condition. Please issue me.');
      }
      availableValues = columnType
        .split(type)[1]
        .replace(/^\('/, '')
        .replace(/'\)$/, '')
        .split("','");
    }
    const isSet = type === 'set';
    const isReference = row.REFERENCED_TABLE_NAME && row.REFERENCED_TABLE_NAME;
    const isId = row.COLUMN_KEY === 'PRI';
    const isRequired = row.IS_NULLABLE === 'NO' && row.COLUMN_DEFAULT === null;
    return new Property(
      row.COLUMN_NAME,
      isId,
      true,
      true,
      availableValues,
      isRequired,
      isSet,
      row.REFERENCED_TABLE_NAME,
      row.REFERENCED_COLUMN_NAME,
      row.ORDINAL_POSITION,
      isReference ? 'reference' : this.ensureType(type, columnType),
      isId,
      true
    );
  }

  private static ensureType(
    dataType: string,
    columnType: string
  ): PropertyType {
    switch (dataType) {
      case 'char':
      case 'varchar':
      case 'binary':
      case 'varbinary':
      case 'tinyblob':
      case 'blob':
      case 'mediumblob':
      case 'longblob':
      case 'enum':
      case 'set':
      case 'time':
      case 'year':
        return 'string';

      case 'tinytext':
      case 'text':
      case 'mediumtext':
      case 'longtext':
        return 'textarea';

      case 'bit':
      case 'smallint':
      case 'mediumint':
      case 'int':
      case 'integer':
      case 'bigint':
        return 'number';

      case 'float':
      case 'double':
      case 'decimal':
      case 'dec':
        return 'float';

      case 'tinyint':
        if (columnType === 'tinyint(1)') {
          return 'boolean';
        }
        return 'number';

      case 'bool':
      case 'boolean':
        return 'boolean';

      case 'date':
        return 'date';

      case 'datetime':
      case 'timestamp':
        return 'datetime';

      default:
        console.warn(
          `Unexpected type: ${dataType} ${columnType} fallback to string`
        );
        return 'string';
    }
  }
}
