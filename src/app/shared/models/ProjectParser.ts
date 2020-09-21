import { IFlowItemComponent, IProject, ITab, ITreeItemComponent } from "../interfaces";
import { ProjectConfigurations } from "./ProjectConfigurations";
import { TreeItemComponent } from "./TreeItemComponent";
import { FlowItemComponent } from "./FlowItemComponent";
import { Project } from "./Project";
import { Tab } from "./Tab";

export class ProjectParser {
    /**
     * Turns the project class into a string to make it easier to save to local storage.
     *  @param project Project that will be transformed into a string
     */
    public static stringify(project: Project): string {
        const res: IProject = {
            problems: [],
            windows: project.windows,
            currentFocus: project.currentFocus,
            configurations: {
                problems: [],
                id: project.configurations.id,
                name: project.configurations.name,
                type: project.configurations.type,
                icon: project.configurations.icon,
                label: project.configurations.label,
                ordem: project.configurations.ordem,
                author: project.configurations.author,
                version: project.configurations.version,
                hasError: project.configurations.hasError,
                isEditing: project.configurations.isEditing,
                hasWarning: project.configurations.hasWarning,
                isExpanded: project.configurations.isExpanded,
                isSelected: project.configurations.isSelected,
                properties: project.configurations.properties,
                createdDate: project.configurations.createdDate,
                description: project.configurations.description,
                updatedDate: project.configurations.updatedDate,
                currentPlatformVersion: project.configurations.currentPlatformVersion,
                createdInPlatformVersion: project.configurations.createdInPlatformVersion,
            },
            tabs: project.tabs.map((tab): ITab => ({
                description: tab.description,
                createdDate: tab.createdDate,
                updatedDate: tab.updatedDate,
                properties: tab.properties,
                isSelected: tab.isSelected,
                isExpanded: tab.isExpanded,
                hasWarning: tab.hasWarning,
                isEditing: tab.isEditing,
                hasError: tab.hasError,
                ordem: tab.ordem,
                label: tab.label,
                name: tab.label,
                type: tab.type,
                icon: tab.icon,
                problems: [],
                id: tab.id,
                items: tab.items.map((itemTree): ITreeItemComponent => ({
                    ascendantId: itemTree.ascendantId,
                    description: itemTree.description,
                    createdDate: itemTree.createdDate,
                    updatedDate: itemTree.updatedDate,
                    isExpanded: itemTree.isExpanded,
                    hasWarning: itemTree.hasWarning,
                    properties: itemTree.properties,
                    isSelected: itemTree.isSelected,
                    isEditing: itemTree.isEditing,
                    hasError: itemTree.hasError,
                    ordem: itemTree.ordem,
                    label: itemTree.label,
                    name: itemTree.label,
                    type: itemTree.type,
                    icon: itemTree.icon,
                    id: itemTree.id,
                    problems: [],
                    items: itemTree.items.map((flowItem): IFlowItemComponent => ({
                        isEnabledNewConnetion: flowItem.isEnabledNewConnetion,
                        connections: flowItem.connections || [],
                        flowItemType: flowItem.flowItemType,
                        description: flowItem.description,
                        updatedDate: flowItem.updatedDate,
                        createdDate: flowItem.createdDate,
                        properties: flowItem.properties,
                        isSelected: flowItem.isSelected,
                        hasWarning: flowItem.hasWarning,
                        isDisabled: flowItem.isDisabled,
                        isExpanded: flowItem.isExpanded,
                        isEditing: flowItem.isEditing,
                        hasError: flowItem.hasError,
                        height: flowItem.height,
                        ordem: flowItem.ordem,
                        label: flowItem.label,
                        name: flowItem.label,
                        width: flowItem.width,
                        type: flowItem.type,
                        icon: flowItem.icon,
                        left: flowItem.left,
                        top: flowItem.top,
                        id: flowItem.id,
                        problems: [],
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
            configurations: new ProjectConfigurations(json.configurations),
            currentFocus: json.currentFocus,
            windows: json.windows,
            tabs: json.tabs.map((tab: ITab) => new Tab({
                ...tab,
                items: tab.items.map(item => new TreeItemComponent({
                    ...item,
                    properties: item.properties,
                    items: item.items.map(itemFlow => new FlowItemComponent({
                        ...itemFlow,
                        connections: itemFlow.connections,
                        properties: itemFlow.properties
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
        return JSON.stringify(projects.map(project => ProjectParser.stringify(project)));
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
