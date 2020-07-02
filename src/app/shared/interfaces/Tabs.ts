import { ItemComponent, ComponentConfigs } from "./ItemTreeComponent";
import { TreeInterface } from "../components/tree-manager/shared/models";
import { IconWarning, IconError } from "code-easy-components";
import { ComponentType } from "../enuns/ComponentType";

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

    public getProblems(): TreeInterface[] {
        let problems: TreeInterface[] = [];

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                childs: [],
                label,
            });
        }

        if (this.items.length === 0 && this.configs.type === ComponentType.tabRoutes) {
            addProblem(`Add at least one route to your app`, 'error');
        }

        return problems;
    }

}