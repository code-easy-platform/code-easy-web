import { IObservable, observe, set, transform } from "react-observing";

import { ITab, ITabListStore } from "./../interfaces";


export class TabListStore implements ITabListStore {

    private readonly _tabs: IObservable<ITab[]>;
    public get tabs(): IObservable<ITab[]> {
        return transform(this._tabs, tabs => tabs);
    }

    constructor(tabs: ITab[]) {
        this._tabs = observe(tabs);
    }

    public addTab(tab: ITab) {
        const currentTab = this.tabs.value.find(currentTab => currentTab.id.value === tab.id.value);
        if (!currentTab) {
            set(this._tabs, oldTabs => {
                oldTabs.forEach(oldTab => {
                    set(oldTab.isSelected, false);
                });
                return [...oldTabs, tab]
            });
        }
    }

    public closeTab(tabId: string) {
        set(this._tabs, oldTabs => {
            oldTabs.forEach((oldTab, index, array) => {

                // Select a new tab when you close the current tab
                if (oldTab.id.value === tabId) {

                    // Unselect the current tab
                    set(oldTab.isSelected, false);

                    // Find the tab
                    if (array.length > 1 && !array.some(arrayItem => arrayItem.isSelected.value)) {
                        if (index === 0) {
                            set(array[index + 1].isSelected, true);
                        } else {
                            set(array[index - 1].isSelected, true);
                        }
                    }
                }
            });

            return oldTabs.filter(oldTab => oldTab.id.value !== tabId);
        });
    }

    public closeAll() {
        set(this._tabs, oldTabs => {
            oldTabs.forEach(oldTab => set(oldTab.isSelected, false))
            return [];
        });
    }
}
