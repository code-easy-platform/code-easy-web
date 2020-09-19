import { IProjectConfigurations } from "./IProjectConfigurations";
import { IProjectOpenedWindow } from "./IProjectOpenedWindow";
import { ITreeItem } from "../../components/tree-manager";
import { IOpenedWindow } from "./IOpenedWindow";
import { ECurrentFocus } from "./../../enuns";
import { ITab } from "./ITab";

export interface IProject {
    /**
     * Project settings and definitions
     */
    configurations: IProjectConfigurations;
    /**
     * Contains all open windows (action, routes ...)
     */
    windows: IProjectOpenedWindow[];
    /**
     * Indicates which component is currently focused
     */
    currentFocus: ECurrentFocus;
    /**
     * Used to separate routes, actions, data and etc...
     */
    tabs: ITab[];
    /**
     * Used to list all problems in this component
     */
    readonly problems: ITreeItem[];
}

export interface IProjectManageWindows {
    /**
     * Select a window by id
     * @param windowId Window to select
     */
    selectWindowById(windowId: string): void;
    /**
     * Close a window
     * @param windowId window id to remove from openeds windows
     */
    removeWindowById(windowId: string): void;
    /**
     * Get all openeds windows
     */
    getWindows(): IOpenedWindow[];
}

