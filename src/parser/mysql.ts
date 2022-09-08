import { PropertyType } from 'adminjs';
import KnexF, { Knex } from 'knex';
import { Property } from '../adapter/Property';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { ResourceInfo } from '../info/ResourceInfo';
import { Client } from '../typing/Client';
import { Parser } from '../typing/Parser';
import { lowerCaseProperty } from '../utils/object';

export const mysqlParser: Parser = {
  clients: ['mysql', 'mysql2'],
  parse: async (client, connection) => {
    if (!connection?.database) {
      throw new Error('connection.database is undefined');
    }
    const knex = KnexF({ client, connection });
    const tableNames = await getTableNames(knex, connection.database);
    const resources = await getResources(
      client,
      knex,
      connection.database,
      tableNames
    );
    const resourceMap = new Map<string, ResourceInfo>();
    resources.forEach((r) => {
      resourceMap.set(r.tableName, r);
    });

    return new DatabaseInfo(connection.database, resourceMap);
  },
};

async function getTableNames(
  knex: Knex,
  databaseName: string
): Promise<string[]> {
  const query = await knex.raw(`show tables from \`${databaseName}\``);
  const [res] = await query;
  const key = Object.keys(res[0])[0];
  return res.map((r: any) => r[key]);
}

async function getResources(
  client: Client,
  knex: Knex,
  databaseName: string,
  tableNames: string[]
): Promise<ResourceInfo[]> {
  return Promise.all(
    tableNames.map(async (tableName) => {
      return new ResourceInfo(
        client,
        knex,
        databaseName,
        tableName,
        await getProperties(knex, databaseName, tableName)
      );
    })
  );
}

async function getProperties(
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
  return rows.map((row) => newProperty(lowerCaseProperty(row)));
}

function newProperty(row: {
  column_name: string;
  ordinal_position: number;
  column_default: string | null;
  is_nullable: 'NO' | 'YES';
  data_type: string;
  column_type: string;
  column_key: string;
  extra: string;
  column_comment: string;
  referenced_table_name: string | null;
  referenced_column_name: string | null;
}): Property {
  const type = row.data_type.toLowerCase();
  const columnType = row.column_type.toLowerCase();
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
  const isReference = row.referenced_table_name && row.referenced_table_name;
  const isId = row.column_key.toLowerCase() === 'pri';
  let isRequired =
    row.is_nullable.toLowerCase() === 'no' && row.column_default === null;
  if (isId && row.extra.toLowerCase() === 'auto_increment') {
    isRequired = false;
  }
  return new Property(
    row.column_name,
    isId,
    true,
    true,
    availableValues,
    isRequired,
    isSet,
    row.referenced_table_name,
    row.referenced_column_name,
    row.ordinal_position,
    isReference ? 'reference' : ensureType(type, columnType),
    isId,
    true
  );
}

function ensureType(dataType: string, columnType: string): PropertyType {
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
