
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
    valueHasError?: boolean;
    id: string | undefined;
    nameHasError?: boolean;
    information?: string;
    useOnChange?: boolean;
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
