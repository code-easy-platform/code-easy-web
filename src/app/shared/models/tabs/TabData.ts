import { ITabData, ITreeItemComponent } from "../../interfaces";
import { IProperty } from "../../components/external";
import { ETabType } from "../../enuns";
import { Tab } from "../generic";

interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabData extends Tab<ETabType.tabDatas> implements ITabData {
    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            items: props.items || [],
            type: ETabType.tabDatas,
            id: props.id,
        });
    }
}
