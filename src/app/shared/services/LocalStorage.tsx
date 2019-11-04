import ProjectType from "../enuns/ProjectType";
import { Project, Tab, ComponentConfigs, Component } from "../interfaces/Aplication";
import { ComponentType } from "../enuns/ComponentType";
import { FluxoComponentTypes } from "../../pages/editor/tabs/editor-tab/components/code-editor/enuns/FluxoList";


export const DEFAULT_PROJECT = new Project({
    projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
    tabs: [
        new Tab({
            itens: [
                new Component({
                    id: 50,
                    paiId: 0,
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    title: "",
                    fluxoItemTypes: FluxoComponentTypes.flowItem,
                    isHaveSucessor: false,
                    isHaveAntecessor: false,
                    antecessorId: 0,
                    sucessorId: 0,
                    configs: new ComponentConfigs({
                        name: "Teste01",
                        description: "Descrição",
                        isEditando: true,
                        isExpanded: false,
                        type: ComponentType.localAction
                    }),
                }),
                new Component({
                    id: 51,
                    paiId: 50,
                    top: 100,
                    left: 100,
                    width: 80,
                    height: 80,
                    title: "Local action",
                    fluxoItemTypes: FluxoComponentTypes.flowItem,
                    isHaveSucessor: false,
                    isHaveAntecessor: false,
                    antecessorId: 0,
                    sucessorId: 0,
                    configs: new ComponentConfigs({
                        name: "Drag me",
                        description: "Descrição",
                        isEditando: true,
                        isExpanded: false,
                        type: ComponentType.flowItem
                    }),
                }),
                new Component({
                    id: 51,
                    paiId: 50,
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    title: "",
                    fluxoItemTypes: FluxoComponentTypes.flowItem,
                    isHaveSucessor: false,
                    isHaveAntecessor: false,
                    antecessorId: 0,
                    sucessorId: 0,
                    configs: new ComponentConfigs({
                        name: "Variável",
                        description: "Descrição",
                        isEditando: true,
                        isExpanded: false,
                        type: ComponentType.localVariable
                    }),
                }),
            ],
            configs: new ComponentConfigs({ name: "Routers", type: ComponentType.tabRouters, isEditando: true, isExpanded: false, description: "Routers" })
        }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Actions", type: ComponentType.tabActions, isEditando: false, isExpanded: false, description: "Actions" }) }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Dates", type: ComponentType.tabDates, isEditando: false, isExpanded: false, description: "Dates" }) }),
    ],
});

export enum StorageEnum {
    projectStorage = "PROJECT_STORAGE"
}

export class Storage {
    public static getProject(): Project {
        let project: Project;

        let res = localStorage.getItem(StorageEnum.projectStorage);

        if (res !== null && res !== "" && res !== undefined)
            project = JSON.parse(res);
        else
            project = Storage.setProject(DEFAULT_PROJECT);

        return project;
    }

    public static setProject(project: Project): Project {
        localStorage.setItem(StorageEnum.projectStorage, JSON.stringify(project));

        return project;
    }

    public static resetProject(): Project {
        localStorage.setItem(StorageEnum.projectStorage, JSON.stringify(DEFAULT_PROJECT));

        return Storage.getProject();
    }

}
