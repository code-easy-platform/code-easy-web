import { IItemComponentConfigs } from "../interfaces";
import { EComponentType } from "../enuns";

export class ItemComponentConfigs implements IItemComponentConfigs {
    public name: string;
    public label: string;
    public ordem?: number;
    public updatedDate: Date;
    public createdDate: Date;
    public isEditing: boolean;
    public isSelected: boolean;
    public description: string;
    public isExpanded: boolean;
    public type: EComponentType;
    public id: string | undefined;

    constructor(
        private _fields: IItemComponentConfigs,
    ) {
        this.id = this._fields.id;
        this.updatedDate = new Date();
        this.name = this._fields.name;
        this.type = this._fields.type;
        this.label = this._fields.label;
        this.ordem = this._fields.ordem;
        this.isEditing = this._fields.isEditing;
        this.isSelected = this._fields.isSelected;
        this.description = this._fields.description;
        this.isExpanded = Boolean(this._fields.isExpanded);
        this.createdDate = this._fields.createdDate || new Date();
    }
}
