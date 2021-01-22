import { IConfigurations } from "./../../interfaces";
import { StorageEnum } from "../../enuns";

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

    /** Get the saved state from a ColumnResizable at localstorage */
    public static getColumnsResizableSize(id: string): number {
        let props = localStorage.getItem(id);
        if (!props) {
            props = IdeConfigStorage.setColumnsResizableSize(id, 300).toString();
        }
        return parseInt(props);
    }

    /** Save the state from a ColumnResizable in the localstorage */
    public static setColumnsResizableSize(id: string, size: number): number {
        localStorage.setItem(id, size.toString());
        return size;
    }
}
