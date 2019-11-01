import ProjectType from "../enuns/ProjectType";
import { Project, Tab, ComponentConfigs } from "../interfaces/Aplication";
import { ComponentType } from "../enuns/ComponentType";


export const DEFAULT_PROJECT = new Project({
    projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
    tabs: [
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Routers",  type: ComponentType.tabRouters, isEditando: false, isExpanded: false, description: "Routers" }) }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Actions",  type: ComponentType.tabActions, isEditando: false, isExpanded: false, description: "Actions" }) }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Dates",    type: ComponentType.tabDates,   isEditando: false, isExpanded: false, description: "Dates" }) }),
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
