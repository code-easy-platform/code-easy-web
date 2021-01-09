import { ITreeItemGlobalAction } from "../../interfaces";
import { TreeItemComponent } from "../generic";
import { EComponentType } from "../../enuns";

/**
 * Represents a full global action implementation
 */
export class TreeItemGlobalAction extends TreeItemComponent<EComponentType.globalAction> implements ITreeItemGlobalAction {

}
