import { Application, ContentTabClass, ListComponent, ItemConfigs } from "../interfaces/Aplication";
import ProjectType from "../enuns/ProjectType";
import ItemType from "../enuns/ItemType";


const DEFAULT_ROUTERS = new ContentTabClass({
    pastas: [],
    litComponent: [
        new ListComponent({
            itemConfig: new ItemConfigs({
                name: "RotaGetProds",
                description: "Usada para pegar uma lista de produtos.",
                type: ItemType.rota,
            }),
            isEditando: true,
            itens: []
        })
    ]
});

const DEFAULT_PROJECT = new Application({
    projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
    routers: DEFAULT_ROUTERS,
    actions: new ContentTabClass({ pastas: [], litComponent: [] }),
    data: new ContentTabClass({ pastas: [], litComponent: [] })
});

export enum StorageEnum {
    applicationStorage = "APPLICATION_STORAGE"
}

export class Storage {
    public static getApplication(): Application {
        let application: Application;

        let res = localStorage.getItem(StorageEnum.applicationStorage);

        if (res !== null && res !== "" && res !== undefined)
            application = JSON.parse(res);
        else
            application = Storage.setApplication(DEFAULT_PROJECT);

        return application;
    }

    public static setApplication(application: Application): Application {

        localStorage.setItem(StorageEnum.applicationStorage, JSON.stringify(application));

        return application;
    }

    public static resetApplication(): Application {
        localStorage.setItem(StorageEnum.applicationStorage, JSON.stringify(DEFAULT_PROJECT));

        return Storage.getApplication();
    }

}
