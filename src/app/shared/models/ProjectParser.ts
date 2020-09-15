import { ItemComponentConfigs } from "./ItemComponentConfigs";
import { TreeItemComponent } from "./TreeItemComponent";
import { FlowItemComponent } from "./FlowItemComponent";
import { IProject, ITab } from "../interfaces";
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
                configs: {
                    createdDate: tab.configs.createdDate,
                    description: tab.configs.description,
                    updatedDate: tab.configs.updatedDate,
                    isSelected: tab.configs.isSelected,
                    isExpanded: tab.configs.isExpanded,
                    isEditing: tab.configs.isEditing,
                    ordem: tab.configs.ordem,
                    label: tab.configs.label,
                    name: tab.configs.label,
                    type: tab.configs.type,
                    id: tab.configs.id,
                },
                items: tab.items.map(itemTree => ({
                    description: itemTree.description,
                    createdDate: itemTree.createdDate,
                    updatedDate: itemTree.updatedDate,
                    isExpanded: itemTree.isExpanded,
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
        const json: IProject = JSON.parse(value);

        return new Project({
            currentComponentFocus: json.currentComponentFocus,
            projectConfigs: json.projectConfigs,
            openWindows: json.openWindows,
            tabs: json.tabs.map((tab: ITab) => new Tab({
                configs: new ItemComponentConfigs(tab.configs),
                items: tab.items.map(item => new TreeItemComponent({
                    ...item,
                    items: item.items.map(itemFlow => new FlowItemComponent(itemFlow)),
                    properties: item.properties,
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
