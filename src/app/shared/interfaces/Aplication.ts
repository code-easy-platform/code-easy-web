import { CurrentFocus } from "../enuns/CurrentFocus";
import { ProjectType } from "../enuns/ProjectType";
import { OpenWindow } from "./OpenedWindow";
import { BaseFields } from "./BaseFields";
import { Tab } from "./Tabs";

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
export interface IProjectConfigs extends BaseFields {
    id: string | undefined;
    name: string;
    label: string;
    autor: string;
    version: string;
    type: ProjectType;
    createdDate: Date;
    updatedDate: Date;
    description: string;
    currentProcess: string;
    currentPlatformVersion: string;
}

interface IProject {
    currentComponentFocus: CurrentFocus;
    projectConfigs: IProjectConfigs;
    openWindows: OpenWindow[];
    tabs: Tab[];
}
export class Project implements IProject {
    public currentComponentFocus: CurrentFocus;
    public projectConfigs: IProjectConfigs;
    public openWindows: OpenWindow[];
    public tabs: Tab[];

    constructor(
        private fields: {
            currentComponentFocus: CurrentFocus;
            projectConfigs: IProjectConfigs;
            openWindows: OpenWindow[];
            tabs: Tab[];
        }
    ) {
        this.currentComponentFocus = this.fields.currentComponentFocus;
        this.projectConfigs = this.fields.projectConfigs;
        this.openWindows = this.fields.openWindows;
        this.tabs = this.fields.tabs;
    }

    /** Transforma a classe do projeto em uma string para possibilitar ser salvo mais facilmente no local storage. */
    public toString(): string {

        const res = {
            currentComponentFocus: this.currentComponentFocus,
            tabs: this.tabs.map(tab => tab.toStatic()),
            projectConfigs: this.projectConfigs,
            openWindows: this.openWindows,
        };

        return JSON.stringify(res);
    }
}
