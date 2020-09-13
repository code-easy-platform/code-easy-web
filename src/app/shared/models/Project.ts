import { IProject, IProjectConfigurations, IProjectOpenedWindow, IOpenedWindow, IProjectManageWindows } from "../interfaces";
import { ProjectParser } from "./ProjectParser";
import { ECurrentFocus } from "../enuns";
import { Tab } from "./Tabs";

/**
 * Represents a project
 */
export class Project extends ProjectParser implements IProject, IProjectManageWindows {
    projectConfigs: IProjectConfigurations;
    currentComponentFocus: ECurrentFocus;
    openWindows: IProjectOpenedWindow[];
    tabs: Tab[];

    constructor(private fields: {
        projectConfigs: IProjectConfigurations;
        currentComponentFocus: ECurrentFocus;
        openWindows?: IProjectOpenedWindow[];
        tabs: Tab[];
    }) {
        super();
        this.currentComponentFocus = this.fields.currentComponentFocus;
        this.tabs = this.fields.tabs.map(tab => new Tab(tab));
        this.projectConfigs = this.fields.projectConfigs;
        this.openWindows = this.fields.openWindows || [];
    }

    /**
     * Get all opened windows
     */
    public getOpenedWindows(): IOpenedWindow[] {
        let windows: IOpenedWindow[] = [];

        this.tabs.forEach(tab => {
            this.openWindows.forEach(windowProps => {

                const tabItem = tab.items.find(tabItem => tabItem.id === windowProps.id);
                if (tabItem && tabItem.id) {
                    windows = [
                        ...windows,
                        {
                            id: tabItem.id,
                            title: tabItem.label,
                            isSelected: tabItem.isEditing,
                            description: tabItem.description,
                            hasError: tabItem.items.some(itemFlow => itemFlow.hasError),
                            hasWarning: tabItem.items.some(itemFlow => itemFlow.hasWarning)
                        }
                    ]
                }

            });
        });

        return windows;
    }

    /**
     * Select a window by id
     * @param windowId Window to select
     */
    public selectWindowById(windowId: string) {
        this.openWindows.forEach(windowTab => {
            if (windowTab.id === windowId) {
                windowTab.isSelected = true;

                this.tabs.forEach(tab => {
                    tab.items.forEach(item => {

                        if (item.id === windowId) {
                            item.isEditing = true;
                        } else {
                            item.isEditing = false;
                        }

                    });
                });

            } else {
                windowTab.isSelected = false;
            }
        });
    }

    /**
     * Close a window
     * @param windowId window id to remove from openeds windows
     */
    public removeWindowById(windowId: string) {
        const indexToRemove = this.openWindows.findIndex(windowTab => windowTab.id === windowId);
        if (indexToRemove === -1) return;

        this.openWindows.splice(indexToRemove, 1);

        if (this.openWindows.length > 0) {
            this.selectWindowById(this.openWindows[this.openWindows.length - 1].id);
        }

        this.tabs.forEach(tab => {
            tab.items.forEach(item => {
                if (item.id === windowId) {
                    item.isEditing = false;
                }
            });
        });
    }

    /**
     * Updated windows openeds
     */
    public updateWindowTabs() {

        const addWindowTab = (winTab: IProjectOpenedWindow) => {

            if (!this.openWindows.some(windowTab => windowTab.id === winTab.id)) {
                this.openWindows.push({
                    id: winTab.id,
                    isSelected: Boolean(winTab.isSelected),
                });
            }

            this.openWindows.forEach(windowTab => {
                if (windowTab.id === winTab.id) {
                    windowTab.isSelected = true;
                } else {
                    windowTab.isSelected = false;
                }
            });
        };


        let indexToRemove = this.openWindows.findIndex(windowTab => !this.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));
        while (indexToRemove >= 0) {
            this.openWindows.splice(indexToRemove, 1);
            indexToRemove = this.openWindows.findIndex(windowTab => !this.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));
        }

        this.tabs.forEach(tab => {
            tab.items.forEach(item => {
                if (item.isEditing && item.id) {
                    addWindowTab({
                        id: item.id,
                        isSelected: item.isSelected,
                    });
                }
            });
        });
    }
}
