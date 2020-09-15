import { IBasicFields } from "../interfaces";

/**
 * Compõem as configurações dos seguintes items: "Items de fluxo", "pasta" e "Abas internas(as de cima da arvorê)".
 */
export class BasicConfigs implements IBasicFields {
    public name: string;
    public label: string;
    public ordem?: number;
    public updatedDate: Date;
    public createdDate: Date;
    public description: string;
    public id: string | undefined;

    constructor(
        private _fields: IBasicFields,
    ) {
        this.id = this._fields.id;
        this.updatedDate = new Date();
        this.name = this._fields.name;
        this.label = this._fields.label;
        this.ordem = this._fields.ordem;
        this.description = this._fields.description;
        this.createdDate = this._fields.createdDate || new Date();
    }
}
