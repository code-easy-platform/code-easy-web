import { ITreeItemComponent } from "./ITreeItemComponent";
import { IBasicFields } from "./IBasicFields";

export interface ITab {
    items: ITreeItemComponent[];
    configs: IBasicFields;
}
