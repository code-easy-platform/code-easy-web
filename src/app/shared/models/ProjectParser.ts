// import { IFlowItemComponent, IProject, ITab, ITreeItemComponent } from "../interfaces";
// import { ProjectConfigurations } from "./ProjectConfigurations";
// import { TreeItemComponent } from "./TreeItemComponent";
// import { FlowItemComponent } from "./FlowItemComponent";
import { Project } from "./Project";
// import { Tab } from "./Tab";

export class ProjectParser {
    /**
     * Turns the project class into a string to make it easier to save to local storage.
     *  @param project Project that will be transformed into a string
     */
    public static stringify(project: Project): string {
        const res = {
            id: project.id.value,
            properties: project.properties.value,
            tabs: project.tabs.value.map((tab) => ({
                properties: tab.properties.value,
                id: tab.id.value,
                items: tab.items.value.map((itemTree) => ({
                    properties: itemTree.properties.value,
                    id: itemTree.id.value,
                    items: itemTree.items.value.map((flowItem) => ({
                        isEnabledNewConnetion: flowItem.isEnabledNewConnetion.value,
                        connections: flowItem.connections.value || [],
                        properties: flowItem.properties.value,
                        id: flowItem.id.value,
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
    /* public static parse(value: string): Project {
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
    } */

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
    /* public static parseProjects(projectsInString: string): Project[] {
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
    } */
}
