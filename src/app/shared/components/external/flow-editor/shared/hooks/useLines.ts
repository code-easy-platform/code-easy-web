import { useEffect, useState } from "react";
import { ISubscription } from "react-observing";

import { IConnection } from "../interfaces";
import { useItems } from "../hooks";

export const useLines = () => {
    const itemsStore = useItems();

    const [lines, setLines] = useState<IConnection[]>([]);
    useEffect(() => {
        const subscriptions: ISubscription[] = [];
        const conns: IConnection[] = [];

        itemsStore.value.forEach(item => {
            item.connections.value.forEach(connection => {
                conns.push(connection);
            });

            subscriptions.push(item.connections.subscribe(() => {
                setLines(oldLines => {
                    oldLines = [];

                    itemsStore.value.forEach(_item => {
                        _item.connections.value.forEach(connection => {
                            oldLines.push(connection);
                        });
                    });

                    return oldLines;
                });
            }));
        });

        setLines(conns);

        return () => subscriptions.forEach(subs => subs?.unsubscribe())
    }, [itemsStore.value]);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        itemsStore.value.forEach(item => {
            subscriptions.push(
                item.connections.subscribe(connections => {
                    connections.forEach(connection => {
                        setLines(oldLines => {
                            if (oldLines.some(line => line.id.value === connection.id.value)) {
                                return [
                                    ...oldLines.map(line => {
                                        if (line.id.value === connection.id.value) {
                                            return connection;
                                        } else {
                                            return line;
                                        }
                                    })
                                ];
                            } else {
                                return [
                                    ...oldLines,
                                    connection
                                ];
                            }
                        });
                    });
                })
            );
        });

        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [itemsStore.value]);

    return lines.map(line => ({
        id: line.id.value,
        originId: line.originId,
        targetId: line.targetId,
    }));
}
