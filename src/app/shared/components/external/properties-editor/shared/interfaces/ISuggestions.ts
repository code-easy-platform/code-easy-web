import { IObservable } from "react-observing";

/**
 * Defines how a suggestion for a selection or expression input should be reported
 * 
 * @param T Used to define the value attribute
 */
export interface ISuggestion<T = string | number> {
    /**
     * Displayed as a "title" for any type of information that may be relevant at the time of selection
     */
    description: IObservable<string>;
    /**
     * When "true" disables the option and does not allow it to be selected
     */
    disabled: IObservable<boolean>;
    /**
     * Showing as option name to be selected
     */
    label: IObservable<string>;
    /**
     *  Name used internally by the component
     */
    name: IObservable<string>;
    /**
     * Value that will be assigned to input when the option is selected
     */
    value: IObservable<T>;
}
