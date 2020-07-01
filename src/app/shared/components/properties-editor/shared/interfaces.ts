
export enum TypeValues {
    yesNoSelection = 'yesNoSelection',
    fullBigString = 'fullBigString',
    expression = 'expression',
    bigstring = 'bigstring',
    selection = 'selection',
    viewOnly = 'viewOnly',
    boolean = 'boolean',
    // addProp = 'addProp',
    string = 'string',
    number = 'number',
    binary = 'binary',
    assign = 'assign',
}

export interface ISuggestion {
    description: string;
    disabled: boolean;
    label: string;
    name: string;
    value: any;
}

export interface IProperties {
    openEditor?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    nameSuggestions?: ISuggestion[];
    suggestions?: ISuggestion[];
    editValueDisabled?: boolean;
    editNameDisabled?: boolean;
    valueHasWarning?: boolean;
    nameHasWarning?: boolean;
    valueHasError?: boolean;
    id: string | undefined;
    nameHasError?: boolean;
    useOnChange?: boolean;
    /**
     * This property allows the input to be focused automatically when rendered on the screen
     */
    focusOnRender?:boolean;
    information?: string;
    /**
     * Max size in bytes
     * Default value 1MB(1048576)
     */
    fileMaxSize?: number;
    propertieType?: any;
    type: TypeValues;
    group?: string;
    name?: string;
    value: any;
}

export interface IItem {
    id: string | undefined;
    name: string;
    subname?: string;
    isHeader: boolean;
    properties: IProperties[];
}
