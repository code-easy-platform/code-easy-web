import { Project, ApiProject, ProjectParser } from "../../models";
import { EProjectType, StorageEnum } from "./../../enuns";

/** Return a full project */
function getNewProject(name: string, version: string, type: EProjectType, description: string) {
    switch (type) {
        case EProjectType.api:
            return ApiProject.newProject(name, version, description);

        default:
            return new ApiProject();
    }
};

/** Will return a logged username. This is isn't working for while */
function getAuthorName() {
    return "(Sem nome)";
};

/** Get from localstorage a list of projects */
async function getProjects(): Promise<Project[]> {
    let res = localStorage.getItem(StorageEnum.projectsStorage);

    if (res !== null && res !== "" && res) {
        return ProjectParser.parseProjects(res);
    } else {
        return [];
    }
};

/** Save in localstorage a list of projects */
async function setProjects(projects: Project[]): Promise<Project[]> {
    const content = ProjectParser.stringifyProjects(projects);
    localStorage.setItem(StorageEnum.projectsStorage, content);

    return projects;
};

/** Update in localstorage a list of projects */
async function setProjectById(project: Project) {
    let projects: Project[] = await getProjects();

    let itemIndex = projects.findIndex(itemProject => itemProject.id.value === project.id.value);

    if (itemIndex > -1) {
        // set(project.updatedDate, new Date(Date.now()));
        project.updatedDate.value = new Date(Date.now());
        projects.splice(itemIndex, 1, project); // Remove elemento antigo e coloca um novo no lugar
    }

    await setProjects(projects);
};

/** Get a project by id */
async function getProjectById(id?: string): Promise<Project | undefined> {
    const projects = await getProjects();

    const project = projects.find(proj => proj.id.value === id);

    if (project) {
        return project;
    } else {
        return undefined;
    }
};

/** Remove a project by id from localstorage */
async function removeProjectById(id?: string): Promise<Project[]> {
    let projects = await getProjects();
    if (!id) { return projects; }

    const itemIndex = projects.findIndex(project => project.id.value === id);

    if (itemIndex > -1) {
        projects.splice(itemIndex, 1); // Remove item
    }

    await setProjects(projects);
    return projects;
}

/** Used to save projects in the storage */
export var ProjectsStorage = {
    getProjects,
    setProjects,
    getNewProject,
    getAuthorName,
    setProjectById,
    getProjectById,
    removeProjectById,
}
