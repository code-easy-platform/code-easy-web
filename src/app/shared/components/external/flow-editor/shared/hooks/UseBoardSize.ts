import { useEffect, useState } from 'react';
import { ISubscription, useObserverValue } from 'react-observing';

import { useItems } from './useFlowItems';

export const useBoardSize = () => {
    const [coords, setCoords] = useState({ width: 0, height: 0 });
    const itemsStore = useItems();
    const items = useObserverValue(itemsStore);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach((item, _, arrayItems) => {

            setCoords(_coords => {
                if (!arrayItems.some(arrayItem => arrayItem.top.value > item.top.value)) {
                    return { ..._coords, height: item.top.value + 300 };
                } else {
                    return _coords;
                }
            });

            setCoords(_coords => {
                if (!arrayItems.some(arrayItem => arrayItem.left.value > item.left.value)) {
                    return { ..._coords, width: item.left.value + 300 };
                } else {
                    return _coords;
                }
            });

            subscriptions.push(
                item.top.subscribe(top => {
                    setCoords(_coords => {
                        if (!arrayItems.some(arrayItem => arrayItem.top.value > top)) {
                            return { ..._coords, height: top + 300 };
                        } else {
                            return _coords;
                        }
                    });
                })
            );

            subscriptions.push(
                item.left.subscribe(left => {
                    setCoords(_coords => {
                        if (!arrayItems.some(arrayItem => arrayItem.left.value > left)) {
                            return { ..._coords, width: left + 300 };
                        } else {
                            return _coords;
                        }
                    });
                })
            );
        });

        return () => subscriptions.forEach(subscrition => subscrition.unsubscribe());
    }, [items]);

    return coords;
};
