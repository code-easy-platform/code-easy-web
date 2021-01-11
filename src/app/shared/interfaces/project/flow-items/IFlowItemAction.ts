import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemAction extends IFlowItemComponent<EItemType.ACTION> {
    /**
     * This propertie must be a "ACTION"
     */
    itemType?: IObservable<EItemType.ACTION>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
