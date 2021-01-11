import { IObservable } from "react-observing";

import { ITreeItemComponent } from "../generic";
import { EComponentType } from "../../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemExtension extends ITreeItemComponent<EComponentType.extension> {
    /**
     * This propertie is not used in a folder
     */
    items: IObservable<[]>;
}
