import { IObservable } from "react-observing";

import { IBasicConfigurations } from "./../IBasicConfigurations";
import { ITreeItemComponent } from "./../ITreeItemComponent";
import { ETabType } from "./../../../enuns";

/**
 * Represents a full Tab structure
 */
export interface ITab<T = ETabType> extends IBasicConfigurations<T> {
  /**
   * List of items that can represent 'actions', 'routes', 'extension' and etc ...
   */
  items: IObservable<ITreeItemComponent[]>;
}
