import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemComment extends IFlowItemComponent<EItemType.COMMENT> {
    /**
     * This propertie is not used
     */
    hasError: IObservable<false>;
    /**
     * This propertie is not used
     */
    icon: IObservable<undefined>;
    /**
     * This propertie is not used
     */
    hasWarning: IObservable<false>;
    /**
     * This propertie is not used
     */
    isDisabled: IObservable<false>;
    /**
     * Used to validate that this item can be connected with another item
     */
    isEnabledNewConnetion: IObservable<true>;
    /**
     * This propertie must be a "COMMENT"
     */
    itemType?: IObservable<EItemType.COMMENT>;
    /**
     * This propertie must be a "comment"
     */
    flowItemType: IObservable<EFlowItemType.comment>;
}
