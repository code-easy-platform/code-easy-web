import { Subject } from 'rxjs';

import { IContextItemList } from './ContextMenu';

interface IContextMenu {
    actions: IContextItemList[];
    left: number;
    top: number;
}

const subject = new Subject<IContextMenu>();
export const ContextMenuService = {
    clearMessages: () => subject.next({ top: 0, left: 0, actions: [] }),
    getMessage: () => subject.asObservable(),
    showMenu: (left: number, top: number, actions: IContextItemList[], icon?: any) => {
        subject.next({ left, top, actions });
    }
}
