import React from 'react';

import { ContextModalListService, IContextOpenedModal } from './ContextModalListService';
import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import { EditableContent } from '../editable-content/EditableContent';
import './ContextModalList.css';


interface ContextModalListState {
    modalList: IContextOpenedModal[]
}
export class ContextModalList extends React.Component {
    private modaisSubscrition: any;

    state: ContextModalListState = {
        modalList: []
    }

    componentDidMount() {
        this.modaisSubscrition = ContextModalListService.getMessage().subscribe(data => {
            if (this.state.modalList.some(modal => modal.editingId === data.editingId)) {

            } else {
                this.state.modalList.push(data);
            }
            this.setState(this.state);
        });
    }

    componentWillUnmount = () => this.modaisSubscrition.unsubscribe();

    removeModal(editingId: string) {
        const indexToRemove = this.state.modalList.findIndex(modal => modal.editingId === editingId);
        if (indexToRemove >= 0) {
            this.state.modalList.splice(indexToRemove, 1);
        }
    }

    render = () => this.state.modalList.map(modal => <EditableContent key={modal.editingId} itemId={modal.editingId} removeModal={() => this.removeModal(modal.editingId)} />)
};
ContextModalList.contextType = CodeEditorContext;