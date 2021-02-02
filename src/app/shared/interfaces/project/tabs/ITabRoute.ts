import { IObservable } from "react-observing";

import { ITreeItemFolder, ITreeItemInputVariable, ITreeItemLocalVariable, ITreeItemOutpuVariable, ITreeItemRouterConsume, ITreeItemRouterExpose } from "../tree-items";
import { ETabType } from "./../../../enuns";
import { ITab } from "./../generic";

export interface ITabRoute extends ITab<ETabType.tabRoutes> {
    /**
     * List of items that can represent 'consumed routes', 'exposed routes' or 'folders' and etc ...
     */
    items: IObservable<(ITreeItemFolder | ITreeItemRouterConsume | ITreeItemRouterExpose | ITreeItemInputVariable | ITreeItemLocalVariable | ITreeItemOutpuVariable)[]>;
}
