import { set } from "react-observing";

import { Project, ApiProject, ProjectParser } from "../../models";
import { EProjectType, StorageEnum } from "./../../enuns";

/** Used to save projects in the storage */
export class ProjectsStorage {

    /** Return a full project */
    public static getNewProject(name: string, version: string, type: EProjectType, description: string) {
        switch (type) {
            case EProjectType.api:
                return ApiProject.newProject(name, version, description);

            default:
                return new ApiProject();
        }
    }

    /** Will return a logged username. This is isn't working for while */
    public static getAuthorName() {
        return "(Sem nome)";
    }

    /** Get from localstorage a list of projects */
    public static async getProjects(): Promise<Project[]> {
        let res = localStorage.getItem(StorageEnum.projectsStorage);

        console.log('getProjects');

        if (res !== null && res !== "" && res) {
            return ProjectParser.parseProjects(res);
        } else {
            return [];
        }
    }

    /** Save in localstorage a list of projects */
    public static async setProjects(projects: Project[]): Promise<Project[]> {
        const content = ProjectParser.stringifyProjects(projects);
        localStorage.setItem(StorageEnum.projectsStorage, content);

        console.log('setProjects');

        return projects;
    }

    /** Update in localstorage a list of projects */
    public static async setProjectById(project: Project) {
        let projects: Project[] = await ProjectsStorage.getProjects();

        let itemIndex = projects.findIndex(itemProject => itemProject.id.value === project.id.value);

        if (itemIndex > -1) {
            set(project.updatedDate, new Date(Date.now()));
            projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
        }

        await ProjectsStorage.setProjects(projects);
    }

    /** Get a project by id */
    public static async getProjectById(id?: string): Promise<Project | undefined> {
        const projects = await ProjectsStorage.getProjects();

        const project = projects.find(proj => proj.id.value === id);

        if (project) {
            return project;
        } else {
            return undefined;
        }
    }

    /** Remove a project by id from localstorage */
    public static async removeProjectById(id?: string): Promise<Project[]> {
        let projects = await ProjectsStorage.getProjects();
        if (!id) { return projects; }

        const itemIndex = projects.findIndex(project => project.id.value === id);

        if (itemIndex > -1) {
            projects.splice(itemIndex, 1); // Remove item
        }

        await ProjectsStorage.setProjects(projects);
        return projects;
    }
}
