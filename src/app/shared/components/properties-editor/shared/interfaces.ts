
export enum TypeValues {
    expression='expression',
    bigstring='bigstring',
    boolean='boolean',
    string='string',
    number='number',
    binary='binary',
}

export interface IProperties {
    id: string | undefined;
    label: string;
    typeValue: TypeValues
    value: any;
}

export interface IItem {
    id: string | undefined;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
