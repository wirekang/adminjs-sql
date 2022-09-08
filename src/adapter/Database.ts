import { BaseDatabase } from 'adminjs';
import { DatabaseInfo } from '../info/DatabaseInfo';
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
