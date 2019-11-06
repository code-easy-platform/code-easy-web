import React, { useState } from 'react';
import { Icon } from '../../icon/icon';
import { ContextMenu } from '../../context-menu/ContextMenu';
import { TreeInterface } from '../TreeInterface';

export const Action = (props: any) => {
    const treeItem: TreeInterface = props.treeItem;
    const actionOnClick = props.onClick;
    const actionOnDoubleClick = props.onDoubleClick;

    const [isShowContextMenu, setIsShowContextMenu] = useState(false);

    const changeContextMenu = (e: any) => {
        e.preventDefault();

        window.onclick = () => setIsShowContextMenu(false);
        setIsShowContextMenu(true);
    }

    return (
        <div onContextMenu={changeContextMenu} style={{ flex: 1 }} >
            <ContextMenu isVisible={isShowContextMenu} itemType={treeItem.itemType} itemId={treeItem.itemId} />
            {treeItem.nodeExpanded === false && <Icon onClick={actionOnClick} onDoubleClick={actionOnDoubleClick} iconName="btn-expand-folder" />}
            {treeItem.nodeExpanded === true && <Icon onClick={actionOnClick} onDoubleClick={actionOnDoubleClick} iconName="btn-collapse-folder" />}
            {treeItem.itemLabel}
        </div>
    );
}
