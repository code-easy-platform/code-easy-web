import { IObservable } from "react-observing";

import { ITreeItemComponent } from "../generic";
import { EComponentType } from "../../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemLocalVariable extends ITreeItemComponent<EComponentType.localVariable> {
    /**
     * This propertie is not used in a folder
     */
    items: IObservable<[]>;
    /**
     * This propertie is not used in a folder
     */
    isEditing: IObservable<false>;
}
