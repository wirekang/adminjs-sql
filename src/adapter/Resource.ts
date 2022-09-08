import {
  BaseRecord,
  BaseResource,
  Filter,
  ParamsType,
  SupportedDatabasesType,
} from 'adminjs';
import { ResourceInfo } from '../info/ResourceInfo';
import { Property } from './Property';

export class Resource extends BaseResource {
  static override isAdapterFor(resource: any): boolean {
    const r = resource instanceof ResourceInfo;
    if (!r) {
      if (Array.isArray(resource) && resource[0] instanceof ResourceInfo) {
        throw new Error(
          'resource is an array. Did you forgot `...` before `db.tables()`?'
        );
      }
    }
    return r;
  }

  constructor(private readonly info: ResourceInfo) {
    super(info.tableName);
  }

  override databaseName(): string {
    return this.info.databaseName;
  }

  override databaseType(): SupportedDatabasesType | string {
    return 'MySQL';
  }

  override id(): string {
    return this.info.tableName;
  }

  override properties(): Property[] {
    return this.info.properties;
  }

  override property(path: string): Property | null {
    return this.info.properties.find((v) => v.path() === path) ?? null;
  }

  override async count(filter: Filter): Promise<number> {
    console.log('count', filter);
    return 0;
  }

  override async find(
    filter: Filter,
    options: {
      limit?: number;
      offset?: number;
      sort?: {
        sortBy?: string;
        direction?: 'asc' | 'desc';
      };
    }
  ): Promise<BaseRecord[]> {
    return [];
  }

  override async findOne(id: string): Promise<BaseRecord | null> {
    console.log('findOne', id);
    return null;
  }

  override async findMany(ids: (string | number)[]): Promise<BaseRecord[]> {
    console.log('findMany', ids);
    return [];
  }

  override build(params: Record<string, any>): BaseRecord {
    console.log('build', params);
    return new BaseRecord(params, this);
  }

  override async create(params: Record<string, any>): Promise<ParamsType> {
    console.log('create', params);
    return params;
  }

  override async update(
    id: string,
    params: Record<string, any>
  ): Promise<ParamsType> {
    console.log('update', id, params);
    return params;
  }

  override async delete(id: string): Promise<void> {
    console.log('delete', id);
  }
}
