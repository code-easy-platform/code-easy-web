import { ITabAction, ITreeItemComponent } from "../../interfaces";
import { IProperty } from "../../components/external";
import { ETabType } from "../../enuns";
import { Tab } from "../generic";


interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabAction extends Tab<ETabType.tabActions> implements ITabAction {
    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            type: ETabType.tabActions,
            items: props.items || [],
            id: props.id,
        });
    }
}
