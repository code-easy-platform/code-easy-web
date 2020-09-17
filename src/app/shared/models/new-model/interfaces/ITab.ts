import { IBasicConfigurations } from "./IBasicConfigurations";
import { ITreeItemComponent } from "./ITreeItemComponent";
import { EComponentType } from "../../../enuns";

export interface ITab extends IBasicConfigurations<EComponentType> {
    /**
     * List of items that can represent 'actions', 'routes', 'extension' and etc ...
     */
    items: ITreeItemComponent[];
}
