import { IProjectConfigurations } from "./IProjectConfigurations";
import { IProjectOpenedWindow } from "./IProjectOpenedWindow";
import { IOpenedWindow } from "./IOpenedWindow";
import { ECurrentFocus } from "../../../enuns";
import { ITab } from "./ITab";

export interface IProject {
    configurations: IProjectConfigurations;
    windows: IProjectOpenedWindow[];
    currentFocus: ECurrentFocus;
    tabs: ITab[];
}

export interface IProjectManageWindows {
    selectWindowById(windowId: string): void;
    removeWindowById(windowId: string): void;
    getWindows(): IOpenedWindow[];
}

