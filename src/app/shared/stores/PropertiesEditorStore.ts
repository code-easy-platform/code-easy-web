import { IObservable, observe } from "react-observing";

import { IItem } from "../components/external";

export const PropertiesEditorStore: IObservable<IItem | undefined> = observe(undefined);
