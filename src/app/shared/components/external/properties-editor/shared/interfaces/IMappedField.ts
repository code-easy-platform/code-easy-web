import { IObservable } from "react-observing";

import { IProperty } from "./IFieldProperties";

/**
 * 
 */
export interface IMappedField {
    /**
     * 
     */
    properties: IObservable<IProperty[]>;
    /**
     * 
     */
    fieldValue: IObservable<string>;
}
