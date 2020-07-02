import React from 'react';

import { ContextModalListService } from './ContextModalListService';
import { Modal } from '../modal/Modal';
import './ContextModalList.css';

export interface IContextOpenedModal {
    editingId: string;
    modalTitle: string;
    contextPath: string[];
    allowBackdropClick?: boolean;
    closeWithBackdropClick?: boolean;
}
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

    render = () => (<>
        {this.state.modalList.map(modal => {
            return (
                <Modal
                    isOpen={true}
                    maxWidth={820}
                    maxHeight={620}
                    key={modal.editingId}
                    title={modal.modalTitle}
                    allowBackdropClick={modal.allowBackdropClick}
                    onSave={e => this.removeModal(modal.editingId)}
                    onCancel={e => this.removeModal(modal.editingId)}
                    closeWithBackdropClick={modal.closeWithBackdropClick}
                    onClose={value => { this.removeModal(modal.editingId); return value; }}
                />
            );
        })}
    </>);
}
