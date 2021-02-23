import { IObservable, observe } from "react-observing";

import { TreeItemFolder, TreeItemInputVariable, TreeItemLocalVariable, TreeItemOutpuVariable, TreeItemRouterConsume, TreeItemRouterExpose } from "./../tree-items";
import { ITabRoute, ITreeItemComponent } from "./../../../interfaces";
import { EComponentType, ETabType } from "./../../../enuns";
import { IProperty } from "./../../../components/external";
import { Project, Tab } from "../generic";

interface IConstrutor {
    items?: ITreeItemComponent[];
    properties?: IProperty[];
    id?: string;
}
export class TabRoute extends Tab<ETabType.tabRoutes> implements ITabRoute {
    public items: IObservable<(TreeItemFolder | TreeItemRouterConsume | TreeItemRouterExpose | TreeItemInputVariable | TreeItemLocalVariable | TreeItemOutpuVariable)[]>;

    constructor(public projectParent: Project | undefined, props?: IConstrutor) {
        super(projectParent, {
            properties: props?.properties || [],
            items: props?.items || [],
            type: ETabType.tabRoutes,
            id: props?.id,
        });

        if (props?.items) {
            this.items = this._initializeItems(props.items);
        } else {
            this.items = observe([]);
        }
    }

    private _initializeItems(items: ITreeItemComponent[]) {
        return observe(items.map(item => {
            switch (item.type.value) {
                case EComponentType.grouper:
                    return new TreeItemFolder(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.routeExpose:
                    return new TreeItemRouterExpose(this, {
                        properties: item.properties.value || [],
                        items: item.items.value,
                        id: item.id.value,
                    });
                case EComponentType.routeConsume:
                    return new TreeItemRouterConsume(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.inputVariable:
                    return new TreeItemInputVariable(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.localVariable:
                    return new TreeItemLocalVariable(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                case EComponentType.outputVariable:
                    return new TreeItemOutpuVariable(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
                default:
                    return new TreeItemFolder(this, {
                        properties: item.properties.value || [],
                        id: item.id.value,
                    });
            }
        }));
    }
}
