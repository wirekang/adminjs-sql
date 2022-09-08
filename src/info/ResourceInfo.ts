import { Property } from '../adapter/Property';

export class ResourceInfo {
  constructor(
    public readonly databaseName: string,
    public readonly tableName: string,
    public readonly properties: Property[]
  ) {}
}
