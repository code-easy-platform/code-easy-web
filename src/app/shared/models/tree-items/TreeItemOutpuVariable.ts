import { IObservable, observe } from "react-observing";

import { ITreeItemOutpuVariable } from "../../interfaces";
import { TreeItemComponent } from "../generic";
import { EComponentType } from "../../enuns";

/**
 * Represents a full output variable implementation
 */
export class TreeItemOutpuVariable extends TreeItemComponent<EComponentType.outputVariable> implements ITreeItemOutpuVariable {
    items: IObservable<[]> = observe([]);
}
