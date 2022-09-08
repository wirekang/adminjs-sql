import type { Knex } from 'knex';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { parse } from '../parser';
import { Client } from '../typing/Client';
import { ConnectionOptions } from '../typing/ConnectionOptions';
import { Database } from './Database';
import { Resource } from './Resource';

/**
 * @example
 * import { Adapter } from 'adminjs-sql';
 * AdminJS.registerAdapter(Adapter);
 */
export class Adapter {
  /**
   * You don't need to access this property. Looking for {@link Adapter.init}?
   */
  public static Database: any = Database;
  public static Resource: any = Resource;
  private constructor() {}

  /**
   * Read database schema for AdminJS. All parameters are directly passed to {@link Knex}.
   *
   * @param client sql driver name.
   * @param connection connectionOptions.
   * @example
   * const database = await Adapter.init('mysql2', {
   *    host: DB_HOST,
   *    user: DB_USER,
   *    password: DB_PASSWORD,
   *    database: DB_DATABASE,
   *  })
   */
  public static async init(
    client: Client,
    connection: ConnectionOptions
  ): Promise<DatabaseInfo> {
    return parse(client, connection);
  }
}
