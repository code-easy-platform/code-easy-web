import ProjectType from "../enuns/ProjectType";
import ComponentType from "../enuns/ComponentType";
import { FluxoComponentTypes } from "../../pages/editor/tabs/editor-tab/components/code-editor/enuns/FluxoList";


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
    public listComponent: ListComponent[];

    constructor(
        private fields: {
            pastas: Pasta[],
            listComponent: ListComponent[]
        }
    ) {
        this.pastas = this.fields.pastas;
        this.listComponent = this.fields.listComponent;
    }
}

/**
 * Uma estrutura de pasta que pode ser usada dentro das tabs;
 */
interface Pasta {
    configs: ComponentConfigs;
    pastas: Pasta[];
    listComponent: ListComponent[];
}

export class ListComponent {
    public itemConfig: ComponentConfigs;
    public isEditando: boolean;
    public isSelecionado: boolean;
    public isExpanded: boolean;
    public itens: FlowItem[];

    public pastas: Pasta[];
    public listComponent: ListComponent[];

    constructor(
        private fields: {
            itemConfig: ComponentConfigs,
            isEditando: boolean,
            isSelecionado: boolean,
            isExpanded: boolean,
            itens: FlowItem[],
            pastas: Pasta[],
            listComponent: ListComponent[],
        }
    ) {
        this.itemConfig = this.fields.itemConfig;
        this.isEditando = this.fields.isEditando;
        this.isSelecionado = this.fields.isSelecionado;
        this.isExpanded = this.fields.isExpanded;
        this.itens = this.fields.itens;
        this.pastas = this.fields.pastas;
        this.listComponent = this.fields.listComponent;
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
    public fluxoItemTypes: FluxoComponentTypes;
    public isHaveSucessor: boolean;
    public isHaveAntecessor: boolean;
    public antecessorKey: string | number | undefined;
    public sucessorKey: string | number | undefined;
    public configs: ComponentConfigs | undefined;

    constructor(
        private fields: {
            key: number,
            top: number,
            left: number,
            width: number,
            height: number,
            title?: string,
            fluxoItemTypes: FluxoComponentTypes,
            isHaveSucessor: boolean,
            isHaveAntecessor: boolean,
            antecessorKey?: string | number,
            sucessorKey?: string | number,
            configs?: ComponentConfigs,
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
    public key: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;
    public title: string;
    public fluxoItemTypes: FluxoComponentTypes;
    public isHaveSucessor: boolean;
    public isHaveAntecessor: boolean;
    public antecessorKey: number;
    public sucessorKey: number;
    public configs: ComponentConfigs;

    constructor(
        private fields: {
            key: number;
            top: number;
            left: number;
            width: number;
            height: number;
            title: string;
            fluxoItemTypes: FluxoComponentTypes;
            isHaveSucessor: boolean;
            isHaveAntecessor: boolean;
            antecessorKey: number;
            sucessorKey: number;
            configs: ComponentConfigs;
        }
    ) {
        this.key = this.fields.key;
        this.top = this.fields.top;
        this.left = this.fields.left;
        this.width = this.fields.width;
        this.height = this.fields.height;
        this.title = this.fields.title;
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
export class ComponentConfigs {
    public name: string;
    public description: string;
    public type: ComponentType;
    public isExpanded?: boolean;

    constructor(
        private fields: {
            name: string,
            description: string,
            type: ComponentType,
            isExpanded?: boolean,
        }
    ) {
        this.name = this.fields.name;
        this.description = this.fields.description;
        this.type = this.fields.type;
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




