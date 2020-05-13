import { Project, Tab, ComponentConfigs, ItemFlowComplete, ItemComponent } from "../interfaces/Aplication";
import { TypeValues } from "../components/properties-editor/shared/interfaces";
import { ItemType } from "../components/code-editor/models/ItemFluxo";
import { ComponentType } from "../enuns/ComponentType";
import { ProjectType } from "../enuns/ProjectType";
import { Utils } from "./Utils";

export enum StorageEnum {
    projectsStorage = "PROJECTS_STORAGE",
}

const mockProjeto: Project = new Project({
    projectConfigs: {
        id: undefined,
        version: '0.0.1',
        currentProcess: '',
        autor: '(Sem nome)',
        label: 'Demostração',
        name: 'desmostracao',
        type: ProjectType.api,
        description: 'Projeto simples, apenas para demostração',
    },
    tabs: [
        new Tab({
            configs: new ComponentConfigs({
                name: "routes",
                isExpanded: true,
                label: "Routes",
                isEditing: true,
                id: `${Utils.getUUID()}`,
                type: ComponentType.tabRouters,
                description: "Minha tab de routes",
            }),
            itens: [
                new ItemComponent({
                    id: `${Utils.getUUID()}`,
                    isEditing: true,
                    isSelected: true,
                    nodeExpanded: true,
                    name: 'authenticate',
                    itemPaiId: undefined,
                    label: "Authenticate",
                    type: ComponentType.router,
                    description: "Autentica os usuários!",
                    properties: [
                        {
                            id: '1',
                            name: 'Label',
                            value: "Authenticate",
                            type: TypeValues.string
                        },
                        {
                            id: '2',
                            name: 'Description',
                            type: TypeValues.bigstring,
                            value: "Autentica os usuários!"
                        },
                        {
                            id: '3',
                            name: 'Url',
                            type: TypeValues.string,
                            value: "/authenticate"
                        }
                    ],
                    itens: [
                        new ItemFlowComplete({
                            id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "START",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "Descrição",
                                name: "Description",
                                type: TypeValues.bigstring,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "IF",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Condiction",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "FOREACH",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Source",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ACTION",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Action",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "SWITCH",
                                name: "Label",
                                type: TypeValues.string,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ASSIGN",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Assigment",
                                type: TypeValues.assign,
                                valueHasError: true,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '7', sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelected: false, name: "END", itemType: ItemType.END, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "END",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            }]
                        }),
                    ]
                }),
                new ItemComponent({
                    id: `${Utils.getUUID()}`,
                    name: 'signup',
                    label: "Signup",
                    isEditing: false,
                    isSelected: false,
                    nodeExpanded: true,
                    itemPaiId: undefined,
                    type: ComponentType.router,
                    description: "Cadastra novos usuários!",
                    properties: [
                        {
                            id: '1',
                            name: 'Label',
                            value: "Signup",
                            type: TypeValues.string
                        },
                        {
                            id: '2',
                            name: 'Description',
                            type: TypeValues.bigstring,
                            value: "Cadastra novos usuários!"
                        },
                        {
                            id: '3',
                            name: 'Url',
                            type: TypeValues.string,
                            value: "/signup"
                        }
                    ],
                    itens: [
                        new ItemFlowComplete({
                            id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "START",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "Descrição",
                                name: "Description",
                                type: TypeValues.bigstring,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "IF",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Condiction",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "FOREACH",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Source",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ACTION",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Action",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "SWITCH",
                                name: "Label",
                                type: TypeValues.string,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ASSIGN",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Assigment",
                                type: TypeValues.assign,
                                valueHasError: true,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '7', sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelected: false, name: "END", itemType: ItemType.END, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "END",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            }]
                        }),
                    ]
                })
            ]
        }),
        new Tab({
            configs: new ComponentConfigs({
                id: `${Utils.getUUID()}`,
                name: 'actions',
                isEditing: false,
                isExpanded: false,
                label: 'Actions',
                type: ComponentType.tabActions,
                description: 'Permite a criação da lógica da aplicação de APIs',
            }),
            itens: [
                new ItemComponent({
                    id: `${Utils.getUUID()}`,
                    name: 'doauthenticate',
                    label: "DoAuthenticate",
                    description: "Autentica os usuários!",
                    isEditing: false,
                    isSelected: false,
                    nodeExpanded: true,
                    itemPaiId: undefined,
                    type: ComponentType.globalAction,
                    properties: [
                        {
                            id: '1',
                            name: 'Label',
                            value: "DoAuthenticate",
                            type: TypeValues.string
                        },
                        {
                            id: '2',
                            name: 'Description',
                            type: TypeValues.bigstring,
                            value: "Autentica os usuários!"
                        }
                    ],
                    itens: [
                        new ItemFlowComplete({
                            id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "START",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "Descrição",
                                name: "Description",
                                type: TypeValues.bigstring,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "IF",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Condiction",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "FOREACH",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Source",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ACTION",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Action",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "SWITCH",
                                name: "Label",
                                type: TypeValues.string,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ASSIGN",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Assigment",
                                type: TypeValues.assign,
                                valueHasError: true,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '7', sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelected: false, name: "END", itemType: ItemType.END, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "END",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            }]
                        }),
                    ]
                }),
                new ItemComponent({
                    id: `${Utils.getUUID()}`,
                    name: 'dosignup',
                    label: "DoSignup",
                    isEditing: false,
                    isSelected: false,
                    nodeExpanded: true,
                    itemPaiId: undefined,
                    type: ComponentType.globalAction,
                    description: "Cadastra novos usuários!",
                    properties: [
                        {
                            id: '1',
                            name: 'Label',
                            value: "DoSignup",
                            type: TypeValues.string
                        },
                        {
                            id: '2',
                            name: 'Description',
                            type: TypeValues.bigstring,
                            value: "Cadastra novos usuários!"
                        }
                    ],
                    itens: [
                        new ItemFlowComplete({
                            id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "START",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "Descrição",
                                name: "Description",
                                type: TypeValues.bigstring,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "IF",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Condiction",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "FOREACH",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Source",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ACTION",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Action",
                                type: TypeValues.expression,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "SWITCH",
                                name: "Label",
                                type: TypeValues.string,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "ASSIGN",
                                name: "Label",
                                type: TypeValues.string,
                            },
                            {
                                id: `${Utils.getUUID()}`,
                                value: "",
                                name: "Assigment",
                                type: TypeValues.assign,
                                valueHasError: true,
                            }]
                        }),
                        new ItemFlowComplete({
                            id: '7', sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelected: false, name: "END", itemType: ItemType.END, properties: [{
                                id: `${Utils.getUUID()}`,
                                value: "END",
                                name: "Label",
                                type: TypeValues.viewOnly,
                            }]
                        }),
                    ]
                })
            ],
        }),
        new Tab({
            configs: new ComponentConfigs({
                id: `${Utils.getUUID()}`,
                name: 'data',
                label: 'Data',
                isEditing: false,
                isExpanded: false,
                type: ComponentType.tabDates,
                description: 'Permite a criação do banco de dados da aplicação de APIs',
            }),
            itens: [],
        }),
    ]
});

const newProject = (name: string, version: string, type: ProjectType, description: string) => new Project({
    projectConfigs: {
        id: `${Utils.getUUID()}`,
        type: type,
        label: name,
        version: version,
        currentProcess: '',
        description: description,
        autor: Storage.getAuthorName(),
        name: Utils.getNormalizedString(name.toLowerCase()),
    },
    tabs: [
        new Tab({
            configs: new ComponentConfigs({
                name: "routes",
                isExpanded: true,
                label: "Routes",
                isEditing: true,
                id: `${Utils.getUUID()}`,
                type: ComponentType.tabRouters,
                description: "Routes tab",
            }),
            itens: []
        }),
        new Tab({
            configs: new ComponentConfigs({
                id: `${Utils.getUUID()}`,
                name: 'actions',
                isEditing: false,
                isExpanded: false,
                label: 'Actions',
                type: ComponentType.tabActions,
                description: 'Actions tab',
            }),
            itens: [],
        }),
        new Tab({
            configs: new ComponentConfigs({
                id: `${Utils.getUUID()}`,
                name: 'data',
                label: 'Data',
                isEditing: false,
                isExpanded: false,
                type: ComponentType.tabDates,
                description: 'Data tab',
            }),
            itens: [],
        }),
    ]
});

export class Storage {

    public static getNewProject(name: string, version: string, type: ProjectType, description: string) {
        return newProject(name, version, type, description);
    }

    public static getAuthorName() {
        return "(Sem nome)";
    }

    /** Pega do localstorage uma lista de projetos */
    public static getProjects(): Project[] {
        let projects: Project[];

        let res = localStorage.getItem(StorageEnum.projectsStorage);

        if (res !== null && res !== "" && res !== undefined)
            projects = JSON.parse(res);
        else {
            Storage.setProjects([]);
            projects = [];
        }

        return projects;
    }

    /** Salva no localstorage uma lista de projetos */
    public static setProjects(projects: Project[]): Project[] {
        localStorage.setItem(StorageEnum.projectsStorage, JSON.stringify(projects));
        return projects;
    }

    /** Atualiza no localstorage a lista de projetos */
    public static setProjectById(project: Project) {

        let projects: Project[] = [...Storage.getProjects()];

        let itemIndex = projects.findIndex(item_project => item_project.projectConfigs.id === project.projectConfigs.id);

        if (itemIndex) {
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        Storage.setProjects(projects);
    }

    /** Pego o projeto que está sendo editado no momento */
    public static getProjectById(id?: string): Project {
        const projects = Storage.getProjects();

        let project = projects.find(proj => proj.projectConfigs.id === id);

        if (project === undefined) {
            return new Project(mockProjeto);
        } else {
            return new Project(project);
        }
    }

    /** Remove o item do local storage */
    public static removeProjectById(id?: string): Project[] {

        let projects = Storage.getProjects();
        if (!id) return projects;

        const itemIndex = projects.findIndex(project => project.projectConfigs.id === id);

        if (itemIndex > -1) {
            projects.splice(itemIndex, 1); // Remove item
        }

        Storage.setProjects(projects);
        return projects;
    }

    /** Reseta o projeto que está sendo editado no momento */
    public static resetProject(): Project {
        return new Project(Storage.getProjectById());
    }

    public static getColumnsResizableSize(id: string): number {
        let props = localStorage.getItem(id);
        if (!props) {
            props = Storage.setColumnsResizableSize(id, 300).toString();
        }
        return parseInt(props);
    }

    public static setColumnsResizableSize(id: string, size: number): number {
        localStorage.setItem(id, size.toString());
        return size;
    }

}
