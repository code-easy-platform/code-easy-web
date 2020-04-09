import { TreeItensTypes } from "../components/tree-manager/shared/models/TreeItensTypes";
import { FlowItem, ItemType } from "../components/code-editor/models/ItemFluxo";
import { ComponentType } from "../enuns/ComponentType";
import { ProjectType } from "../enuns/ProjectType";
import { IProperties } from "../components/properties-editor/shared/interfaces";


interface BaseFields {
    /**
     * Usado como identificador do registro
     * 
     * * Se ***undefined*** significa que o registro está sendo criado novo ou a partir de outro.
     */
    id: string | undefined;
    /**
     * Usado para identificar um registro de forma visual.
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
    /**
     * Usado para descrever algum detalhe do registro
     */
    description: string;

    // Aqui vai o campo para a lista de proriedades.
}

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
export interface ProjectConfigs extends BaseFields {
    id: string | undefined;
    name: string;
    label: string;
    description: string;
    type: ProjectType;
    version: string;
    autor: string;
    currentProcess: string;
}

export class Project {
    public projectConfigs: ProjectConfigs;
    public tabs: Tab[];

    constructor(
        private fields: {
            projectConfigs: ProjectConfigs;
            tabs: Tab[];
        }
    ) {
        this.projectConfigs = this.fields.projectConfigs;
        this.tabs = this.fields.tabs;
    }
}

export class Tab {
    public configs: ComponentConfigs;
    public itens: ItemComponent[];

    constructor(
        private _fields: {
            configs: ComponentConfigs;
            itens: ItemComponent[];
        }
    ) {
        this.configs = this._fields.configs;
        this.itens = this._fields.itens;
    }
}

/**
 * Compõem as configurações dos seguintes itens: "Itens de fluxo", "pasta" e "Abas internas(as de cima da arvorê)".
 */
export class ComponentConfigs implements BaseFields {
    public id: string | undefined;
    public label: string;
    public name: string;
    public description: string;
    public type: ComponentType;
    public isEditando: boolean;
    public isExpanded?: boolean;

    constructor(
        private fields: {
            id: string | undefined,
            name: string,
            label: string,
            description: string,
            type: ComponentType,
            isEditando: boolean;
            isExpanded?: boolean,
        }
    ) {
        this.id = this.fields.id;
        this.name = this.fields.name;
        this.label = this.fields.label;
        this.description = this.fields.description;
        this.type = this.fields.type;
        this.isEditando = this.fields.isEditando;
        this.isExpanded = this.fields.isExpanded;
    }
}

export class ItemFlowComplete extends FlowItem {
    public itemType: ItemType = ItemType.START;
    public properties: IProperties[] = [];
    public isSelected: boolean = false;
    public sucessor: string[] = [];
    public id: string | undefined;
    public height: number = 0;
    public width: number = 0;
    public name: string = "";
    public left: number = 0;
    public select = () => {};
    public top: number = 0;

    constructor(
        props: {
            properties: IProperties[],
            isSelected: boolean,
            id: string | undefined,
            sucessor: string[],
            itemType: ItemType,
            height: number,
            width: number,
            name: string,
            left: number,
            top: number,
        },
    ) {
        super(props);
        this.isSelected = props.isSelected;
        this.properties = props.properties;
        this.sucessor = props.sucessor;
        this.itemType = props.itemType;
        this.height = props.height;
        this.width = props.width;
        this.name = props.name;
        this.left = props.left;
        this.top = props.top;
        this.id = props.id;
    }

}

export class ItemComponent implements BaseFields {
    public id: string | undefined;
    public name: string;
    public label: string;
    public description: string;

    /** Usado para conter os itens de um fluxo */
    public itens: ItemFlowComplete[];
    /** Usado para poder indicar ao fluxo de itens qual itens de uma árvore está sendo editado no momento */
    public isEditing: boolean;
    /** Indica onde o item está selecionado na árvore. */
    public isSelected: boolean;
    /** Usado para arvore ajuda a sabe se o item é uma pasta ou um arquivo */
    public type: TreeItensTypes;
    /** Indica se um node(nó) de uma arvore está aberto ou fechado. */
    public nodeExpanded: boolean;
    /** Usado para fazer auto referência usado para construir árvores */
    public itemPaiId: string | undefined;

    constructor(
        private _fields: {
            id: string;
            name: string;
            label: string;
            itens: ItemFlowComplete[];
            isEditing: boolean;
            isSelected: boolean;
            description: string;
            type: TreeItensTypes;
            nodeExpanded: boolean;
            itemPaiId: string | undefined;
        }
    ) {
        this.id = this._fields.id;
        this.name = this._fields.name;
        this.type = this._fields.type;
        this.label = this._fields.label;
        this.itens = this._fields.itens;
        this.itemPaiId = this._fields.itemPaiId;
        this.isEditing = this._fields.isEditing;
        this.isSelected = this._fields.isSelected;
        this.description = this._fields.description;
        this.nodeExpanded = this._fields.nodeExpanded;
    }
}
