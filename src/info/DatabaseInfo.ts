import type AdminJS from 'adminjs';
import { Knex } from 'knex';
import { ResourceInfo } from './ResourceInfo';

/**
 * Pass this object to {@link AdminJS}'s `databases`
 * @example
 *  const adminJs = new AdminJS({
 *    databases: [database],
 *    // ...
 *  })
 */
export class DatabaseInfo {
  constructor(
    public readonly databaseName: string,
    private resourceMap: Map<string, ResourceInfo>
  ) {}

  /**
   * Get ALL tables in database.
   *
   * @example
   * const adminJs = new AdminJS({
   *   databases: [database],
   *   resources: database.tables(),
   * });
   */
  public tables(): ResourceInfo[] {
    return Array.from(this.resourceMap.values());
  }

  /**
   * Get specific table.
   * @example
   * const adminJs = new AdminJS({
   *   databases: [database],
   *   resources: [
   *    database.table('users'),
   *    database.table('posts'),
   *   ],
   * });
   */
  public table(tableName: string): ResourceInfo {
    const r = this.resourceMap.get(tableName);
    if (!r) {
      throw new Error(`Table not exists: ${this.databaseName}.${tableName}`);
    }
    return r;
  }
}
