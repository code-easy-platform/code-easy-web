import { ITabData, ITreeItemComponent } from "./../../../interfaces";
import { IProperty } from "./../../../components/external";
import { ETabType } from "./../../../enuns";
import { Project, Tab } from "./../generic";

interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabData extends Tab<ETabType.tabDatas> implements ITabData {
    constructor(public parent: Project, props: IConstrutor) {
        super(parent, {
            properties: props.properties || [],
            items: props.items || [],
            type: ETabType.tabDatas,
            id: props.id,
        });
    }
}
