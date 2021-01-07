import { IObservable, observe } from "react-observing";

import { IOpenedWindow } from "../interfaces";

export const WindowsStore: IObservable<IOpenedWindow[]> = observe([]);
