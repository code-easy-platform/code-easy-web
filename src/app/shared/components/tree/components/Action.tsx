import React, { useState } from 'react';
import { Icon } from '../../icon/icon';
import { ContextMenu } from '../../context-menu/ContextMenu';
import { TreeInterface } from '../TreeInterface';

export const Action = (props: any) => {
    const treeItem: TreeInterface = props.treeItem;
    const onClick = props.onClick;
    const onDoubleClick = props.onDoubleClick;
    const paddingLeft = props.paddingLeft;

    const [isShowContextMenu, setIsShowContextMenu] = useState(false);

    const changeContextMenu = (e: any) => {
        e.preventDefault();

        window.onclick = () => setIsShowContextMenu(false);
        setIsShowContextMenu(true);
    }

    return (
        <div onContextMenu={changeContextMenu} style={{ flex: 1, paddingLeft: paddingLeft !== undefined ? paddingLeft : 0 }} >
            <ContextMenu isVisible={isShowContextMenu} itemType={treeItem.itemType} itemId={treeItem.itemId} />
            {treeItem.nodeExpanded === false && <Icon onClick={onClick} onDoubleClick={onDoubleClick} iconName="btn-expand-folder" />}
            {treeItem.nodeExpanded === true && <Icon onClick={onClick} onDoubleClick={onDoubleClick} iconName="btn-collapse-folder" />}
            {treeItem.itemLabel}
        </div>
    );
}
