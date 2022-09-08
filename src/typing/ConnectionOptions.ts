export type ConnectionOptions = MySqlConnectionConfig;

// types from 'knex'
interface MariaSslConfiguration {
  key?: string;
  cert?: string;
  ca?: string;
  capath?: string;
  cipher?: string;
  rejectUnauthorized?: boolean;
  expirationChecker?(): boolean;
}

// Config object for mysql: https://github.com/mysqljs/mysql#connection-options
interface MySqlConnectionConfig {
  host?: string;
  port?: number;
  localAddress?: string;
  socketPath?: string;
  user?: string;
  password?: string;
  database?: string;
  charset?: string;
  timezone?: string;
  connectTimeout?: number;
  stringifyObjects?: boolean;
  insecureAuth?: boolean;
  typeCast?: any;
  queryFormat?: (query: string, values: any) => string;
  supportBigNumbers?: boolean;
  bigNumberStrings?: boolean;
  dateStrings?: boolean;
  debug?: boolean;
  trace?: boolean;
  multipleStatements?: boolean;
  flags?: string;
  ssl?: string | MariaSslConfiguration;
  decimalNumbers?: boolean;
  expirationChecker?(): boolean;
}
