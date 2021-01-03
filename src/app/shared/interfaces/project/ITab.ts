import { IObservable } from "react-observing";

import { IBasicConfigurations } from "./IBasicConfigurations";
import { ITreeItemComponent } from "./ITreeItemComponent";
import { EComponentType } from "../../enuns";

/**
 * Represents a full Tab structure
 */
export interface ITab extends IBasicConfigurations<EComponentType> {
  /**
   * List of items that can represent 'actions', 'routes', 'extension' and etc ...
   */
  items: IObservable<ITreeItemComponent[]>;
}
