import { Client } from '../typing/Client';
import { ConnectionOptions } from '../typing/ConnectionOptions';
import { Parser } from '../typing/Parser';
import { mysqlParser } from './mysql';

const parsers: Parser[] = [mysqlParser];

export function parse(client: Client, connection: ConnectionOptions) {
  const p = parsers.find((p) => p.clients.includes(client));
  if (!p) {
    throw new Error(`${client} is not supported.`);
  }

  return p.parse(client, connection);
}
