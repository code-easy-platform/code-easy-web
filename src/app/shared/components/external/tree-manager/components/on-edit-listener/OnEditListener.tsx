import React, { memo, useContext, useEffect, useState } from 'react';
import { ISubscription } from 'react-observing';

import { ItemsContext } from '../../shared/contexts';

interface OnSelectListenerProps {
    onSelect?: (uids: string[]) => void;
}
export const OnSelectListener: React.FC<OnSelectListenerProps> = memo(({ onSelect }) => {
    const { items } = useContext(ItemsContext);

    const [uids, setUids] = useState<string[]>([]);

    // Get selected items
    useEffect(() => {
        if (!onSelect) return;

        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            if (item.isSelected.value) {
                setUids(oldUids => {
                    if (!oldUids.includes(String(item.id.value))) {
                        return [...oldUids, String(item.id.value)];
                    } else {
                        return oldUids;
                    }
                });
            } else {
                setUids(oldUids => oldUids.filter(uid => uid !== String(item.id.value)));
            }

            subscriptions.push(item.isSelected.subscribe(isSeleced => {
                if (isSeleced) {
                    setUids(oldUids => {
                        if (!oldUids.includes(String(item.id.value))) {
                            return [...oldUids, String(item.id.value)];
                        } else {
                            return oldUids;
                        }
                    });
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
});
