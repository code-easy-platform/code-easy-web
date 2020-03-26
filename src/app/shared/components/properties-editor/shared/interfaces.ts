
export enum TypeValues {
    expression='expression',
    bigstring='bigstring',
    boolean='boolean',
    string='string',
    number='number',
    binary='binary',
}

export interface IProperties {
    id: number;
    label: string;
    typeValue: TypeValues
    value: any;
}

export interface IItem {
    id: number;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
