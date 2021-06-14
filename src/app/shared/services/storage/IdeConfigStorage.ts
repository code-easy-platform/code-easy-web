import { IConfigurations } from "./../../interfaces";
import { StorageEnum } from "../../enuns";

export enum FlowBackgroundType {
    checkered = 'checkered',
    dotted = 'dotted',
    none = 'custom',
}

/**
 * Save IDE settings to storage
 */
function setConfigs(confgs: IConfigurations): IConfigurations {
    localStorage.setItem(StorageEnum.ideConfigStorage, JSON.stringify(confgs));
    return confgs;
};

/**
 * Queries IDE settings in storage
 */
function getConfigs(): IConfigurations {
    const res = localStorage.getItem(StorageEnum.ideConfigStorage);
    let configs: IConfigurations;

    if (res !== null && res !== "" && res !== undefined) {
        configs = JSON.parse(res);
    } else {
        configs = setConfigs({
            flowBackgroundType: FlowBackgroundType.dotted,
            snapGridWhileDragging: true,
            defaultPort: 3333,
        });
    }

    return configs;
};

/** Save the state from a ColumnResizable in the localstorage */
function setColumnsResizableSize(id: string, size: number): number {
    localStorage.setItem(id, size.toString());
    return size;
};

/** Get the saved state from a ColumnResizable at localstorage */
function getColumnsResizableSize(id: string): number {
    let props = localStorage.getItem(id);
    if (!props) {
        props = setColumnsResizableSize(id, 300).toString();
    }
    return parseInt(props);
};

export var IdeConfigStorage = {
    getConfigs,
    setConfigs,
    getColumnsResizableSize,
    setColumnsResizableSize,
}
