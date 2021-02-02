import { IObservable } from "react-observing";

import { IFileContent } from "./IFileContent";

export interface ITab {
    /**
     * Unique tab identifier
     */
    id: IObservable<string>;
    /**
     * Text in the tab
     */
    title: IObservable<string>;
    /**
     * Allow to notify about errors
     */
    hasError: IObservable<boolean | undefined>;
    /**
     * Show to the user a message
     */
    description: IObservable<string | undefined>;
    /**
     * Allow to notify about warnings
     */
    hasWarning: IObservable<boolean | undefined>;
    /**
     * Change the tab appearance
     */
    isSelected: IObservable<boolean | undefined>;
    /**
     * Icon to show in the tab
     */
    icon: IObservable<IFileContent | string | undefined>;
}
