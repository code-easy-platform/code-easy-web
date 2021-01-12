import { IObservable } from "react-observing";

import { EFlowItemType, EItemType, IProperty } from "../../../components/external";
import { IFlowItemComponent } from "../generic";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemAssign extends IFlowItemComponent<EItemType.ASSIGN> {
    /**
     * Stores all assigments
     */
    assigments: IObservable<IProperty[]>;
    /**
     * This propertie is not used
     */
    description: IObservable<undefined>;
    /**
     * This propertie must be a "acorn"
     */
    flowItemType: IObservable<EFlowItemType.acorn>;
}
