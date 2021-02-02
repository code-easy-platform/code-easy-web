import React from 'react';
import { useObserver } from 'react-observing';

import { EditableContent } from '../editable-content/EditableContent';
import { ModalListStore } from '../../stores';
import './ContextModalList.css';

export const ContextModalList = () => {
    const [modals, setModals] = useObserver(ModalListStore);

    return (
        <>
            {modals.map((modalId, index) => (
                <EditableContent
                    key={modalId}
                    itemId={modalId}
                    removeModal={() => setModals(oldModals => {
                        oldModals.splice(index, 1);
                        return oldModals;
                    })}
                />
            ))}
        </>
    );
};
