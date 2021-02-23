import { IObservable } from "react-observing";

import { ITreeItemComponent } from "../generic";
import { EComponentType } from "../../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemRouterExpose extends ITreeItemComponent<EComponentType.routeExpose> {
    /**
     * Store router path
     */
    path: IObservable<string>;
    /**
     * Store router path complete
     */
    pathComplete: IObservable<string>;
}
