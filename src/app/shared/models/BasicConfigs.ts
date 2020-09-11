import { IBasicFields } from "../interfaces";
import { EComponentType } from "../enuns";

/**
 * Compõem as configurações dos seguintes items: "Items de fluxo", "pasta" e "Abas internas(as de cima da arvorê)".
 */
export class BasicConfigs implements IBasicFields {
    public name: string;
    public label: string;
    public ordem?: number;
    public isEditing: boolean;
    public description: string;
    public type: EComponentType;
    public isExpanded?: boolean;
    public id: string | undefined;

    constructor(
        private _fields: {
            id: string | undefined,
            /**
            * Usado para identificar um registro dentro do sistema.
            * 
            *  * Não pode ter espaço
            *  * Não pode ter caracteres especiais
            *  * Não pode ser vazio
            */
            name: string;
            /**
             * Usado para nomear um registro apenas de forma visual
             */
            label: string;
            ordem?: number;
            isEditing: boolean;
            description: string,
            type: EComponentType,
            isExpanded?: boolean;
        }
    ) {
        this.id = this._fields.id;
        this.type = this._fields.type;
        this.name = this._fields.name;
        this.label = this._fields.label;
        this.ordem = this._fields.ordem;
        this.isEditing = this._fields.isEditing;
        this.isExpanded = this._fields.isExpanded;
        this.description = this._fields.description;
    }
}