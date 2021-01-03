import { Utils } from "code-easy-components";

import { EComponentType, EProjectType } from "./../../enuns";
import { Project, Tab } from "../../models";
import { StorageEnum } from "./StorageEnum";
import { set } from "react-observing";

const newProject = (name: string, version: string, type: EProjectType, description: string) => new Project({
    /* configurations: new ProjectConfigurations({
        type,
        version,
        description,
        label: name,
        id: Utils.getUUID(),
        createdDate: new Date(),
        updatedDate: new Date(),
        author: ProjectsStorage.getAuthorName(),
        currentPlatformVersion: `${process.env.REACT_APP_VERSION}`,
        createdInPlatformVersion: `${process.env.REACT_APP_VERSION}`,
    }), */
    type,
    properties: [],
    tabs: [
        new Tab({
            items: [],
            /* label: "Routes",
            isEditing: true,
            isExpanded: true,
            isSelected: false, */
            id: Utils.getUUID(),
            type: EComponentType.tabRoutes,
            /* description: EComponentType.tabRoutes, */
        }),
        /* new Tab({
            items: [],
            label: 'Actions',
            isEditing: false,
            isExpanded: false,
            isSelected: false,
            id: Utils.getUUID(),
            type: EComponentType.tabActions,
            description: EComponentType.tabActions,
        }), */
        /* new Tab({
            configs: new BasicConfigs({
                id: `${Utils.getUUID()}`,
                name: 'data',
                label: 'Data',
                isEditing: false,
                isExpanded: false,
                type: EComponentType.tabDates,
                description: 'Data tab',
            }),
            items: [],
        }), */
    ]
});

export class ProjectsStorage {

    public static getNewProject(name: string, version: string, type: EProjectType, description: string) {
        return newProject(name, version, type, description);
    }

    /** Retornará o nome do usuário logado, ainda não há possíbilidade de logar-se. */
    public static getAuthorName() {
        return "(Sem nome)";
    }

    /** Pega do localstorage uma lista de projetos */
    public static getProjects(): Project[] {
        let res = localStorage.getItem(StorageEnum.projectsStorage);

        if (res !== null && res !== "" && res) {
            return [] // Project.parseProjects(res);
        } else {
            return [];
        }
    }

    /** Salva no localstorage uma lista de projetos */
    public static setProjects(projects: Project[]): Project[] {
        // localStorage.setItem(StorageEnum.projectsStorage, Project.stringifyProjects(projects));
        return projects;
    }

    /** Atualiza no localstorage a lista de projetos */
    public static setProjectById(project: Project) {

        let projects: Project[] = ProjectsStorage.getProjects();

        let itemIndex = projects.findIndex(itemProject => itemProject.id.value === project.id.value);

        if (itemIndex > -1) {
            set(project.updatedDate, new Date(Date.now()));
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        ProjectsStorage.setProjects(projects);
    }

    /** Pego o projeto que está sendo editado no momento */
    public static getProjectById(id?: string): Project {
        const projects = ProjectsStorage.getProjects();

        let project = projects.find(proj => proj.id.value === id);

        if (!project) {
            return new Project({ properties: [], tabs: [], type: EProjectType.api });
        } else {
            return new Project({ properties: [], tabs: [], type: EProjectType.api });
        }
    }

    /** Remove o item do local storage */
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

    /** Reseta o projeto que está sendo editado no momento */
    public static resetProject(): Project {
        return new Project({ properties: [], tabs: [], type: EProjectType.api }/* ProjectsStorage.getProjectById() */);
    }

    public static getColumnsResizableSize(id: string): number {
        let props = localStorage.getItem(id);
        if (!props) {
            props = ProjectsStorage.setColumnsResizableSize(id, 300).toString();
        }
        return parseInt(props);
    }

    public static setColumnsResizableSize(id: string, size: number): number {
        localStorage.setItem(id, size.toString());
        return size;
    }
}
