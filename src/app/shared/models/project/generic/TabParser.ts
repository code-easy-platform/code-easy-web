import { ETabType } from "../../../enuns";
import { TabAction, TabData, TabRoute } from "../tabs";
import { Project } from "./Project";
import { PropertyParser } from "./PropertyParser";
import { Tab } from "./Tab";
import { TreeItemParser } from "./TreeItemParser";

export abstract class TabParser {
    public static jsonToInstance(json: any, parent?: Project): Tab | null {
        switch (json.type) {
            case ETabType.tabRoutes:
                return new TabRoute(parent, {
                    id: json.id,
                    items: TreeItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case ETabType.tabActions:
                return new TabAction(parent, {
                    id: json.id,
                    items: TreeItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });
            case ETabType.tabDatas:
                return new TabData(parent, {
                    id: json.id,
                    items: TreeItemParser.jsonToInstances(json.items),
                    properties: json.properties.map((prop: any) => PropertyParser.jsonToProperty(prop)),
                });

            default: return null;
        }
    }

    public static jsonToInstances(tabs: any[], parent?: Project): Tab[] {
        const result: Tab[] = [];

        tabs.map(tab => this.jsonToInstance(tab, parent)).forEach(tabOrNull => {
            if (tabOrNull) {
                result.push(tabOrNull);
            }
        });

        return result;
    }
}
