import { ITabAction, ITreeItemComponent } from "./../../../interfaces";
import { IProperty } from "./../../../components/external";
import { ETabType } from "./../../../enuns";
import { Project, Tab } from "./../generic";


interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabAction extends Tab<ETabType.tabActions> implements ITabAction {
    constructor(public parent: Project, props: IConstrutor) {
        super(parent, {
            properties: props.properties || [],
            type: ETabType.tabActions,
            items: props.items || [],
            id: props.id,
        });
    }
}
