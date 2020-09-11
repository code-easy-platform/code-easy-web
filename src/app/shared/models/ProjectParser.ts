import { TreeItemComponent } from "./TreeItemComponent";
import { FlowItemComponent } from "./FlowItemComponent";
import { IProject } from "../interfaces";
import { Project } from "./Project";
import { Tab } from "./Tabs";

export class ProjectParser {
    /**
     * Turns the project class into a string to make it easier to save to local storage.
     *  @param project Project that will be transformed into a string
     */
    public static stringify(project: Project): string {
        const res: IProject = {
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

    /**
     * Transform a string into a structure
     * @param value Content that will be transformed into a Project
     */
    public static parse(value: string): Project {
        const json = JSON.parse(value);

        return new Project({
            currentComponentFocus: json.currentComponentFocus,
            projectConfigs: json.projectConfigs,
            openWindows: json.openWindows,
            tabs: json.tabs.map((tab: any) => new Tab({
                configs: tab.configs,
                items: tab.items.map((item: any) => new TreeItemComponent({
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
                    items: item.items.map((itemFlow: any) => new FlowItemComponent({
                        connections: itemFlow.connections,
                        description: itemFlow.description,
                        isDisabled: itemFlow.isDisabled,
                        hasWarning: itemFlow.hasWarning,
                        properties: itemFlow.properties,
                        isSelected: itemFlow.isSelected,
                        itemType: itemFlow.itemType,
                        hasError: itemFlow.hasError,
                        label: itemFlow.label,
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

    /**
     * Turns a list of Projects class into a string to make it easier to save to local storage.
     *  @param projects Projects that will be transformed into a string
     */
    public static stringifyProjects(projects: Project[]): string {
        return JSON.stringify(projects.map(project => Project.stringify(project)));
    }

    /**
     * Transform a string into a list of structure
     * @param value Content that will be transformed into a Project
     */
    public static parseProjects(projectsInString: string): Project[] {
        try {
            const listString: string[] | undefined = JSON.parse(projectsInString);
            if (listString) {
                return listString.map(projectString => Project.parse(projectString));
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }

    }
}
