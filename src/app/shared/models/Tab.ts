import { BasicConfigurations } from "./BasicConfigurations";
import { TreeItemComponent } from "./TreeItemComponent";
import { ITreeItem } from "../components/external";
import { EComponentType } from "./../enuns";
import { ITab } from "./../interfaces";


type OmitInConstructor = 'name' | 'problems';

export class Tab extends BasicConfigurations<EComponentType> implements ITab {
    public items: TreeItemComponent[];

    public get problems(): ITreeItem[] {
        let problems = super.problems;

        this.items.forEach(itemTree => {
            problems = [
                ...problems,
                ...itemTree.problems,
            ];
        });

        return problems;
    }

    constructor(fields: Omit<ITab, OmitInConstructor>) {
        super(fields);

        this.items = fields.items.map(item => new TreeItemComponent(item));
    }
}
