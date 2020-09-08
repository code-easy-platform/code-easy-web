import { IconWarning, IconError } from "code-easy-components";

import { ItemComponent, ComponentConfigs } from "./ItemTreeComponent";
import { ITreeItem } from "../components/tree-manager";
import { ComponentType } from "../enuns";

export class Tab {
    public configs: ComponentConfigs;
    public items: ItemComponent[];

    constructor(
        private _fields: {
            configs: ComponentConfigs;
            items: ItemComponent[];
        }
    ) {
        this.configs = this._fields.configs;
        this.items = this._fields.items.map(item => new ItemComponent(item));
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

        if (this.items.length === 0 && this.configs.type === ComponentType.tabRoutes) {
            addProblem(`Add at least one route to your app`, 'error');
        }

        return problems;
    }

}