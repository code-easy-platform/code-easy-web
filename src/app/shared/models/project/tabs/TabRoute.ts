import { IObservable, observe } from "react-observing";

import { ITabRoute, ITreeItemFolder, ITreeItemInputVariable, ITreeItemLocalVariable, ITreeItemOutpuVariable, ITreeItemRouterConsume, ITreeItemRouterExpose } from "./../../../interfaces";
import { TreeItemFolder, TreeItemInputVariable, TreeItemLocalVariable, TreeItemOutpuVariable, TreeItemRouterConsume, TreeItemRouterExpose } from "./../tree-items";
import { EComponentType, ETabType } from "./../../../enuns";
import { IProperty } from "./../../../components/external";
import { Tab } from "../generic";

interface IConstrutor {
    items?: (ITreeItemFolder | ITreeItemRouterConsume | ITreeItemRouterExpose | ITreeItemInputVariable | ITreeItemLocalVariable | ITreeItemOutpuVariable)[];
    properties?: IProperty[];
    id?: string;
}
export class TabRoute extends Tab<ETabType.tabRoutes> implements ITabRoute {
    public items: IObservable<(TreeItemFolder | TreeItemRouterConsume | TreeItemRouterExpose | TreeItemInputVariable | TreeItemLocalVariable | TreeItemOutpuVariable)[]>;

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            items: props.items || [],
            type: ETabType.tabRoutes,
            id: props.id,
        });

        if (props.items) {
            this.items = this._initializeItems(props.items);
        } else {
            this.items = observe([]);
        }
    }

    private _initializeItems(items: (ITreeItemFolder | ITreeItemRouterConsume | ITreeItemRouterExpose | ITreeItemInputVariable | ITreeItemLocalVariable | ITreeItemOutpuVariable)[]) {
        return observe(items.map(item => {
            switch (item.type.value) {
                case EComponentType.grouper:
                    return new TreeItemFolder({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.routeExpose:
                    return new TreeItemRouterExpose({
                        properties: item.properties.value || [],
                        items: item.items.value,
                        id: item.id.value,
                    });
                case EComponentType.routeConsume:
                    return new TreeItemRouterConsume({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.inputVariable:
                    return new TreeItemInputVariable({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.localVariable:
                    return new TreeItemLocalVariable({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.outputVariable:
                    return new TreeItemOutpuVariable({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                default:
                    return new TreeItemFolder({
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
            }
        }));
    }
}
