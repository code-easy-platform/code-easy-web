import { IObservable } from "react-observing";

import { EItemType, IConnection, IFileContent, IFlowItem } from "../../../components/external";
import { IBasicConfigurations } from "../IBasicConfigurations";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemComponent<T = EItemType> extends IBasicConfigurations<T>, Omit<IFlowItem, 'itemType'> {
    /**
     * Used to name a record visually only
     */
    label: IObservable<string>;
    /**
     * Used to display some image
     */
    icon: IObservable<IFileContent | undefined>;
    /** 
     * Indicates where the item is selected in the tree.
     */
    isSelected: IObservable<boolean>;
    /**
     * Store a list of possible connections in a flow item
     */
    connections: IObservable<IConnection[]>;
}
