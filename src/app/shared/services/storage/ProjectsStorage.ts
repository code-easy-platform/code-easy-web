import { Utils } from "code-easy-components";

import { EComponentType, EProjectType, ECurrentFocus } from "./../../enuns";
import { Project, Tab, ProjectConfigurations } from "../../models";
import { StorageEnum } from "./StorageEnum";

const newProject = (name: string, version: string, type: EProjectType, description: string) => new Project({
    currentFocus: ECurrentFocus.tree,
    windows:[],
    configurations: new ProjectConfigurations({
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
    }),
    tabs: [
        new Tab({
            items: [],
            label: "Routes",
            isEditing: true,
            isExpanded: true,
            isSelected: false,
            id: Utils.getUUID(),
            type: EComponentType.tabRoutes,
            description: EComponentType.tabRoutes,
        }),
        new Tab({
            items: [],
            label: 'Actions',
            isEditing: false,
            isExpanded: false,
            isSelected: false,
            id: Utils.getUUID(),
            type: EComponentType.tabActions,
            description: EComponentType.tabActions,
        }),
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

        let projects: Project[];
        let res = localStorage.getItem(StorageEnum.projectsStorage);

        if (res !== null && res !== "" && res) {
            projects = Project.parseProjects(res);
            if (projects === []) {
                ProjectsStorage.setProjects([]);
            }
        } else {
            ProjectsStorage.setProjects([]);
            projects = [];
        }

        return projects;
    }

    /** Salva no localstorage uma lista de projetos */
    public static setProjects(projects: Project[]): Project[] {
        localStorage.setItem(StorageEnum.projectsStorage, Project.stringifyProjects(projects));
        return projects;
    }

    /** Atualiza no localstorage a lista de projetos */
    public static setProjectById(project: Project) {

        let projects: Project[] = ProjectsStorage.getProjects();

        let itemIndex = projects.findIndex(itemProject => itemProject.configurations.id === project.configurations.id);

        if (itemIndex > -1) {
            project.configurations.updatedDate = new Date(Date.now());
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        ProjectsStorage.setProjects(projects);
    }

    /** Pego o projeto que está sendo editado no momento */
    public static getProjectById(id?: string): Project {
        const projects = ProjectsStorage.getProjects();

        let project = projects.find(proj => proj.configurations.id === id);

        if (!project) {
            return new Project(newProject('', '', EProjectType.api, ''));
        } else {
            return new Project(project);
        }
    }

    /** Remove o item do local storage */
    public static removeProjectById(id?: string): Project[] {

        let projects = ProjectsStorage.getProjects();
        if (!id) { return projects; }

        const itemIndex = projects.findIndex(project => project.configurations.id === id);

        if (itemIndex > -1) {
            projects.splice(itemIndex, 1); // Remove item
        }

        ProjectsStorage.setProjects(projects);
        return projects;
    }

    /** Reseta o projeto que está sendo editado no momento */
    public static resetProject(): Project {
        return new Project(ProjectsStorage.getProjectById());
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
