import { IObservable } from "react-observing";

import { ITab } from "./ITab";

export interface ITabListStore {
    /**
     * Store all openeds tabs
     */
    readonly tabs: IObservable<ITab[]>;
    /**
     * Allow you to store a new opened tab
     */
    addTab: (tab: ITab) => void;
    /**
     * Allow you to close a tab
     */
    closeTab: (tabId: string) => void;
    /**
     * Allow you to close all tabs
     */
    closeAll: () => void;
}
