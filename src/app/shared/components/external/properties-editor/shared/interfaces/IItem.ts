import { IObservable } from 'react-observing';

import { IProperty } from "./";

export interface IItem {
    subname: IObservable<string | undefined>;
    id: IObservable<string | undefined>;
    name: IObservable<string>;
    properties: IProperty[];
}