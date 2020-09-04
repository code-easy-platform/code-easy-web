import { TypeOfValues } from "../enums";
import { ISuggestion } from "./";

export interface IProperty<T = any> {
    /**
     * This will be used only in types assigns and expressions
     * @param e Event emit by html input
     */
    onPickerValueClick?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    /**
     * This will be used only in type assigns
     * @param e Event emit by html input
     */
    onPickerNameClick?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    /**
     * This will be used only in type assigns
     */
    nameSuggestions?: ISuggestion[];
    /**
     * This will be used only in types assigns and expressions
     */
    suggestions?: ISuggestion[];
    /**
     * Disable the input
     */
    editValueDisabled?: boolean;
    /**
     * This will be used only in type assigns
     */
    editNameDisabled?: boolean;
    /**
     * Allow you indicate if the input has a warning 
     */
    valueHasWarning?: boolean;
    /**
     * Allow you indicate if the label has a warning
     */
    nameHasWarning?: boolean;
    /**
     * Allow you indicate if the input has a error 
     */
    valueHasError?: boolean;
    /**
     * Property identifier
     */
    id: string | undefined;
    /**
     * Allow you indicate if the label has a error 
     */
    nameHasError?: boolean;
    /**
     * When true, the input emit your value always in your on change
     */
    useOnChange?: boolean;
    /**
     * This property allows the input to be focused automatically when rendered on the screen
     */
    focusOnRender?: boolean;
    /**
     * Used to display information between the label and the input 
     */
    information?: string;
    /**
     * Max size in bytes
     * Default value 1MB(1048576)
     */
    fileMaxSize?: number;
    /**
     * Help you indicating some type of the attribute this property represents 
     */
    propertieType?: any;
    /**
     * Define the type of field will be displayed
     */
    type: TypeOfValues;
    /**
     * Indicates the group of the property, used to group some properties
     */
    group?: string;
    /**
     * Value displayed in the label of the input
     */
    name?: string;
    /**
     * Value to be displayed in the input
     */
    value: T;
}
