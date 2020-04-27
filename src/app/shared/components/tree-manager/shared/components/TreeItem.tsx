import React, { FC, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DragPreviewImage } from 'react-dnd';

import { TreeItensTypes } from '../models/TreeItensTypes';
import { TreeInterface } from '../models/TreeInterface';
import img_tree_item_preview from './TreeItemPreview.svg';
import { Icon } from './icon/icon';

interface ItemTreeProps {
    isUseDrop: boolean;
    isUseDrag: boolean;
    paddingLeft: number;
    itemTree: TreeInterface;
    onDropItem(targetItemId: string | undefined, dropppedItemId: string | undefined, droppedItemProps: any): void;
    onSelect(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const TreeItem: FC<ItemTreeProps> = ({ itemTree, paddingLeft, onSelect, onContextMenu, onDoubleClick, onDropItem, isUseDrag, isUseDrop }) => {

    let { hasError, isAllowedToggleNodeExpand, isDisabledDrag, isDisabledSelect, isDisabledDrop } = itemTree;

    hasError = hasError !== undefined ? hasError : false;
    isDisabledDrag = isDisabledDrag !== undefined ? isDisabledDrag : false;
    isDisabledDrop = isDisabledDrop !== undefined ? isDisabledDrop : false;
    isDisabledSelect = isDisabledSelect !== undefined ? isDisabledSelect : false;
    isAllowedToggleNodeExpand = isAllowedToggleNodeExpand !== undefined ? isAllowedToggleNodeExpand : true;

    // Vai mandar para fora da arvore qual o id do item que foi clicado.
    const onContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onContextMenu(itemTree.id, e);
    }

    /** Cria a referencia ao item que está sendo arrastado */
    const itemRef = useRef(null);

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
        canDrop: () => isUseDrop && !isDisabledDrop,
        accept: [TreeItensTypes.file, TreeItensTypes.folder],
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        drop(item: any, monitor: DropTargetMonitor) { onDropItem(itemTree.id, item.itemProps.id, item) },
    });
    dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    return (
        <div
            ref={itemRef}
            key={itemTree.id}
            id={"tree_" + itemTree.id}
            title={itemTree.description}
            onContextMenu={isDisabledSelect ? undefined : onContext}
            className={`tree-item${(!isDisabledSelect) ? '' : ' disabled'}${isDisabledSelect ? '' : (itemTree.isSelected ? ' selected' : '')}`}
            onClick={isDisabledSelect ? undefined : ((e: any) => onSelect(itemTree.id, e))}
            onDoubleClick={isDisabledSelect ? undefined : (e => { onDoubleClick(itemTree.id, itemTree, e) })}
        >
            <DragPreviewImage connect={preview} src={img_tree_item_preview} />
            <div
                key={itemTree.id}
                className={`item${isDragging ? ' dragging' : ''}${(isDraggingOver && isUseDrop && !isDisabledDrop) ? ' dragging-over' : ''}`}
                style={{ paddingLeft: `${paddingLeft}px`, color: hasError ? 'var(--main-error-color)' : '' }}
            >
                {(itemTree.type === TreeItensTypes.folder || itemTree.childs.length > 0) &&
                    <Icon onClick={isAllowedToggleNodeExpand ? ((e: any) => onSelect(itemTree.id, e)) : undefined} iconName={itemTree.nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"} />
                }
                {(itemTree.type === TreeItensTypes.file && itemTree.childs.length === 0) &&
                    <Icon />
                }
                {itemTree.label}
            </div>
        </div>
    );
}
