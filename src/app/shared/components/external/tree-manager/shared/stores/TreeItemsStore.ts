import { IObservable, observe } from "react-observing";

import { ITreeItem } from "../interfaces";

export const TreeItemsStore: IObservable<ITreeItem[]> = observe([]);
