import React, { FC, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DragPreviewImage } from 'react-dnd';

import img_tree_item_preview from './TreeItemPreview.svg';
import { TreeInterface } from '../models/TreeInterface';
import { Icon } from './icon/icon';

import icon_collepsed from './../../shared/icons/icon-collapsed.png';
import icon_expanded from './../../shared/icons/icon-expanded.png';


interface ItemTreeProps {
    isUseDrop: boolean;
    isUseDrag: boolean;
    paddingLeft: number;
    itemTree: TreeInterface;
    onDropItem(targetItemId: string | undefined, dropppedItemId: string | undefined, droppedItemProps: any): void;
    onClick(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onExpandNode(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const TreeItem: FC<ItemTreeProps> = ({ itemTree, paddingLeft, onExpandNode, onContextMenu, onDoubleClick, onDropItem, isUseDrag, isUseDrop, onClick }) => {

    let { hasError, isAllowedToggleNodeExpand, isDisabledDrag, isDisabled, isDisabledDrop, icon } = itemTree;

    hasError = hasError !== undefined ? hasError : false;
    isDisabledDrag = isDisabledDrag !== undefined ? isDisabledDrag : false;
    isDisabledDrop = isDisabledDrop !== undefined ? isDisabledDrop : false;
    isDisabled = isDisabled !== undefined ? isDisabled : false;
    isAllowedToggleNodeExpand = isAllowedToggleNodeExpand !== undefined ? isAllowedToggleNodeExpand : true;

    /** Cria a referencia ao item que está sendo arrastado */
    const itemRef = useRef(null);


    // Vai mandar para fora da arvore qual o id do item que foi clicado.
    const onContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onContextMenu(itemTree.id, e);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 32) {
            !isDisabled && onExpandNode(itemTree.id, e as any);
        } else if (e.keyCode === 13) {
            !isDisabled && onDoubleClick(itemTree.id, itemTree, e as any)
        }
    }

    /** Permite que um elemento seja arrastado e dropado em outro lugar.. */
    const [{ isDragging }, dragRef, preview] = useDrag({
        item: {
            type: itemTree.type,
            itemProps: {
                itemType: itemTree.type,
                title: itemTree.label,
                itemTree: itemTree,
                id: itemTree.id,
                sucessor: [0],
            }
        },
        canDrag: isUseDrag && !isDisabledDrag,
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });
    dragRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    /** Usado para que seja possível o drop de itens no editor. */
    const [{ isDraggingOver }, dropRef] = useDrop({
        accept: itemTree?.canDropList || [],
        canDrop: () => isUseDrop && !isDisabledDrop,
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        drop(item: any, monitor: DropTargetMonitor) { onDropItem(itemTree.id, item.itemProps.id, item) },
    });
    dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    return (
        <div
            tabIndex={0}
            ref={itemRef}
            key={itemTree.id}
            onKeyDown={onKeyDown}
            onContextMenu={onContext}
            id={"tree_" + itemTree.id}
            title={itemTree.description}
            onFocus={isDisabled ? undefined : ((e: any) => onClick(itemTree.id, e))}
            onClick={isDisabled ? undefined : ((e: any) => onClick(itemTree.id, e))}
            onDoubleClick={isDisabled ? undefined : (e => { onDoubleClick(itemTree.id, itemTree, e) })}
            className={`tree-item outline-none${(!isDisabled) ? '' : ' disabled'}${isDisabled ? '' : (itemTree.isEditing ? ' editing' : '')}${isDisabled ? '' : (itemTree.isSelected ? ' selected' : '')}`}
        >
            <DragPreviewImage connect={preview} src={img_tree_item_preview} />
            <div
                key={itemTree.id}
                style={{ padding: icon !== undefined ? undefined : 5, paddingLeft: `${paddingLeft + (itemTree.childs.length === 0 ? 25 : 0)}px`, color: hasError ? 'var(--main-error-color)' : '' }}
                className={`flex-itens-center item${isDragging ? ' dragging' : ''}${(isDraggingOver && isUseDrop && !isDisabledDrop) ? ' dragging-over' : ''}`}
            >
                <Icon
                    iconSize={15}
                    show={itemTree.childs.length > 0}
                    icon={itemTree.nodeExpanded ? icon_expanded : icon_collepsed}
                    iconName={itemTree.nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"}
                    onClick={isAllowedToggleNodeExpand ? ((e: any) => onExpandNode(itemTree.id, e)) : undefined}
                />
                <Icon show={icon !== undefined} icon={icon} iconName="Aux icon" />
                {itemTree.label}
            </div>
        </div>
    );
}
