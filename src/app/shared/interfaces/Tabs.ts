import { ItemComponent, ComponentConfigs } from "./ItemComponent";

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
}