import { IProperty } from "./";

export interface IItem {
    id: string | undefined;
    name: string;
    subname?: string;
    properties: IProperty[];
}