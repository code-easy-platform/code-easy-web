
import { IProperty } from "./../../../components/external";
import { PropertyParser } from "./PropertyParser";
import { ApiProject } from "../projects-types";
import { EProjectType } from "../../../enuns";
import { TabParser } from "./TabParser";
import { Project } from "./Project";

export abstract class ProjectParser {
    /**
     * Turns the project class into a string to make it easier to save to local storage.
     *  @param project Project that will be transformed into a string
     */
    public static stringify(project: Project): string {

        const mapPropertie = (value: IProperty) => {
            return {
                id: value.id.value,
                name: value.name.value,
                type: value.type.value,
                value: value.value.value,
                group: value.group.value,
                information: value.information.value,
                fileMaxSize: value.fileMaxSize.value,
                nameHasError: value.nameHasError.value,
                focusOnRender: value.focusOnRender.value,
                propertieType: value.propertieType.value,
                valueHasError: value.valueHasError.value,
                nameHasWarning: value.nameHasWarning.value,
                valueHasWarning: value.valueHasWarning.value,
                editNameDisabled: value.editNameDisabled.value,
                editValueDisabled: value.editValueDisabled.value,
                suggestions: value.suggestions.value?.map(suggestion => ({
                    name: suggestion.name.value,
                    value: suggestion.value.value,
                    label: suggestion.label.value,
                    disabled: suggestion.disabled.value,
                    description: suggestion.description.value,
                })),
                nameSuggestions: value.nameSuggestions.value?.map(suggestion => ({
                    name: suggestion.name.value,
                    value: suggestion.value.value,
                    label: suggestion.label.value,
                    disabled: suggestion.disabled.value,
                    description: suggestion.description.value,
                })),
            };
        };

        const res = {
            id: project.id.value,
            type: project.type.value,
            properties: project.properties.value?.map(mapPropertie),
            tabs: project.tabs.value.map(tab => ({
                id: tab.id.value,
                type: tab.type.value,
                properties: tab.properties.value?.map(mapPropertie),
                items: tab.items.value.map(itemTree => ({
                    id: itemTree.id.value,
                    type: itemTree.type.value,
                    properties: itemTree.properties.value?.map(mapPropertie),
                    items: itemTree.items.value.map(flowItem => ({
                        id: flowItem.id.value,
                        type: flowItem.type.value,
                        properties: flowItem.properties.value?.map(mapPropertie),
                        connections: flowItem.connections.value.map(connection => ({
                            id: connection.id.value,
                            originId: connection.originId.value,
                            targetId: connection.targetId.value,
                            isSelected: connection.isSelected.value,
                            connectionLabel: connection.connectionLabel.value,
                            connectionDescription: connection.connectionDescription.value,
                        })) || [],
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
    public static parse(value: string): Project | null {
        const json = JSON.parse(value);

        switch (json.type) {
            case EProjectType.api:
                const project = new ApiProject({
                    id: json.id,
                    tabs: TabParser.jsonToInstances(json.tabs),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });

                return project;

            default: return null;
        }
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
            const listString: string[] | null = JSON.parse(projectsInString);
            if (listString) {
                const projects: Project[] = [];

                listString.map(projectString => ProjectParser.parse(projectString)).forEach(project => {
                    if (project) {
                        projects.push(project);
                    }
                });

                return projects;
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
