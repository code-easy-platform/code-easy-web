import { Project, Tab, ComponentConfigs, ItemFlowComplete, ItemComponent } from "../interfaces/Aplication";
import { TreeItensTypes } from "../components/tree-manager/shared/models/TreeItensTypes";
import { TypeValues } from "../components/properties-editor/shared/interfaces";
import { ItemType } from "../components/code-editor/models/ItemFluxo";
import { ComponentType } from "../enuns/ComponentType";
import { ProjectType } from "../enuns/ProjectType";
import { Utils } from "./Utils";

export enum StorageEnum {
    projectStorage = "PROJECT_STORAGE"
}

const mockProjeto: Project = new Project({
    projectConfigs: {
        id: `${Utils.getUUID()}`,
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
                id: `${Utils.getUUID()}`,
                name: "routes",
                isExpanded: true,
                label: "Routes",
                isEditando: true,
                description: "Minha tab de routes",
                type: ComponentType.tabRouters
            }),
            itens: [
                new ItemComponent({
                    id: `${Utils.getUUID()}`,
                    isEditing: false,
                    isSelected: false,
                    nodeExpanded: true,
                    name: 'authenticate',
                    itemPaiId: undefined,
                    label: "Authenticate",
                    type: TreeItensTypes.file,
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
                    type: TreeItensTypes.file,
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
                isEditando: false,
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
                    type: TreeItensTypes.file,
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
                    type: TreeItensTypes.file,
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
                isEditando: false,
                isExpanded: false,
                type: ComponentType.tabDates,
                description: 'Permite a criação do banco de dados da aplicação de APIs',
            }),
            itens: [],
        }),
    ]
})

export class Storage {

    public static getProject(): Project {
        let project: Project;

        let res = localStorage.getItem(StorageEnum.projectStorage);

        if (res !== null && res !== "" && res !== undefined)
            project = JSON.parse(res);
        else {
            Storage.setProject(mockProjeto);
            project = mockProjeto;
        }

        return new Project(project);
    }

    public static setProject(project: Project): Project {
        localStorage.setItem(StorageEnum.projectStorage, JSON.stringify(project));

        return new Project(Storage.getProject());
    }

    public static resetProject(): Project {
        localStorage.removeItem(StorageEnum.projectStorage);
        return new Project(Storage.getProject());
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
