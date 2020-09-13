import { IconWarning, IconError } from "code-easy-components";

import { ItemComponentConfigs } from "./ItemComponentConfigs";
import { TreeItemComponent } from "./TreeItemComponent";
import { ITreeItem } from "../components/tree-manager";
import { EComponentType } from "../enuns";
import { ITab } from "../interfaces";

export class Tab implements ITab {
    public configs: ItemComponentConfigs;
    public items: TreeItemComponent[];

    constructor(
        private _fields: ITab
    ) {
        this.items = this._fields.items.map(item => new TreeItemComponent(item));
        this.configs = new ItemComponentConfigs(this._fields.configs);
    }

    public getProblems(): ITreeItem[] {
        let problems: ITreeItem[] = [];

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        }

        if (this.items.length === 0 && this.configs.type === EComponentType.tabRoutes) {
            addProblem(`Add at least one route to your app`, 'error');
        }

        return problems;
    }
}
