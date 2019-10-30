import ProjectType from "../enuns/ProjectType";
import ItemType from "../enuns/ItemType";
import { FluxoItemTypes } from "../../pages/editor/tabs/editor-tab/components/code-editor/enuns/FluxoList";


export class Application {
    public projectConfigs: ProjectConfigs;
    public routers: ContentTabClass;
    public actions: ContentTabClass;
    public data: ContentTabClass;

    constructor(
        public fields: {
            projectConfigs: ProjectConfigs,
            routers: ContentTabClass,
            actions: ContentTabClass,
            data: ContentTabClass,
        }
    ) {
        this.projectConfigs = this.fields.projectConfigs;
        this.routers = this.fields.routers;
        this.actions = this.fields.actions;
        this.data = this.fields.data;
    }
}

/**
 * Tab para que pode do tipo "router", "actions" e "data".
 */
export class ContentTabClass {
    public pastas: Pasta[];
    public litComponent: ListComponent[];

    constructor(
        private fields: {
            pastas: Pasta[],
            litComponent: ListComponent[]
        }
    ) {
        this.pastas = this.fields.pastas;
        this.litComponent = this.fields.litComponent;
    }
}

/**
 * Uma estrutura de pasta que pode ser usada dentro das tabs;
 */
interface Pasta {
    configs: ItemConfigs;
    pastas: Pasta[];
    litComponent: ListComponent[];
}

export class ListComponent {
    public itemConfig: ItemConfigs;
    public isEditando: boolean;
    public itens: FlowItem[];

    constructor(
        private fields: {
            itemConfig: ItemConfigs,
            isEditando: boolean,
            itens: FlowItem[],
        }
    ) {
        this.itemConfig = this.fields.itemConfig;
        this.isEditando = this.fields.isEditando;
        this.itens = this.fields.itens;
    }
}

/**
 * Item que está dentro das pastas nas tabs ou nas tabs, 
 * vai representar uma action, routa ou uma tabela na base.
 */
export class FlowItem {
    public key: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;
    public title: string;
    public fluxoItemTypes: FluxoItemTypes;
    public isHaveSucessor: boolean;
    public isHaveAntecessor: boolean;
    public antecessorKey: string | number | undefined;
    public sucessorKey: string | number | undefined;
    public configs: ItemConfigs | undefined;

    constructor(
        private fields: {
            key: number,
            top: number,
            left: number,
            width: number,
            height: number,
            title?: string,
            fluxoItemTypes: FluxoItemTypes,
            isHaveSucessor: boolean,
            isHaveAntecessor: boolean,
            antecessorKey?: string | number,
            sucessorKey?: string | number,
            configs?: ItemConfigs,
        }
    ) {
        this.key = this.fields.key;
        this.top = this.fields.top;
        this.left = this.fields.left;
        this.width = this.fields.width;
        this.height = this.fields.height;
        this.title = this.fields.title || "";
        this.fluxoItemTypes = this.fields.fluxoItemTypes;
        this.isHaveSucessor = this.fields.isHaveSucessor;
        this.isHaveAntecessor = this.fields.isHaveAntecessor;
        this.antecessorKey = this.fields.antecessorKey;
        this.sucessorKey = this.fields.sucessorKey;
        this.configs = this.fields.configs;
    }
}

/**
 * Compõem as configurações de um item de fluxo ou uma pasta.
 */
export class ItemConfigs {
    public name: string;
    public description: string;
    public type?: ItemType;
    constructor(
        private fields: {
            name: string,
            description: string,
            type?: ItemType,
        }
    ) {
        this.name = this.fields.name;
        this.description = this.fields.description;
        this.type = this.fields.type;
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
