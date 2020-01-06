import ProjectType from "../enuns/ProjectType";
import ComponentType from "../enuns/ComponentType";
import { FluxoComponentTypes } from "../enuns/FluxoList";


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
    public itens: Component[];

    constructor(
        private fields: {
            configs: ComponentConfigs;
            itens: Component[];
        }
    ) {
        this.configs = this.fields.configs;
        this.itens = this.fields.itens;
    }
}

export class Component {
    public id: number;
    public paiId: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;
    public title: string;
    public fluxoItemTypes: FluxoComponentTypes;
    public isHaveSucessor: boolean;
    public isHaveAntecessor: boolean;
    public antecessorId: number;
    public sucessorId: number;
    public configs: ComponentConfigs;

    constructor(
        private fields: {
            id: number;
            paiId: number;
            top: number;
            left: number;
            width: number;
            height: number;
            title: string;
            fluxoItemTypes: FluxoComponentTypes;
            isHaveSucessor: boolean;
            isHaveAntecessor: boolean;
            antecessorId: number;
            sucessorId: number;
            configs: ComponentConfigs;
        }
    ) {
        this.id = this.fields.id;
        this.paiId = this.fields.paiId;
        this.top = this.fields.top;
        this.left = this.fields.left;
        this.width = this.fields.width;
        this.height = this.fields.height;
        this.title = this.fields.title;
        this.fluxoItemTypes = this.fields.fluxoItemTypes;
        this.isHaveSucessor = this.fields.isHaveSucessor;
        this.isHaveAntecessor = this.fields.isHaveAntecessor;
        this.antecessorId = this.fields.antecessorId;
        this.sucessorId = this.fields.sucessorId;
        this.configs = this.fields.configs;
    }
}

/**
 * Compõem as configurações de um item de fluxo ou uma pasta.
 */
export class ComponentConfigs {
    public name: string;
    public description: string;
    public type: ComponentType;
    public isEditando: boolean;
    public isExpanded?: boolean;

    constructor(
        private fields: {
            name: string,
            description: string,
            type: ComponentType,
            isEditando: boolean;
            isExpanded?: boolean,
        }
    ) {
        this.name = this.fields.name;
        this.description = this.fields.description;
        this.type = this.fields.type;
        this.isEditando = this.fields.isEditando;
        this.isExpanded = this.fields.isExpanded;
    }
}

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
export interface ProjectConfigs {
    name: string;
    description: string;
    type: ProjectType;
    version: string;
    autor: string;
    currentProcess: string;
}

export const EMPTY_COMPONENT_CONFIGS = new ComponentConfigs({
    name: "",
    description: "",
    type: ComponentType.flowItem,
    isExpanded: false,
    isEditando: false
});
// Constantes para agilizar.
export const EMPTY_COMPONENT = new Component({
    id: 0,
    title: "",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    fluxoItemTypes: FluxoComponentTypes.flowItem,
    isHaveAntecessor: false,
    isHaveSucessor: false,
    antecessorId: 0,
    sucessorId: 0,
    paiId: 0,
    configs: EMPTY_COMPONENT_CONFIGS,
});
