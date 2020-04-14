
export enum TypeValues {
    expression='expression',
    bigstring='bigstring',
    boolean='boolean',
    string='string',
    number='number',
    binary='binary',
    assign='assign',
}

export interface IProperties {
    id: string | undefined;
    type: TypeValues
    name: string;
    value: any;
}

export interface IItem {
    id: string | undefined;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
