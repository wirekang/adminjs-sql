import { BaseDatabase, BaseResource } from 'adminjs';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { parse } from '../parser';
import { Client } from '../typing/Client';
import { ConnectionOptions } from '../typing/ConnectionOptions';
import { Database } from './Database';
import { Resource } from './Resource';

export class Adapter {
  public static Database: typeof BaseDatabase = Database as any;
  public static Resource: typeof BaseResource = Resource as any;
  private constructor() {}

  public static async database(
    client: Client,
    connection: ConnectionOptions
  ): Promise<DatabaseInfo> {
    return parse(client, connection);
  }
}
