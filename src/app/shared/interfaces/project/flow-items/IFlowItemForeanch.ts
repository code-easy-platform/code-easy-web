import { IObservable } from "react-observing";

import { EFlowItemType, EItemType } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemForeanch extends IFlowItemComponent<EItemType.FOREACH> {
    /**
     * This propertie is not used
     */
    description: IObservable<undefined>;
    /**
     * This propertie must be a "FOREACH"
     */
    itemType?: IObservable<EItemType.FOREACH>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
