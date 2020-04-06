import { Subject } from 'rxjs';

import { IItemListContext } from './ContextMenu';

interface IContextMenu {
    actions: IItemListContext[];
    isShow: boolean;
    left: number;
    top: number;
}

const subject = new Subject<IContextMenu>();
export const ContextMenuService = {
    clearMessages: () => subject.next({ top: 0, left: 0, isShow: false, actions: [] }),
    getMessage: () => subject.asObservable(),
    sendMessage: (isShow: boolean, left: number, top: number, actions: IItemListContext[]) => {
        subject.next({ isShow, left, top, actions });
    }
}
