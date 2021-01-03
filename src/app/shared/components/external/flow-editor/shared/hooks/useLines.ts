import { useEffect, useState } from "react";
import { ISubscription, useObserverValue } from "react-observing";

import { IConnection } from "../interfaces";
import { FlowItemsState } from "../stores";

export const useLines = () => {
    const items = useObserverValue(FlowItemsState);

    const [lines, setLines] = useState<IConnection[]>([]);
    useEffect(() => {
        const conns: IConnection[] = [];
        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            item.connections.value.forEach(connection => {
                conns.push(connection);
            });

            subscriptions.push(item.connections.subscribe(() => {
                setLines(oldLines => {
                    oldLines = [];

                    items.forEach(_item => {
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
    }, [items]);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
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
    }, [items]);

    return lines.map(line => ({
        id: line.id.value,
        originId: line.originId,
        targetId: line.targetId,
    }));
}
