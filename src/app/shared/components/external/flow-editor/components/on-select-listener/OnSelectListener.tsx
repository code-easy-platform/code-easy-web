import React, { useEffect, useState } from 'react';
import { ISubscription, useObserverValue } from 'react-observing';

import { useItems } from '../../shared/hooks';

interface OnSelectListenerProps {
    onSelect?: (uids: string[]) => void;
}
export const OnSelectListener: React.FC<OnSelectListenerProps> = ({ onSelect }) => {
    const ItemsStore = useItems();
    const items = useObserverValue(ItemsStore);

    const [uids, setUids] = useState<string[]>([]);

    // Get selected items
    useEffect(() => {
        if (!onSelect) return;

        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            if (item.isSelected.value) {
                setUids(oldUids => [...oldUids, String(item.id.value)]);
            } else {
                setUids(oldUids => oldUids.filter(uid => uid !== String(item.id.value)));
            }

            subscriptions.push(item.isSelected.subscribe(isSeleced => {
                if (isSeleced) {
                    setUids(oldUids => [...oldUids, String(item.id.value)]);
                } else {
                    setUids(oldUids => oldUids.filter(uid => uid !== String(item.id.value)));
                }
            }));
        });

        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [items, onSelect]);

    // Emit selected items
    useEffect(() => {
        onSelect && onSelect(uids);
    }, [uids, onSelect]);

    return null;
}
