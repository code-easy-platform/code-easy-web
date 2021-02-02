import { IObservable } from "react-observing";

import { EFlowItemType, EItemType, IProperty } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemSwitch extends IFlowItemComponent<EItemType.SWITCH> {
    /**
     * Store all condictions
     */
    conditions: IObservable<IProperty<any>[]>;
    /**
     * This prop will be always true 
     */
    isEnabledNewConnetion: IObservable<true>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
