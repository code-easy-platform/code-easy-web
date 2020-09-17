import { BasicConfigurations } from "./BasicConfigurations";
import { ITab, ITreeItemComponent } from "../interfaces";
import { EComponentType } from "../../../enuns";

export class Tab extends BasicConfigurations<EComponentType> implements ITab {
    items: ITreeItemComponent[];

    constructor(fields: ITab) {
        super(fields);

        this.items = fields.items;
    }
}
