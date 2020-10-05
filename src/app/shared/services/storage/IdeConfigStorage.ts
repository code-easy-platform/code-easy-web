import { IConfigurations } from "./../../interfaces";
import { StorageEnum } from "./StorageEnum";

export enum FlowBackgroundType {
    checkered = 'checkered',
    dotted = 'dotted',
    none = 'custom',
}

export class IdeConfigStorage {

    /**
     * Queries IDE settings in storage
     */
    public static getConfigs(): IConfigurations {
        let configs: IConfigurations;

        let res = localStorage.getItem(StorageEnum.ideConfigStorage);

        if (res !== null && res !== "" && res !== undefined)
            configs = JSON.parse(res);
        else {
            configs = this.setConfigs({
                flowBackgroundType: FlowBackgroundType.dotted,
                snapGridWhileDragging: true,
                defaultPort: 3333,
            });
        }

        return configs;
    }

    /**
     * Save IDE settings to storage
     */
    public static setConfigs(confgs: IConfigurations): IConfigurations {
        localStorage.setItem(StorageEnum.ideConfigStorage, JSON.stringify(confgs));
        return confgs;
    }
}
