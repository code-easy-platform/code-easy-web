import { TreeItemExtension, TreeItemFolder, TreeItemGlobalAction, TreeItemInputVariable, TreeItemLocalAction, TreeItemLocalVariable, TreeItemOutpuVariable, TreeItemRouterConsume, TreeItemRouterExpose } from "../tree-items";
import { TreeItemComponent } from "./TreeItemComponent";
import { PropertyParser } from "./PropertyParser";
import { FlowItemParser } from "./FlowItemParser";
import { EComponentType } from "../../../enuns";
import { Tab } from "./Tab";

export abstract class TreeItemParser {
    public static jsonToInstance(json: any, parent?: Tab): TreeItemComponent | null {
        switch (json.type) {
            case EComponentType.extension:
                return new TreeItemExtension(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.grouper:
                return new TreeItemFolder(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.inputVariable:
                return new TreeItemInputVariable(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.outputVariable:
                return new TreeItemOutpuVariable(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.routeConsume:
                return new TreeItemRouterConsume(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.localVariable:
                return new TreeItemLocalVariable(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.globalAction:
                return new TreeItemGlobalAction(parent, {
                    id: json.id,
                    items: FlowItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.localAction:
                return new TreeItemLocalAction(parent, {
                    id: json.id,
                    items: FlowItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EComponentType.routeExpose:
                return new TreeItemRouterExpose(parent, {
                    id: json.id,
                    items: FlowItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });

            default: return null;
        }
    }

    public static jsonToInstances(items: any[], parent?: Tab): TreeItemComponent[] {
        const result: TreeItemComponent[] = [];

        items.map(item => this.jsonToInstance(item, parent)).forEach(itemOrNull => {
            if (itemOrNull) {
                result.push(itemOrNull);
            }
        })

        return result;
    }
}
