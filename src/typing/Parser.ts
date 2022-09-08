import { DatabaseInfo } from '../info/DatabaseInfo';
import { Client } from './Client';
import { ConnectionOptions } from './ConnectionOptions';

export interface Parser {
  clients: Client[];
  parse: (
    client: Client,
    connection: ConnectionOptions
  ) => Promise<DatabaseInfo>;
}
