import { Subject } from 'rxjs';

import { IItemListContext } from './ContextMenu';

interface IContextMenu {
    actions: IItemListContext[];
    left: number;
    top: number;
}

const subject = new Subject<IContextMenu>();
export const ContextMenuService = {
    clearMessages: () => subject.next({ top: 0, left: 0, actions: [] }),
    getMessage: () => subject.asObservable(),
    showMenu: (left: number, top: number, actions: IItemListContext[]) => {
        subject.next({ left, top, actions });
    }
}
