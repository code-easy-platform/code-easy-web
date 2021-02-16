import { observe } from "react-observing";

import { Tab, TreeItemComponent, FlowItemComponent } from "./../generic";
import { IProperty } from "./../../../components/external";
import { Project } from "./Project";

export class ProjectParser {
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
    public static parse(value: string): Project {
        const json = JSON.parse(value);

        const newPropertie = (value: any): IProperty => {
            return {
                id: observe(value.id),
                name: observe(value.name),
                type: observe(value.type),
                value: observe(value.value),
                group: observe(value.group),
                information: observe(value.information),
                fileMaxSize: observe(value.fileMaxSize),
                nameHasError: observe(value.nameHasError),
                focusOnRender: observe(value.focusOnRender),
                propertieType: observe(value.propertieType),
                valueHasError: observe(value.valueHasError),
                nameHasWarning: observe(value.nameHasWarning),
                valueHasWarning: observe(value.valueHasWarning),
                editNameDisabled: observe(value.editNameDisabled),
                onPickerNameClick: observe(value.onPickerNameClick),
                editValueDisabled: observe(value.editValueDisabled),
                onPickerValueClick: observe(value.onPickerValueClick),
                suggestions: observe(value.suggestions?.map((suggestion: any) => ({
                    name: observe(suggestion.name),
                    value: observe(suggestion.value),
                    label: observe(suggestion.label),
                    disabled: observe(suggestion.disabled),
                    description: observe(suggestion.description),
                })) || []),
                nameSuggestions: observe(value.nameSuggestions?.map((suggestion: any) => ({
                    name: observe(suggestion.name),
                    value: observe(suggestion.value),
                    label: observe(suggestion.label),
                    disabled: observe(suggestion.disabled),
                    description: observe(suggestion.description),
                })) || []),
            };
        };

        return new Project({
            id: json.id,
            type: json.type,
            properties: json.properties.map((prop: any) => newPropertie(prop)),
            /*
                This tabs will be rebuilt inside the project
            */
            tabs: json.tabs.map((tab: any) => new Tab(json, {
                id: tab.id,
                type: tab.type,
                properties: tab.properties.map((prop: any) => newPropertie(prop)),
                items: tab.items.map((treeItem: any) => new TreeItemComponent({
                    id: treeItem.id,
                    type: treeItem.type,
                    properties: treeItem.properties.map((prop: any) => newPropertie(prop)),
                    /*
                        Even without receiving an instance of TreeItemComponent, 
                        within TreeItemComponent these items are rebuilt with a
                        valid instance of TreeItemComponent
                    */
                    items: treeItem.items.map((flowItem: any) => new FlowItemComponent(treeItem, {
                        id: flowItem.id,
                        type: flowItem.type,
                        properties: flowItem.properties.map((prop: any) => newPropertie(prop)),
                        connections: flowItem.connections.map((connection: any) => ({
                            id: observe(connection.id),
                            originId: observe(connection.originId),
                            targetId: observe(connection.targetId),
                            isSelected: observe(connection.isSelected),
                            connectionLabel: observe(connection.connectionLabel),
                            connectionDescription: observe(connection.connectionDescription),
                        })),
                    })),
                })),
            })),
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
                return listString.map(projectString => ProjectParser.parse(projectString));
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
