import { IItemComponentConfigs } from "./IItemComponentConfigs";
import { ITreeItemComponent } from "./ITreeItemComponent";

export interface ITab {
    configs: IItemComponentConfigs;
    items: ITreeItemComponent[];
}
