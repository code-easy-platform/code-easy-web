import React, { FC, useRef, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { IconExpandedFolder, IconCollapsedFolder } from 'code-easy-components';

import { TreeInterface } from '../models/TreeInterface';
import { CustomDragLayer } from './CustomDragLayer';
import { Icon } from './icon/icon';


interface ItemTreeProps {
    isUseDrop: boolean;
    isUseDrag: boolean;
    paddingLeft: number;
    itemTree: TreeInterface;
    onDropItem(targetItemId: string | undefined, dropppedItemId: string | undefined, droppedItemProps: any): void;
    onClick(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onExpandNode(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick?(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    style: {
        activeItemBackgroundColor?: string,
        hasErrorItemBackgroundColor?: string,
    }
}
export const TreeItem: FC<ItemTreeProps> = ({ itemTree, paddingLeft, style, onExpandNode, onContextMenu, onDoubleClick, onDropItem, isUseDrag, isUseDrop, onClick }) => {

    const {
        icon,
        iconSize = 20,
        hasError = false,
        isDisabled = false,
        showExpandIcon = true,
        isDisabledDrag = false,
        isDisabledDrop = false,
        useCustomIconToExpand = false,
        isAllowedToggleNodeExpand = true,
    } = itemTree;

    /** Cria a referencia ao item que está sendo arrastado */
    const itemRef = useRef(null);

    // Vai mandar para fora da arvore qual o id do item que foi clicado.
    const onContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onContextMenu && onContextMenu(itemTree.id, e);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 32) {
            !isDisabled && onExpandNode(itemTree.id, e as any);
        } else if (e.keyCode === 13) {
            !isDisabled && onDoubleClick && onDoubleClick(itemTree.id, itemTree, e as any)
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

    /** Faz com que o item que está sendo arrastado tenha um preview custumizado */
    useEffect(() => { preview(getEmptyImage(), { captureDraggingState: true }) }, [preview]);


    /** Usado para que seja possível o drop de itens no editor. */
    const [{ isDraggingOver }, dropRef] = useDrop({
        accept: itemTree?.canDropList || [],
        canDrop: () => isUseDrop && !isDisabledDrop,
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        drop(item: any, monitor: DropTargetMonitor) { onDropItem(itemTree.id, item.itemProps.id, item) },
    });
    dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    return (<>
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
            onDoubleClick={isDisabled ? undefined : (e => { onDoubleClick && onDoubleClick(itemTree.id, itemTree, e) })}
            className={`tree-item${(!isDisabled) ? '' : ' disabled'}${isDisabled ? '' : (itemTree.isEditing ? ' editing' : '')}${isDisabled ? '' : (itemTree.isSelected ? ' selected' : '')}`}
        >
            <div
                key={itemTree.id}
                style={{ padding: icon !== undefined ? undefined : 5, paddingLeft: `${paddingLeft + (itemTree.childs.length === 0 ? 25 : 0)}px`, color: hasError ? style.hasErrorItemBackgroundColor : '' }}
                className={`item${isDragging ? ' dragging' : ''}${(isDraggingOver && isUseDrop && !isDisabledDrop) ? ' dragging-over' : ''}`}
            >
                <Icon
                    iconSize={15}
                    show={(itemTree.childs.length > 0) && showExpandIcon}
                    icon={itemTree.nodeExpanded ? IconCollapsedFolder : IconExpandedFolder}
                    iconName={itemTree.nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"}
                    onClick={isAllowedToggleNodeExpand ? ((e: any) => onExpandNode(itemTree.id, e)) : undefined}
                />
                <Icon
                    icon={icon}
                    iconSize={iconSize+5}
                    show={icon !== undefined}
                    iconName={itemTree.label}
                    onClick={(useCustomIconToExpand && isAllowedToggleNodeExpand) ? ((e: any) => onExpandNode(itemTree.id, e)) : undefined}
                />
                {itemTree.label}
            </div>
        </div>
        {isDragging &&
            // Usada para mostrar o preview com titulo do item que está sendo arrastado
            <CustomDragLayer>
                <Icon
                    icon={icon}
                    iconSize={iconSize}
                    show={icon !== undefined}
                    iconName={itemTree.label}
                    onClick={(useCustomIconToExpand && isAllowedToggleNodeExpand) ? ((e: any) => onExpandNode(itemTree.id, e)) : undefined}
                />
                {itemTree.label}
            </CustomDragLayer>
        }
    </>);
}
