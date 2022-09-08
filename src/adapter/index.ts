import { BaseDatabase, BaseResource } from 'adminjs';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { parse } from '../parser';
import { Client } from '../typing/Client';
import { ConnectionOptions } from '../typing/ConnectionOptions';
import { Database } from './Database';
import { Resource } from './Resource';
import type { Knex } from 'knex';

export class Adapter {
  public static Database: typeof BaseDatabase = Database as any;
  public static Resource: typeof BaseResource = Resource as any;
  private constructor() {}

  /**
   * Read database schema for AdminJS. All parameters are directly passed to {@link Knex}.
   *
   * @param client sql driver name.
   * @param connection connectionOptions.
   * @example
   * const database = await Adapter.database('mysql2', {
   *    host: DB_HOST,
   *    user: DB_USER,
   *    password: DB_PASSWORD,
   *    database: DB_DATABASE,
   *  })
   */
  public static async database(
    client: Client,
    connection: ConnectionOptions
  ): Promise<DatabaseInfo> {
    return parse(client, connection);
  }
}
