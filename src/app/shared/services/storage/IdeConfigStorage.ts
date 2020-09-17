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
     * 
     * @deprecated 
     */
    public getConfigs(): IConfigurations {
        let configs: IConfigurations;

        let res = localStorage.getItem(StorageEnum.ideConfigStorage);

        if (res !== null && res !== "" && res !== undefined)
            configs = JSON.parse(res);
        else {
            configs = this.setConfigs({
                flowBackgroundType: FlowBackgroundType.dotted,
                snapGridWhileDragging: true,
            });
        }

        return configs;
    }

    /**
     * Save IDE settings to storage
     * 
     * @deprecated 
     */
    public setConfigs(confgs: IConfigurations): IConfigurations {
        localStorage.setItem(StorageEnum.ideConfigStorage, JSON.stringify(confgs));
        return confgs;
    }

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
