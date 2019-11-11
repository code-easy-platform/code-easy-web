import React, { useState } from 'react';
import { Icon } from '../../icon/icon';
import { TreeInterface } from '../TreeInterface';
import { ContextMenu } from '../../context-menu/ContextMenu';
import { useDrag } from 'react-dnd';
import ComponentType from '../../../enuns/ComponentType';

export const Folder: React.FC<any> = (props: any) => {
    const treeItem: TreeInterface = props.treeItem;
    const onClick = props.onClick;
    const onDoubleClick = props.onDoubleClick;
    const paddingLeft = props.paddingLeft;

    const id = null;
    const title = "Pasta";
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ComponentType.pasta, itemDetail: { id, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    const [isShowContextMenu, setIsShowContextMenu] = useState(false);
    const changeContextMenu = (e: any) => {
        e.preventDefault();

        window.onclick = () => setIsShowContextMenu(false);
        setIsShowContextMenu(true);
    }

    return (
        <div ref={dragRef} onContextMenu={changeContextMenu} style={{ flex: 1, paddingLeft: paddingLeft !== undefined ? paddingLeft : 0 }}>
            <ContextMenu isVisible={isShowContextMenu} itemType={treeItem.itemType} itemId={treeItem.itemId} />
            {treeItem.nodeExpanded === false && <Icon onClick={onClick} iconName="btn-expand-folder" />}
            {treeItem.nodeExpanded === true && <Icon onClick={onClick} iconName="btn-collapse-folder" />}
            {treeItem.itemLabel}
        </div>
    );
}
