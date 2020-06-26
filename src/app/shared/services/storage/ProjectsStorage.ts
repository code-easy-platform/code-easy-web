import { ComponentConfigs } from "../../interfaces/ItemTreeComponent";
import { ComponentType } from "./../../enuns/ComponentType";
import { OpenWindow } from "../../interfaces/OpenedWindow";
import { Project } from "./../../interfaces/Aplication";
import { ProjectType } from "./../../enuns/ProjectType";
import { CurrentFocus } from "../../enuns/CurrentFocus";
import { Utils } from "code-easy-components";
import { StorageEnum } from "./StorageEnum";
import { Tab } from "../../interfaces/Tabs";

const newProject = (name: string, version: string, type: ProjectType, description: string) => new Project({
    currentComponentFocus: CurrentFocus.tree,
    projectConfigs: {
        id: `${Utils.getUUID()}`,
        type: type,
        label: name,
        version: version,
        currentProcess: '',
        createdDate: new Date(),
        updatedDate: new Date(),
        description: description,
        autor: ProjectsStorage.getAuthorName(),
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
            items: []
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
            items: [],
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
            items: [],
        }), */
    ]
});

export class ProjectsStorage {

    public static getNewProject(name: string, version: string, type: ProjectType, description: string) {
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

        if (res !== null && res !== "" && res !== undefined) {
            const listString: string[] | undefined = JSON.parse(res);

            if (listString) {
                projects = listString.map(projectString => Project.stringToProject(projectString));

            } else {
                ProjectsStorage.setProjects([]);
                projects = [];
            }

        } else {
            ProjectsStorage.setProjects([]);
            projects = [];
        }

        return projects;
    }

    /** Salva no localstorage uma lista de projetos */
    public static setProjects(projects: Project[]): Project[] {
        const listString = projects.map(project => Project.projectToString(project));

        localStorage.setItem(StorageEnum.projectsStorage, JSON.stringify(listString));
        return projects;
    }

    /** Atualiza no localstorage a lista de projetos */
    public static setProjectById(project: Project) {

        let projects: Project[] = ProjectsStorage.getProjects();

        let itemIndex = projects.findIndex(item_project => item_project.projectConfigs.id === project.projectConfigs.id);

        if (itemIndex > -1) {
            project.projectConfigs.updatedDate = new Date(Date.now());
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        ProjectsStorage.setProjects(projects);
    }

    /** Pego o projeto que está sendo editado no momento */
    public static getProjectById(id?: string): Project {
        const projects = ProjectsStorage.getProjects();

        let project = projects.find(proj => proj.projectConfigs.id === id);

        if (project === undefined) {
            return new Project(newProject('', '', ProjectType.api, ''));
        } else {
            return new Project(project);
        }
    }

    /** Remove o item do local storage */
    public static removeProjectById(id?: string): Project[] {

        let projects = ProjectsStorage.getProjects();
        if (!id) return projects;

        const itemIndex = projects.findIndex(project => project.projectConfigs.id === id);

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

    public static selectWindowById(project: Project, windowId: string): Project {

        project.openWindows.forEach(windowTab => {
            if (windowTab.id === windowId) {
                windowTab.isSelected = true;

                project.tabs.forEach(tab => {
                    tab.items.forEach(item => {

                        if (item.id === windowId) {
                            item.isEditing = true;
                        } else {
                            item.isEditing = false;
                        }

                    });
                });

            } else {
                windowTab.isSelected = false;
            }
        });

        return project;
    }

    public static removeWindowById(project: Project, windowId: string): Project {

        const indexToRemove = project.openWindows.findIndex(windowTab => windowTab.id === windowId);
        if (indexToRemove === -1) return project;

        project.openWindows.splice(indexToRemove, 1);

        project.tabs.forEach(tab => {
            tab.items.forEach(item => {
                if (item.id === windowId) {
                    item.isEditing = false;
                }
            });
        });

        return project;
    }

    public static updateWindowTabs(project: Project): Project {

        const addWindowTab = (winTab: OpenWindow) => {

            if (!project.openWindows.some(windowTab => windowTab.id === winTab.id)) {
                project.openWindows.push(winTab);
            }

            project.openWindows.forEach(windowTab => {
                if (windowTab.id === winTab.id) {
                    windowTab.isSelected = true;
                    windowTab.title = winTab.title;
                    windowTab.description = winTab.description;
                } else {
                    windowTab.isSelected = false;
                }
            });

        }

        let indexToRemove = project.openWindows.findIndex(windowTab => !project.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));
        while (indexToRemove >= 0) {
            project.openWindows.splice(indexToRemove, 1);
            indexToRemove = project.openWindows.findIndex(windowTab => !project.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));
        }

        project.tabs.forEach(tab => {
            tab.items.forEach(item => {
                if (item.isEditing && item.id) {
                    addWindowTab({
                        id: item.id,
                        title: item.label,
                        isSelected: item.isSelected,
                        description: item.description,
                    });
                }
            })
        });

        return project;
    }

}
