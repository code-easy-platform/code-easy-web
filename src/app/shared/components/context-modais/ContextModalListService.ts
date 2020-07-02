import { Subject } from 'rxjs';

interface IContextModalList {
    editingId: string;
    modalTitle: string;
    contextPath: string[];
    allowBackdropClick?: boolean;
    closeWithBackdropClick?: boolean;
}
const subject = new Subject<IContextModalList>();
export const ContextModalListService = {
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable(),
    showModal: (editingId: string, modalTitle: string, contextPath: string[], allowBackdropClick?: boolean, closeWithBackdropClick?: boolean) => {
        subject.next({ editingId, modalTitle, contextPath, allowBackdropClick, closeWithBackdropClick });
    }
}
