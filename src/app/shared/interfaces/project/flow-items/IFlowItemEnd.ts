import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemEnd extends IFlowItemComponent<EItemType.END> {
    /**
     * Used to name a record visually only
     */
    label: IObservable<'End'>;
    /**
     * This propertie is not used
     */
    connections: IObservable<[]>;
    /**
     * This propertie is not used
     */
    description: IObservable<undefined>;
    /**
     * This propertie must be a "End"
     */
    itemType?: IObservable<EItemType.END>;
    /**
     * This propertie must be "false" if connection is not used
     */
    isEnabledNewConnetion: IObservable<false>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
