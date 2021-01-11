import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemSwitch extends IFlowItemComponent<EItemType.SWITCH> {
    /**
     * This propertie is not used
     */
    description: IObservable<undefined>;
    /**
     * This propertie must be a "SWITCH"
     */
    itemType?: IObservable<EItemType.SWITCH>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
