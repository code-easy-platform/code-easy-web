import { IObservable } from 'react-observing';

import { IProperty } from "./IFieldProperties";

export interface IItem {
    subname: IObservable<string | undefined>;
    properties: IObservable<IProperty[]>;
    id: IObservable<string | undefined>;
    name: IObservable<string>;
}