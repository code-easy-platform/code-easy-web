import { Project } from "../interfaces/Aplication";

export enum StorageEnum {
    projectStorage = "PROJECT_STORAGE"
}

export class Storage {
    public static getProject(): Project | undefined {
        let project: Project | undefined;

        // let res = localStorage.getItem(StorageEnum.projectStorage);

        /* if (res !== null && res !== "" && res !== undefined)
            project = JSON.parse(res);
        else
            project = Storage.setProject(undefined); */

        return project;
    }

    public static setProject(project: Project): Project {
        localStorage.setItem(StorageEnum.projectStorage, JSON.stringify(project));

        return project;
    }

    public static resetProject(): Project | undefined {
        localStorage.setItem(StorageEnum.projectStorage, JSON.stringify(''));

        return Storage.getProject();
    }

}
