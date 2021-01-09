import { IObservable, observe } from "react-observing";

import { ITreeItemInputVariable } from "../../interfaces";
import { TreeItemComponent } from "../generic";
import { EComponentType } from "../../enuns";

/**
 * Represents a full input variable implementation
 */
export class TreeItemInputVariable extends TreeItemComponent<EComponentType.inputVariable> implements ITreeItemInputVariable {
    items: IObservable<[]> = observe([]);
}
