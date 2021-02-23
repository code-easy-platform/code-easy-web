import { observe } from "react-observing";

import { IConnection } from "../../../components/external";

export abstract class ConnectionParser {
    public static jsonToInstance(json: any): IConnection {
        return {
            id: observe(json.id),
            originId: observe(json.originId),
            targetId: observe(json.targetId),
            isSelected: observe(json.isSelected),
            connectionLabel: observe(json.connectionLabel),
            connectionDescription: observe(json.connectionDescription),
        };
    }

    public static jsonToInstances(items: any[]): IConnection[] {
        return items.map(tab => this.jsonToInstance(tab));
    }
}
