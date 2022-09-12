import { Adapter } from '../../src/index';
import { DatabaseInfo } from '../../src/info/DatabaseInfo';
import { Client } from '../../src/typing/Client';
import { ConnectionOptions } from '../../src/typing/ConnectionOptions';

export interface ITest {
  init: (db: string) => Promise<DatabaseInfo>;
}

interface Schema {
  databases: DatabaseSchema[];
}

interface DatabaseSchema {
  name: string;
  tables: TableSchema[];
}

interface TableSchema {
  name: string;
  columns: ColumnSchema[];
}

interface ColumnSchema {
  name: string;
}

export function initMysql(): ITest {
  return init('mysql2', {
    host: 'localhost',
    port: 33301,
    user: 'root',
    password: 'password',
  });
}

export function initMariadb(): ITest {
  return init('mysql2', {
    host: 'localhost',
    port: 33302,
    user: 'root',
    password: 'password',
  });
}

function init(
  client: Client,
  connection: Omit<ConnectionOptions, 'database'>
): ITest {
  return {
    init: (database: string) =>
      Adapter.init(client, { ...connection, database }),
  };
}

export function testCommon({ init }: ITest) {
  test('when no database', async () => {
    try {
      await init('asdfasdf');
      fail('init must failed with no database');
    } catch (e) {}
  });

  test('when no tables', async () => {
    const info = await init('no_tables');
    expect(info.tables()).toHaveLength(0);
  });
}
