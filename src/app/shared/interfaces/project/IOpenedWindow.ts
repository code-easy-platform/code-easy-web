import { IObservable } from "react-observing";

export interface IOpenedWindow {
    id: IObservable<string>;
    title: IObservable<string>;
    hasError: IObservable<boolean | undefined>;
    description: IObservable<string | undefined>;
    hasWarning: IObservable<boolean | undefined>;
    isSelected: IObservable<boolean | undefined>;
}
