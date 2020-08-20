import { ItemFlowComplete } from "./ItemFlowComponent";
import { CurrentFocus } from "../enuns/CurrentFocus";
import { ItemComponent } from "./ItemTreeComponent";
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

    constructor(private fields: {
        currentComponentFocus: CurrentFocus;
        projectConfigs: IProjectConfigs;
        openWindows?: OpenWindow[];
        tabs: Tab[];
    }) {
        this.currentComponentFocus = this.fields.currentComponentFocus;
        this.tabs = this.fields.tabs.map(tab => new Tab(tab));
        this.projectConfigs = this.fields.projectConfigs;
        this.openWindows = this.fields.openWindows || [];
    }

    /** Transforma a classe do projeto em uma string para possibilitar ser salvo mais facilmente no local storage. */
    public static projectToString(project: Project): string {
        const res = {
            currentComponentFocus: project.currentComponentFocus,
            projectConfigs: project.projectConfigs,
            openWindows: project.openWindows,
            tabs: project.tabs.map(tab => ({
                configs: tab.configs,
                items: tab.items.map(itemTree => ({
                    nodeExpanded: itemTree.nodeExpanded,
                    description: itemTree.description,
                    properties: itemTree.properties,
                    isSelected: itemTree.isSelected,
                    isEditing: itemTree.isEditing,
                    itemPaiId: itemTree.itemPaiId,
                    ordem: itemTree.ordem,
                    label: itemTree.label,
                    type: itemTree.type,
                    name: itemTree.name,
                    id: itemTree.id,
                    items: itemTree.items.map(flowItem => ({
                        flowItemType: flowItem.flowItemType,
                        description: flowItem.description,
                        connections: flowItem.connections,
                        properties: flowItem.properties,
                        isSelected: flowItem.isSelected,
                        hasWarning: flowItem.hasWarning,
                        isDisabled: flowItem.isDisabled,
                        itemType: flowItem.itemType,
                        hasError: flowItem.hasError,
                        height: flowItem.height,
                        label: flowItem.label,
                        width: flowItem.width,
                        icon: flowItem.icon,
                        left: flowItem.left,
                        name: flowItem.name,
                        top: flowItem.top,
                        id: flowItem.id,
                    })),
                })),
            })),
        };
        return JSON.stringify(res);
    }

    public static stringToProject(value: string): Project {
        const json = JSON.parse(value);

        return new Project({
            currentComponentFocus: json.currentComponentFocus,
            projectConfigs: json.projectConfigs,
            openWindows: json.openWindows,
            tabs: json.tabs.map((tab: any) => new Tab({
                configs: tab.configs,
                items: tab.items.map((item: any) => new ItemComponent({
                    nodeExpanded: item.nodeExpanded,
                    description: item.description,
                    isSelected: item.isSelected,
                    properties: item.properties,
                    isEditing: item.isEditing,
                    itemPaiId: item.itemPaiId,
                    label: item.label,
                    ordem: item.ordem,
                    name: item.name,
                    type: item.type,
                    id: item.id,
                    items: item.items.map((itemFlow: any) => new ItemFlowComplete({
                        flowItemType: itemFlow.flowItemType,
                        connections: itemFlow.connections,
                        isDisabled: itemFlow.isDisabled,
                        hasWarning: itemFlow.hasWarning,
                        properties: itemFlow.properties,
                        isSelected: itemFlow.isSelected,
                        itemType: itemFlow.itemType,
                        hasError: itemFlow.hasError,
                        height: itemFlow.height,
                        width: itemFlow.width,
                        left: itemFlow.left,
                        name: itemFlow.name,
                        icon: itemFlow.icon,
                        top: itemFlow.top,
                        id: itemFlow.id,
                    })),
                }))
            }))
        });

    }

    public static projectsToString(projects: Project[]): string {
        return JSON.stringify(projects.map(project => Project.projectToString(project)));
    }

    public static stringToProjects(projectsInString: string): Project[] {
        try {
            const listString: string[] | undefined = JSON.parse(projectsInString);
            if (listString) {
                return listString.map(projectString => Project.stringToProject(projectString));
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }

    }

}
