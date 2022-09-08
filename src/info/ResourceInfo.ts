import { Knex } from 'knex';
import { Property } from '../adapter/Property';
import { Client } from '../typing/Client';

export class ResourceInfo {
  public idProperty: Property;
  constructor(
    public client: Client,
    public readonly knex: Knex,
    public readonly databaseName: string,
    public readonly tableName: string,
    public readonly properties: Property[]
  ) {
    const idProperty = properties.find((p) => p.isId());
    if (!idProperty) {
      throw new Error(`table ${tableName} has no primary key`);
    }

    this.idProperty = idProperty;
  }
}
