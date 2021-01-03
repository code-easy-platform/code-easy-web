import { IObservable } from "react-observing";

export interface IProjectOpenedWindow {
    isSelected: IObservable<boolean>,
    id: IObservable<string>,
}
