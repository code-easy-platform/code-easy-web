import { BasicConfigurations } from "./BasicConfigurations";
import { TreeItemComponent } from "./TreeItemComponent";
import { EComponentType } from "../../../enuns";
import { ITab } from "../interfaces";


type OmitInConstructor = 'name' | 'problems';

export class Tab extends BasicConfigurations<EComponentType> implements ITab {
    public items: TreeItemComponent[];

    constructor(fields: Omit<ITab, OmitInConstructor>) {
        super(fields);

        this.items = fields.items.map(item => new TreeItemComponent(item));
    }
}
