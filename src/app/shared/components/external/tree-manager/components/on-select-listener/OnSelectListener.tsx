import React, { useContext, useEffect, useState } from 'react';
import { ISubscription } from 'react-observing';

import { ItemsContext } from '../../shared/contexts';

interface OnEditListenerProps {
    onEdit?: (uid: string | undefined) => void;
}
export const OnEditListener: React.FC<OnEditListenerProps> = ({ onEdit }) => {
    const { items } = useContext(ItemsContext);

    const [uid, setUid] = useState<string>();

    // Get selected items
    useEffect(() => {
        if (!onEdit) return;

        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            if (item.isEditing.value) {
                setUid(item.id.value);
            } else {
                setUid(oldUid => oldUid === String(item.id.value) ? undefined : oldUid);
            }

            subscriptions.push(item.isEditing.subscribe(isEditing => {
                if (isEditing) {
                    setUid(item.id.value);
                } else {
                    setUid(oldUid => oldUid === String(item.id.value) ? undefined : oldUid);
                }
            }));
        });

        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [items, onEdit]);

    // Emit selected items
    useEffect(() => {
        onEdit && onEdit(uid);
    }, [uid, onEdit]);

    return null;
}
