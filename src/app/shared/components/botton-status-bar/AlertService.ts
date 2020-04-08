import { Subject } from 'rxjs';

interface IAlert {
    message: any;
    color?: string;
    type: AlertTypes;
    messageLong?: string;
}

export enum AlertTypes {
    warning = "warning",
    success = "success",
    loading = "loading",
    normal = "normal",
    error = "error",
    info = "info",
}

const subject = new Subject<IAlert>();
export const AlertService = {
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable(),
    /**
     * Mostra mensagem em uma snackbar.
     * 
     * Ex: {type: 'success', message: 'Minha msg...'}
    */
    sendMessage: (type: AlertTypes, message: string, messageLong?: string, color?: string) => {

        switch (type) {
            case AlertTypes.success:
                subject.next({ type, message, messageLong: messageLong, color: color || '#4caf50' });
                break;

            case AlertTypes.warning:
                subject.next({ type, message, messageLong: messageLong, color: color || '#ff9800' });
                break;

            case AlertTypes.info:
                subject.next({ type, message, messageLong: messageLong, color: color || '#2196f3' });
                break;

            case AlertTypes.error:
                subject.next({ type, message, messageLong: messageLong, color: color || '#f44336' });
                break;

            case AlertTypes.loading:
                subject.next({ type, message, messageLong: messageLong, color: color });
                break;

            case AlertTypes.normal:
                subject.next({ type, message, messageLong: messageLong, color: color });
                break;

            default:
                subject.next({ type, message, messageLong: messageLong, color: color });
                break;
        }

    },
};
