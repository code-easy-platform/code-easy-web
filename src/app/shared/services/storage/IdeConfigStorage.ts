import { StorageEnum } from "./StorageEnum";

export enum FlowBackgroundType {
    checkered = 'checkered',
    dotted = 'dotted',
    none = 'custom',
}

interface IIdeConfigs {
    snapGridWhileDragging: boolean,
    flowBackgroundType: FlowBackgroundType;
}

export class IdeConfigStorage {
    /**
     * Queries IDE settings in storage
     */
    public getConfigs(): IIdeConfigs {
        let configs: IIdeConfigs;

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
    public setConfigs(confgs: IIdeConfigs): IIdeConfigs {
        localStorage.setItem(StorageEnum.ideConfigStorage, JSON.stringify(confgs));
        return confgs;
    }

}
