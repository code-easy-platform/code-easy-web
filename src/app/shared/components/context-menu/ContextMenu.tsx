import React, { useState } from 'react';

import './ContextMenu.scss';

interface ItemListContext {
    label: string;
    action(): any;
}
interface ContextMenuProps {
    title?: string;
}
export const ContextMenu: React.FC<ContextMenuProps> = ({ title }) => {
    const [state, setState] = useState({
        isShow: false,
        action: []
    });

    const actions: ItemListContext[] = [
        {
            label: 'Deletar',
            action: () => { },
        }
    ];

    return (<>
        {state.isShow && <div className="context-menu">
            {title && <div className="context-menu-title">{title}</div>}
            {actions.map((action) => (
                <div key={action.label} className="context-menu-list-item" onClick={action.action}>{action.label}</div>
            ))}
        </div>}
    </>);

}
