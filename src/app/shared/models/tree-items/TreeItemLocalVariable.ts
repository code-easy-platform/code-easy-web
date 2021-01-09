import { IObservable, observe } from "react-observing";

import { ITreeItemLocalVariable } from "../../interfaces";
import { TreeItemComponent } from "../generic";
import { EComponentType } from "../../enuns";

/**
 * Represents a full local variable implementation
 */
export class TreeItemLocalVariable extends TreeItemComponent<EComponentType.localVariable> implements ITreeItemLocalVariable {
    items: IObservable<[]> = observe([]);
}
