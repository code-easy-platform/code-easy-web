import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemAction extends IFlowItemComponent<EItemType.ACTION> {
    /**
     * Used to store the action reference
     */
    action: IObservable<string>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
