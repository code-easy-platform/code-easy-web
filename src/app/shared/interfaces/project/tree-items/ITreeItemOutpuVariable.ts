import { IObservable } from "react-observing";

import { ITreeItemComponent } from "../generic";
import { EComponentType } from "../../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemOutpuVariable extends ITreeItemComponent<EComponentType.outputVariable> {
    /**
     * This propertie is used in a variable
     */
    items: IObservable<[]>;
}
