import { FlowItemAction, FlowItemAssign, FlowItemComment, FlowItemEnd, FlowItemForeach, FlowItemIf, FlowItemStart, FlowItemSwitch } from "../flow-items";
import { EItemType } from "../../../components/external";
import { FlowItemComponent } from "./FlowItemComponent";
import { TreeItemComponent } from "./TreeItemComponent";
import { ConnectionParser } from "./ConnectionParser";
import { PropertyParser } from "./PropertyParser";

export abstract class FlowItemParser {
    public static jsonToInstance(json: any, parent?: TreeItemComponent): FlowItemComponent | null {
        switch (json.type) {
            case EItemType.END:
                return new FlowItemEnd(parent, {
                    id: json.id,
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.ACTION:
                return new FlowItemAction(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.ASSIGN:
                return new FlowItemAssign(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.COMMENT:
                return new FlowItemComment(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.FOREACH:
                return new FlowItemForeach(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.IF:
                return new FlowItemIf(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.START:
                return new FlowItemStart(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case EItemType.SWITCH:
                return new FlowItemSwitch(parent, {
                    id: json.id,
                    connections: ConnectionParser.jsonToInstances(json.connections),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });

            default: return null;
        }
    }

    public static jsonToInstances(items: any[], parent?: TreeItemComponent): FlowItemComponent[] {
        const result: FlowItemComponent[] = [];

        items.map(tab => this.jsonToInstance(tab, parent)).forEach(tabOrNull => {
            if (tabOrNull) {
                result.push(tabOrNull);
            }
        })

        return result;
    }
}
