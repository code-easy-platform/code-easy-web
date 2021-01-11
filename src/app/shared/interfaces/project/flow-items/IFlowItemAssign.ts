import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemAssign extends IFlowItemComponent<EItemType.ASSIGN> {
    /**
     * This propertie is not used
     */
    description: IObservable<undefined>;
    /**
     * This propertie must be a "ASSIGN"
     */
    itemType?: IObservable<EItemType.ASSIGN>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
