import { ITabRoute, ITreeItemComponent } from "../interfaces";
import { IProperty } from "../components/external";
import { ETabType } from "../enuns";
import { Tab } from "./generic";

interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabRoute extends Tab<ETabType.tabRoutes> implements ITabRoute {
    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            items: props.items || [],
            type: ETabType.tabRoutes,
            id: props.id,
        });
    }
}
