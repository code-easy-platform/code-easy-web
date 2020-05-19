import { Project, Tab, ComponentConfigs } from "../interfaces/Aplication";
import { ComponentType } from "../enuns/ComponentType";
import { ProjectType } from "../enuns/ProjectType";
import { Utils } from "code-easy-components";

export enum StorageEnum {
    projectsStorage = "PROJECTS_STORAGE",
}

const newProject = (name: string, version: string, type: ProjectType, description: string) => new Project({
    projectConfigs: {
        id: `${Utils.getUUID()}`,
        type: type,
        label: name,
        version: version,
        currentProcess: '',
        createdDate: new Date(),
        updatedDate: new Date(),
        description: description,
        autor: Storage.getAuthorName(),
        name: Utils.getNormalizedString(name.toLowerCase()),
        currentPlatformVersion: `${process.env.REACT_APP_VERSION}`,
    },
    tabs: [
        new Tab({
            configs: new ComponentConfigs({
                name: "routes",
                label: "Routes",
                isEditing: true,
                isExpanded: true,
                id: `${Utils.getUUID()}`,
                description: "Routes tab",
                type: ComponentType.tabRoutes,
            }),
            itens: []
        }),
        new Tab({
            configs: new ComponentConfigs({
                name: 'actions',
                label: 'Actions',
                isEditing: false,
                isExpanded: false,
                id: `${Utils.getUUID()}`,
                description: 'Actions tab',
                type: ComponentType.tabActions,
            }),
            itens: [],
        }),
        /* new Tab({
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
        }), */
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

        if (itemIndex > -1) {
            project.projectConfigs.updatedDate = new Date();
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        Storage.setProjects(projects);
    }

    /** Pego o projeto que está sendo editado no momento */
    public static getProjectById(id?: string): Project {
        const projects = Storage.getProjects();

        let project = projects.find(proj => proj.projectConfigs.id === id);

        if (project === undefined) {
            return new Project(newProject('', '', ProjectType.api, ''));
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
