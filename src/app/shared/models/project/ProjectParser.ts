import { observe } from "react-observing";

import { FlowItemComponent } from "./generic/FlowItemComponent";
import { IProperty } from "./../../components/external";
import { Tab, TreeItemComponent } from "./generic";
import { Project } from "./Project";

export class ProjectParser {
    /**
     * Turns the project class into a string to make it easier to save to local storage.
     *  @param project Project that will be transformed into a string
     */
    public static stringify(project: Project): string {
        const res = {
            id: project.id.value,
            type: project.type.value,
            properties: project.properties.value?.map(propertie => ({
                id: propertie.id.value,
                type: propertie.type.value,
                name: propertie.name.value,
                value: propertie.value.value,
                group: propertie.group.value,
                information: propertie.information.value,
                fileMaxSize: propertie.fileMaxSize.value,
                nameHasError: propertie.nameHasError.value,
                focusOnRender: propertie.focusOnRender.value,
                propertieType: propertie.propertieType.value,
                valueHasError: propertie.valueHasError.value,
                nameHasWarning: propertie.nameHasWarning.value,
                valueHasWarning: propertie.valueHasWarning.value,
                editNameDisabled: propertie.editNameDisabled.value,
                editValueDisabled: propertie.editValueDisabled.value,
                suggestions: propertie.suggestions.value?.map(suggestion => ({
                    name: suggestion.name.value,
                    value: suggestion.value.value,
                    label: suggestion.label.value,
                    disabled: suggestion.disabled.value,
                    description: suggestion.description.value,
                })),
                nameSuggestions: propertie.nameSuggestions.value?.map(suggestion => ({
                    name: suggestion.name.value,
                    value: suggestion.value.value,
                    label: suggestion.label.value,
                    disabled: suggestion.disabled.value,
                    description: suggestion.description.value,
                })),
            })),
            tabs: project.tabs.value.map(tab => ({
                id: tab.id.value,
                type: tab.type.value,
                properties: tab.properties.value?.map(propertie => ({
                    id: propertie.id.value,
                    type: propertie.type.value,
                    name: propertie.name.value,
                    value: propertie.value.value,
                    group: propertie.group.value,
                    information: propertie.information.value,
                    fileMaxSize: propertie.fileMaxSize.value,
                    nameHasError: propertie.nameHasError.value,
                    focusOnRender: propertie.focusOnRender.value,
                    propertieType: propertie.propertieType.value,
                    valueHasError: propertie.valueHasError.value,
                    nameHasWarning: propertie.nameHasWarning.value,
                    valueHasWarning: propertie.valueHasWarning.value,
                    editNameDisabled: propertie.editNameDisabled.value,
                    editValueDisabled: propertie.editValueDisabled.value,
                    suggestions: propertie.suggestions.value?.map(suggestion => ({
                        name: suggestion.name.value,
                        value: suggestion.value.value,
                        label: suggestion.label.value,
                        disabled: suggestion.disabled.value,
                        description: suggestion.description.value,
                    })),
                    nameSuggestions: propertie.nameSuggestions.value?.map(suggestion => ({
                        name: suggestion.name.value,
                        value: suggestion.value.value,
                        label: suggestion.label.value,
                        disabled: suggestion.disabled.value,
                        description: suggestion.description.value,
                    })),
                })),
                items: tab.items.value.map(itemTree => ({
                    id: itemTree.id.value,
                    properties: itemTree.properties.value?.map(propertie => ({
                        id: propertie.id.value,
                        type: propertie.type.value,
                        name: propertie.name.value,
                        value: propertie.value.value,
                        group: propertie.group.value,
                        information: propertie.information.value,
                        fileMaxSize: propertie.fileMaxSize.value,
                        nameHasError: propertie.nameHasError.value,
                        focusOnRender: propertie.focusOnRender.value,
                        propertieType: propertie.propertieType.value,
                        valueHasError: propertie.valueHasError.value,
                        nameHasWarning: propertie.nameHasWarning.value,
                        valueHasWarning: propertie.valueHasWarning.value,
                        editNameDisabled: propertie.editNameDisabled.value,
                        editValueDisabled: propertie.editValueDisabled.value,
                        suggestions: propertie.suggestions.value?.map(suggestion => ({
                            name: suggestion.name.value,
                            value: suggestion.value.value,
                            label: suggestion.label.value,
                            disabled: suggestion.disabled.value,
                            description: suggestion.description.value,
                        })),
                        nameSuggestions: propertie.nameSuggestions.value?.map(suggestion => ({
                            name: suggestion.name.value,
                            value: suggestion.value.value,
                            label: suggestion.label.value,
                            disabled: suggestion.disabled.value,
                            description: suggestion.description.value,
                        })),
                    })),
                    items: itemTree.items.value.map(flowItem => ({
                        id: flowItem.id.value,
                        connections: flowItem.connections.value.map(connection => ({
                            id: connection.id.value,
                            originId: connection.originId.value,
                            targetId: connection.targetId.value,
                            isSelected: connection.isSelected.value,
                            connectionLabel: connection.connectionLabel.value,
                            connectionDescription: connection.connectionDescription.value,
                        })) || [],
                        properties: flowItem.properties.value?.map(propertie => ({
                            id: propertie.id.value,
                            type: propertie.type.value,
                            name: propertie.name.value,
                            value: propertie.value.value,
                            group: propertie.group.value,
                            information: propertie.information.value,
                            fileMaxSize: propertie.fileMaxSize.value,
                            nameHasError: propertie.nameHasError.value,
                            focusOnRender: propertie.focusOnRender.value,
                            propertieType: propertie.propertieType.value,
                            valueHasError: propertie.valueHasError.value,
                            nameHasWarning: propertie.nameHasWarning.value,
                            valueHasWarning: propertie.valueHasWarning.value,
                            editNameDisabled: propertie.editNameDisabled.value,
                            editValueDisabled: propertie.editValueDisabled.value,
                            suggestions: propertie.suggestions.value?.map(suggestion => ({
                                name: suggestion.name.value,
                                value: suggestion.value.value,
                                label: suggestion.label.value,
                                disabled: suggestion.disabled.value,
                                description: suggestion.description.value,
                            })),
                            nameSuggestions: propertie.nameSuggestions.value?.map(suggestion => ({
                                name: suggestion.name.value,
                                value: suggestion.value.value,
                                label: suggestion.label.value,
                                disabled: suggestion.disabled.value,
                                description: suggestion.description.value,
                            })),
                        })),
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
                suggestions: observe(value.suggestions),
                information: observe(value.information),
                fileMaxSize: observe(value.fileMaxSize),
                nameHasError: observe(value.nameHasError),
                focusOnRender: observe(value.focusOnRender),
                propertieType: observe(value.propertieType),
                valueHasError: observe(value.valueHasError),
                nameHasWarning: observe(value.nameHasWarning),
                valueHasWarning: observe(value.valueHasWarning),
                nameSuggestions: observe(value.nameSuggestions),
                editNameDisabled: observe(value.editNameDisabled),
                onPickerNameClick: observe(value.onPickerNameClick),
                editValueDisabled: observe(value.editValueDisabled),
                onPickerValueClick: observe(value.onPickerValueClick),
            };
        };

        return new Project({
            id: json.id,
            type: json.type,
            tabs: json.tabs.map((tab: any) => new Tab({
                id: tab.id,
                type: tab.type,
                items: tab.items.map((treeItem: any) => new TreeItemComponent({
                    id: treeItem.id,
                    type: treeItem.type,
                    items: tab.items.map((flowItem: any) => new FlowItemComponent({
                        id: flowItem.id,
                        type: flowItem.type,
                        connections: flowItem.connections.map((connection: any) => ({
                            id: observe(connection.id),
                            originId: observe(connection.originId),
                            targetId: observe(connection.targetId),
                            isSelected: observe(connection.isSelected),
                            connectionLabel: observe(connection.connectionLabel),
                            connectionDescription: observe(connection.connectionDescription),
                        })),
                        properties: flowItem.properties.map((prop: any) => newPropertie(prop)),
                    })),
                    properties: treeItem.properties.map((prop: any) => newPropertie(prop)),
                })),
                properties: tab.properties.map((prop: any) => newPropertie(prop)),
            })),
            properties: json.properties.map((prop: any) => newPropertie(prop)),
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
