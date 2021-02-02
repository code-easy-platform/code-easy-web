import { IconAction, IconRouter, Utils } from "code-easy-components";
import { observe, set } from "react-observing";

import { ETabType, PropertieTypes, EProjectType } from "../../../enuns";
import { IProperty, TypeOfValues } from "../../../components/external";
import { IApiProject, ITab } from "../../../interfaces";
import { ProjectsStorage } from "../../../services";
import { TabAction, TabRoute } from "../tabs";
import { Project } from "./../generic";

/**
 * When you already have properties
 */
interface IConstructor {
    properties: IProperty[];
    tabs?: ITab[];
    id?: string;
}
export class ApiProject extends Project implements IApiProject {

    /** Empty project */
    constructor();
    /** Return a project from some properties */
    constructor(props: IConstructor);
    /** Criating a new project */
    constructor(props?: IConstructor) {
        super({
            id: props?.id,
            type: EProjectType.api,
            tabs: props?.tabs || [
                new TabRoute({
                    properties: [
                        {
                            value: observe(false),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isSelected),
                            propertieType: observe(PropertieTypes.isSelected),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(true),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isExpanded),
                            propertieType: observe(PropertieTypes.isExpanded),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(true),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isEditing),
                            propertieType: observe(PropertieTypes.isEditing),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            id: observe(Utils.getUUID()),
                            value: observe(ETabType.tabRoutes),
                            type: observe(TypeOfValues.bigstring),
                            name: observe(PropertieTypes.description),
                            propertieType: observe(PropertieTypes.description),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe("Routes"),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.string),
                            name: observe(PropertieTypes.label),
                            propertieType: observe(PropertieTypes.label),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(IconRouter),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.binary),
                            name: observe(PropertieTypes.icon),
                            propertieType: observe(PropertieTypes.icon),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                    ]
                }),
                new TabAction({
                    properties: [
                        {
                            value: observe(false),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isSelected),
                            propertieType: observe(PropertieTypes.isSelected),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(false),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isExpanded),
                            propertieType: observe(PropertieTypes.isExpanded),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(false),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isEditing),
                            propertieType: observe(PropertieTypes.isEditing),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            id: observe(Utils.getUUID()),
                            value: observe(ETabType.tabActions),
                            type: observe(TypeOfValues.bigstring),
                            name: observe(PropertieTypes.description),
                            propertieType: observe(PropertieTypes.description),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe("Actions"),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.string),
                            name: observe(PropertieTypes.label),
                            propertieType: observe(PropertieTypes.label),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(IconAction),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.binary),
                            name: observe(PropertieTypes.icon),
                            propertieType: observe(PropertieTypes.icon),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                    ]
                }),
            ],
            properties: props?.properties || [
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    value: observe(`${process.env.REACT_APP_VERSION}`),
                    name: observe(PropertieTypes.createdInPlatformVersion),
                    propertieType: observe(PropertieTypes.createdInPlatformVersion),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    value: observe(`${process.env.REACT_APP_VERSION}`),
                    name: observe(PropertieTypes.currentPlatformVersion),
                    propertieType: observe(PropertieTypes.currentPlatformVersion),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.string),
                    name: observe(PropertieTypes.author),
                    propertieType: observe(PropertieTypes.author),
                    value: observe(ProjectsStorage.getAuthorName()),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe('0.0.1'),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.number),
                    name: observe(PropertieTypes.version),
                    propertieType: observe(PropertieTypes.version),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(new Date()),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    name: observe(PropertieTypes.createdDate),
                    propertieType: observe(PropertieTypes.createdDate),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(new Date()),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    name: observe(PropertieTypes.updatedDate),
                    propertieType: observe(PropertieTypes.updatedDate),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.bigstring),
                    name: observe(PropertieTypes.description),
                    propertieType: observe(PropertieTypes.description),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.string),
                    name: observe(PropertieTypes.label),
                    propertieType: observe(PropertieTypes.label),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
            ],
        });
    }

    /** Return a full project */
    public static newProject(name: string, version: string, description: string) {
        const newProject = new ApiProject();
        set(newProject.label, name);
        set(newProject.version, version);
        set(newProject.description, description);
        return newProject;
    }
}