import { IconAction, IconRouter, Utils } from "code-easy-components";
import { observe, set } from "react-observing";

import { EProjectType, ETabType, PropertieTypes, StorageEnum } from "./../../enuns";
import { Project, ProjectParser, TabAction } from "../../models";
import { TypeOfValues } from "../../components/external";
import { TabRoute } from "../../models/TabRoute";

const newProject = (name: string, version: string, type: EProjectType, description: string) => new Project({
    type,
    id: Utils.getUUID(),
    tabs: [
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
    properties: [
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
            id: observe(Utils.getUUID()),
            type: observe(TypeOfValues.number),
            name: observe(PropertieTypes.version),
            propertieType: observe(PropertieTypes.version),
            value: observe(version !== '' ? version : '0.0.1'),

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
            value: observe(description),
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
            value: observe(name),
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
    ]
});

/** Used to save projects in the storage */
export class ProjectsStorage {

    /** Return a full project */
    public static getNewProject(name: string, version: string, type: EProjectType, description: string) {
        return newProject(name, version, type, description);
    }

    /** Will return a logged username. This is isn't working for while */
    public static getAuthorName() {
        return "(Sem nome)";
    }

    /** Get from localstorage a list of projects */
    public static getProjects(): Project[] {
        let res = localStorage.getItem(StorageEnum.projectsStorage);

        console.log('getProjects');

        if (res !== null && res !== "" && res) {
            return ProjectParser.parseProjects(res);
        } else {
            return [];
        }
    }

    /** Save in localstorage a list of projects */
    public static setProjects(projects: Project[]): Project[] {
        localStorage.setItem(StorageEnum.projectsStorage, ProjectParser.stringifyProjects(projects));

        console.log('setProjects');

        return projects;
    }

    /** Update in localstorage a list of projects */
    public static setProjectById(project: Project) {
        let projects: Project[] = ProjectsStorage.getProjects();

        let itemIndex = projects.findIndex(itemProject => itemProject.id.value === project.id.value);

        if (itemIndex > -1) {
            set(project.updatedDate, new Date(Date.now()));
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        ProjectsStorage.setProjects(projects);
    }

    /** Get a project by id */
    public static getProjectById(id?: string): Promise<Project> {
        return new Promise(resolve => {
            const projects = ProjectsStorage.getProjects();

            let project = projects.find(proj => proj.id.value === id);

            if (project) {
                return resolve(project);
            } else {
                return resolve(new Project({ properties: [], tabs: [], type: EProjectType.api }));
            }
        });
    }

    /** Remove a project by id from localstorage */
    public static removeProjectById(id?: string): Project[] {
        let projects = ProjectsStorage.getProjects();
        if (!id) { return projects; }

        const itemIndex = projects.findIndex(project => project.id.value === id);

        if (itemIndex > -1) {
            projects.splice(itemIndex, 1); // Remove item
        }

        ProjectsStorage.setProjects(projects);
        return projects;
    }

    /** Get the saved state from a ColumnResizable at localstorage */
    public static getColumnsResizableSize(id: string): number {
        let props = localStorage.getItem(id);
        if (!props) {
            props = ProjectsStorage.setColumnsResizableSize(id, 300).toString();
        }
        return parseInt(props);
    }

    /** Save the state from a ColumnResizable in the localstorage */
    public static setColumnsResizableSize(id: string, size: number): number {
        localStorage.setItem(id, size.toString());
        return size;
    }
}
