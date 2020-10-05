/**
 * Defines how a suggestion for a selection or expression input should be reported
 * 
 * @param T Used to define the value attribute
 */
export interface ISuggestion<T = string | number> {
    /**
     * Displayed as a "title" for any type of information that may be relevant at the time of selection
     */
    description: string;
    /**
     * When "true" disables the option and does not allow it to be selected
     */
    disabled: boolean;
    /**
     * Showing as option name to be selected
     */
    label: string;
    /**
     *  Name used internally by the component
     */
    name: string;
    /**
     * Value that will be assigned to input when the option is selected
     */
    value: T;
}
