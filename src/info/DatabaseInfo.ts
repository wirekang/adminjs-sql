import { ResourceInfo } from './ResourceInfo';

export class DatabaseInfo {
  constructor(
    public readonly databaseName: string,
    private resourceMap: Map<string, ResourceInfo>
  ) {}

  public tables(): ResourceInfo[] {
    return Array.from(this.resourceMap.values());
  }

  public table(tableName: string): ResourceInfo {
    const r = this.resourceMap.get(tableName);
    if (!r) {
      throw new Error(`Table not exists: ${this.databaseName}.${tableName}`);
    }
    return r;
  }
}
