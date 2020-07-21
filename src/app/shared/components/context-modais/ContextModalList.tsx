import React, { useState, useEffect } from 'react';

import { ContextModalListService, IContextOpenedModal } from './ContextModalListService';
import { EditableContent } from '../editable-content/EditableContent';
import './ContextModalList.css';


interface ContextModalListState {
    modalList: IContextOpenedModal[]
}
export const ContextModalList = () => {
    // let modaisSubscrition: any;

    const [state, setState] = useState<ContextModalListState>({
        modalList: []
    });

    useEffect(() => {
        /* modaisSubscrition =  */ContextModalListService.getMessage().subscribe(data => {
        if (state.modalList.some(modal => modal.editingId === data.editingId)) {

        } else {
            state.modalList.push(data);
        }
        setState(state);
    });
    }, [state]);

    // componentWillUnmount = () => this.modaisSubscrition.unsubscribe();

    const removeModal = (editingId: string) => {
        const indexToRemove = state.modalList.findIndex(modal => modal.editingId === editingId);
        if (indexToRemove >= 0) {
            state.modalList.splice(indexToRemove, 1);
        }
    }

    return (<>
        {state.modalList.map(modal => <EditableContent key={modal.editingId} itemId={modal.editingId} removeModal={() => removeModal(modal.editingId)} />)}
    </>)
};