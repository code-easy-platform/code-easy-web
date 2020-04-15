
export enum TypeValues {
    expression='expression',
    bigstring='bigstring',
    boolean='boolean',
    string='string',
    number='number',
    binary='binary',
    assign='assign',
}

export interface ISuggestion {
    description: string;
    disabled: boolean;
    label: string;
    name: string;
    value: any;
}

export interface IProperties {
    suggestions?: ISuggestion[];
    valueHasError?: boolean;
    id: string | undefined;
    nameHasError?: boolean;
    type: TypeValues;
    name: string;
    value: any;
}

export interface IItem {
    id: string | undefined;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
