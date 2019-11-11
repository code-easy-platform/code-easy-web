import React, { useState } from 'react';
import { Icon } from '../../icon/icon';
import { ContextMenu } from '../../context-menu/ContextMenu';
import { TreeInterface } from '../TreeInterface';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../../../enuns/ComponentType';
import { ItemToDrag } from '../../../../pages/editor/tabs/editor-tab/components/code-editor/components/item-drag/ItemDrag';

export const Action: React.FC<any> = (props: any) => {
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
        <div onContextMenu={changeContextMenu} onDoubleClick={onDoubleClick} style={{ flex: 1, paddingLeft: paddingLeft !== undefined ? paddingLeft : 0 }} >
            <ContextMenu isVisible={isShowContextMenu} itemType={treeItem.itemType} itemId={treeItem.itemId} />
            {treeItem.nodeExpanded === false && <Icon onClick={onClick} iconName="btn-expand-folder" />}
            {treeItem.nodeExpanded === true && <Icon onClick={onClick} iconName="btn-collapse-folder" />}
            {treeItem.itemLabel}
            {/*<ItemToDrag id={null} componentType={ComponentType.localAction} allowDrag={true} title={treeItem.itemLabel} height={80} width={80} outputPosition={() => { }} />*/}
        </div>
    );
}
