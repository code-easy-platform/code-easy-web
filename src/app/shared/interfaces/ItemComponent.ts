import { Utils } from "code-easy-components";

import { IProperties } from "../components/properties-editor/shared/interfaces";
import { DefaultPropsHelper } from '../services/helpers/DefaultPropsHelper';
import { ComponentType } from "../enuns/ComponentType";
import { ItemFlowComplete } from "./ItemFlowComponent";
import { BaseFields } from "./BaseFields";


/**
 * Compõem as configurações dos seguintes items: "Items de fluxo", "pasta" e "Abas internas(as de cima da arvorê)".
 */
export class ComponentConfigs implements BaseFields {
    public id: string | undefined;
    public label: string;
    public name: string;
    public ordem?: number;
    public description: string;
    public type: ComponentType;
    public isEditing: boolean;
    public isExpanded?: boolean;

    constructor(
        private fields: {
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
            type: ComponentType,
            isExpanded?: boolean;
        }
    ) {
        this.id = this.fields.id;
        this.type = this.fields.type;
        this.name = this.fields.name;
        this.label = this.fields.label;
        this.isEditing = this.fields.isEditing;
        this.isExpanded = this.fields.isExpanded;
        this.description = this.fields.description;
        this.ordem = this.fields.ordem;
    }

}

interface IItemComponent extends BaseFields {
    /** Usado para conter os items de um fluxo */
    items: ItemFlowComplete[];
    /** Usado para poder indicar ao fluxo de items qual items de uma árvore está sendo editado no momento */
    isEditing: boolean;
    /** Indica onde o item está selecionado na árvore. */
    isSelected: boolean;
    /** Usado para arvore ajuda a sabe se o item é uma pasta ou um arquivo */
    type: ComponentType;
    /** Indica se um node(nó) de uma arvore está aberto ou fechado. */
    nodeExpanded: boolean;
    /** Usado para fazer auto referência usado para construir árvores */
    itemPaiId: string | undefined;
    /** Usado para lista todas as propriedades de um item */
    properties: IProperties[];

}
export class ItemComponent implements IItemComponent {
    public id: string | undefined;
    public name: string;
    public label: string;
    public ordem?: number;
    public description: string;

    /** Usado para conter os items de um fluxo */
    public items: ItemFlowComplete[];
    /** Usado para poder indicar ao fluxo de items qual items de uma árvore está sendo editado no momento */
    public isEditing: boolean;
    /** Indica onde o item está selecionado na árvore. */
    public isSelected: boolean;
    /** Usado para arvore ajuda a sabe se o item é uma pasta ou um arquivo */
    public type: ComponentType;
    /** Indica se um node(nó) de uma arvore está aberto ou fechado. */
    public nodeExpanded: boolean;
    /** Usado para fazer auto referência usado para construir árvores */
    public itemPaiId: string | undefined;
    /** Usado para lista todas as propriedades de um item */
    public properties: IProperties[] = [];

    constructor(
        private _fields: {
            id: string | undefined;
            /**
            * Usado para identificar um registro dentro do sistema.
            * 
            *  * Não pode ter espaço
            *  * Não pode ter caracteres especiais
            *  * Não pode ser vazio
            */
            name?: string;
            /**
             * Usado para nomear um registro apenas de forma visual
             */
            label: string;
            ordem?: number;
            isEditing: boolean;
            isSelected: boolean;
            description: string;
            type: ComponentType;
            nodeExpanded: boolean;
            /** Usado para lista todas as propriedades de um item */
            properties?: IProperties[];
            items: ItemFlowComplete[];
            itemPaiId: string | undefined;
        }
    ) {
        this.id = this._fields.id;
        this.type = this._fields.type;
        this.label = this._fields.label;
        this.ordem = this._fields.ordem || 0;
        this.itemPaiId = this._fields.itemPaiId;
        this.isEditing = this._fields.isEditing;
        this.isSelected = this._fields.isSelected;
        this.description = this._fields.description;
        this.nodeExpanded = this._fields.nodeExpanded;
        this.properties = this._fields.properties || [];
        this.name = Utils.getNormalizedString(this._fields.name || '');
        this.items = this._fields.items.map(item => new ItemFlowComplete(item));

        this._updateProperties(this._fields.properties || [], this._fields.type);
    }

    private _updateProperties(properties: IProperties[], type: ComponentType) {
        const originalProperties = DefaultPropsHelper.getNewProps(type, this.label, (this.type === ComponentType.routerConsume || this.type === ComponentType.routerExpose));

        originalProperties.forEach(originalProp => {
            if (!properties.some(prop => prop.propertieType === originalProp.propertieType)) {
                properties.push(originalProp);
            }
        });

        this.properties = properties;
    }

}
