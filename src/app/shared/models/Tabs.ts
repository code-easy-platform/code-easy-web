import { IconWarning, IconError } from "code-easy-components";

import { TreeItemComponent } from "./TreeItemComponent";
import { ITreeItem } from "../components/tree-manager";
import { BasicConfigs } from "./BasicConfigs";
import { EComponentType } from "../enuns";
import { ITab } from "../interfaces";

export class Tab implements ITab {
    public items: TreeItemComponent[];
    public configs: BasicConfigs;

    constructor(
        private _fields: {
            configs: BasicConfigs;
            items: TreeItemComponent[];
        }
    ) {
        this.items = this._fields.items.map(item => new TreeItemComponent(item));
        this.configs = this._fields.configs;
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