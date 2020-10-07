import { IconError, IconWarning } from "code-easy-components";

import { IOpenedWindow, IProject, IProjectManageWindows, IProjectOpenedWindow } from "../interfaces";
import { ProjectConfigurations } from "./ProjectConfigurations";
import { EComponentType, ECurrentFocus } from "./../enuns";
import { ITreeItem } from "../components/external";
import { ProjectParser } from "./ProjectParser";
import { Tab } from "./Tab";


type OmitInConstructor = Omit<IProject, 'problems' | 'addProblem'>;

export class Project extends ProjectParser implements IProject, IProjectManageWindows {
    public configurations: ProjectConfigurations;
    public currentFocus: ECurrentFocus;
    public tabs: Tab[];

    private _windows: IProjectOpenedWindow[] = [];
    public get windows(): IProjectOpenedWindow[] {
        this._updateWindowTabs();
        return this._windows;
    }

    private _problems: ITreeItem[] = [];
    public get problems(): ITreeItem[] {
        this._problems = [
            ...this.configurations.problems,
        ];

        this.tabs.forEach(tab => {
            this._problems = [
                ...this._problems,
                ...tab.problems,
            ];
        });

        if (this.tabs.find(treeItem => treeItem.type === EComponentType.tabRoutes)?.items.length === 0) {
            this.addProblem(`The project must be have last one route.`, 'error');
        }

        return this._problems;
    }

    constructor(fields: OmitInConstructor) {
        super();

        this.configurations = new ProjectConfigurations(fields.configurations);
        this.tabs = fields.tabs.map(tab => new Tab(tab));
        this.currentFocus = fields.currentFocus;
        this._windows = fields.windows;
    }

    public addProblem(label: string, type: 'warning' | 'error' | 'success') {
        this._problems.push({
            icon: type === 'warning' ? IconWarning : type === 'error' ? IconError : undefined,
            isDisabledSelect: true,
            nodeExpanded: false,
            isSelected: false,
            id: undefined,
            iconSize: 15,
            type: "ITEM",
            label,
        });
    }

    public getWindows(): IOpenedWindow[] {
        let windows: IOpenedWindow[] = [];

        // Update windows
        this._updateWindowTabs();

        this.tabs.forEach(tab => {
            this._windows.forEach(windowProps => {

                const tabItem = tab.items.find(tabItem => tabItem.id === windowProps.id);
                if (tabItem && tabItem.id) {
                    windows = [
                        ...windows,
                        {
                            id: tabItem.id,
                            title: tabItem.label,
                            hasError: tabItem.hasError,
                            isSelected: tabItem.isEditing,
                            hasWarning: tabItem.hasWarning,
                            description: tabItem.description,
                        }
                    ]
                }
            });
        });

        return windows;
    }

    public selectWindowById(windowId: string) {
        this._windows.forEach(windowTab => {
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

    public removeWindowById(windowId: string) {
        const indexToRemove = this._windows.findIndex(windowTab => windowTab.id === windowId);
        if (indexToRemove === -1) return;

        this._windows.splice(indexToRemove, 1);

        if (this._windows.length > 0) {
            this.selectWindowById(this._windows[this._windows.length - 1].id);
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
    private _updateWindowTabs() {

        /** Add or select a tab */
        const addWindowTab = (winTab: IProjectOpenedWindow) => {

            // If the tab is not yet open add the list of tabs
            if (!this._windows.some(windowTab => windowTab.id === winTab.id)) {
                this._windows.push({
                    id: winTab.id,
                    isSelected: Boolean(winTab.isSelected),
                });
            }

            // If the tab is open, just select it
            this._windows.forEach(windowTab => {
                if (windowTab.id === winTab.id) {
                    windowTab.isSelected = true;
                } else {
                    windowTab.isSelected = false;
                }
            });
        };

        this._windows = this._windows.filter(windowTab => this.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));

        // Searches for tabs that have been deleted to remove them from the list
        /* let indexToRemove;
        do {
            indexToRemove = this._windows.findIndex(windowTab => !this.tabs.some(tab => tab.items.some(item => item.id === windowTab.id)));
            if (indexToRemove >= 0) {
                this._windows.splice(indexToRemove, 1);
            }
        } while (indexToRemove >= 0) */

        // Search for new tabs being edited
        this.tabs.forEach(tab => {
            tab.items.forEach(item => {
                if (item.isEditing && item.id) {
                    addWindowTab({
                        id: item.id,
                        isSelected: true,
                    });
                }
            });
        });
    }
}
