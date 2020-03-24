

export interface IProperties<> {
    id: number;
    label: string;
    value: any;
}

export interface IItem {
    id: number;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
