import { BaseProperty, PropertyType } from 'adminjs';

export class Property extends BaseProperty {
  constructor(
    public readonly columnName: string,
    private readonly _isTitle: boolean,
    private readonly _isVisible: boolean,
    private readonly _isEditable: boolean,
    private readonly _availableValues: string[] | null,
    private readonly _isRequired: boolean,
    private readonly _isSet: boolean,
    private readonly _referenceTableName: string | null,
    private readonly _referenceColumnName: string | null,
    position: number,
    type: PropertyType,
    isId: boolean,
    isSortable: boolean
  ) {
    super({
      path: columnName,
      isId,
      isSortable,
      position,
      type,
    });
  }

  override name(): string {
    return this.columnName;
  }

  override path(): string {
    return this.columnName;
  }

  override isTitle(): boolean {
    return this._isTitle;
  }

  override isVisible(): boolean {
    return this._isVisible;
  }

  override isEditable(): boolean {
    return this._isEditable;
  }

  override reference(): string | null {
    return this._referenceTableName;
  }

  override availableValues(): Array<string> | null {
    return this._availableValues;
  }

  override isArray(): boolean {
    return this._isSet;
  }

  override isDraggable(): boolean {
    return this._isSet;
  }

  override subProperties(): BaseProperty[] {
    return [];
  }

  override isRequired(): boolean {
    return this._isRequired;
  }
}
