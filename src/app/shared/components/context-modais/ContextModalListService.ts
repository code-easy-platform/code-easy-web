import { Subject } from 'rxjs';

export interface IContextOpenedModal {
    editingId: string;
}
const subject = new Subject<IContextOpenedModal>();
export const ContextModalListService = {
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable(),
    showModal: (modal: IContextOpenedModal) => {
        subject.next({ editingId: modal.editingId });
    }
}
