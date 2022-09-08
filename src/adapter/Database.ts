import { BaseDatabase, PropertyType } from 'adminjs';
import { Knex } from 'knex';
import { DatabaseInfo } from '../info/DatabaseInfo';
import { Property } from './Property';
import { Resource } from './Resource';

export class Database extends BaseDatabase {
  public static override isAdapterFor(info: any): boolean {
    return info instanceof DatabaseInfo;
  }

  constructor(info: DatabaseInfo) {
    super(info.databaseName);
  }

  override resources(): Resource[] {
    return [];
  }
}
