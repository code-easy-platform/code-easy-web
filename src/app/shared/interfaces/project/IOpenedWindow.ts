import { IObservable } from "react-observing";

import { IFileContent } from "../../components/external";

export interface IOpenedWindow {
    id: IObservable<string>;
    title: IObservable<string>;
    icon: IObservable<IFileContent | string>;
    hasError: IObservable<boolean | undefined>;
    description: IObservable<string | undefined>;
    hasWarning: IObservable<boolean | undefined>;
    isSelected: IObservable<boolean | undefined>;
}
