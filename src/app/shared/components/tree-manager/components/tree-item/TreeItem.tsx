import React, { useCallback, useRef, useEffect } from 'react';
import { IconCollapsedFolder, IconExpandedFolder } from 'code-easy-components';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

import { useItems, useConfigs } from '../../shared/hooks';
import { ITreeItem, IDroppableItem } from '../../shared/interfaces';
import { Icon } from '../icon/icon';

interface TreeItemProps extends ITreeItem {
    paddingLeft: number;
    showExpandIcon: boolean;
    disabledToDrop?: string[];
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const TreeItem: React.FC<TreeItemProps> = (props) => {
    const itemRef = useRef(null);
    const radioItemRef = useRef<HTMLInputElement>(null);

    const {
        showExpandIcon, nodeExpanded, description, hasError, hasWarning,
        id, label, isSelected, isDisabled, canDropList, isDisabledClick,
        disabledToDrop = [], onContextMenu, isDisabledDoubleClick, type,
        icon, useCustomIconToExpand, iconSize, isDisabledDrop, isDisabledSelect,
        isAllowedToggleNodeExpand = true, paddingLeft, isDisabledDrag, isEditing,
    } = props;

    const { expandItemById, changeAscById, selectItemById, editItemById } = useItems();
    const { isUseDrag, isUseDrop, id: treeIdentifier, customDragLayer } = useConfigs();

    const handleExpandNode = useCallback((e: React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>) => {
        if (!isAllowedToggleNodeExpand) return;

        e.stopPropagation();
        e.preventDefault();

        expandItemById(id);

    }, [expandItemById, id, isAllowedToggleNodeExpand]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 39 && !nodeExpanded) {
            handleExpandNode(e as any);
        } else if (e.keyCode === 37 && nodeExpanded) {
            handleExpandNode(e as any);
        } else if (e.keyCode === 13) {
            editItemById(id);
        }
    }, [editItemById, handleExpandNode, id, nodeExpanded]);

    const handleOnDrop = useCallback((droppedId: string | undefined) => {
        changeAscById(droppedId, id)
    }, [changeAscById, id]);

    /** Emits an event to identify which element was clicked. */
    const handleOnContext = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onContextMenu && onContextMenu(id, e);
    }, [id, onContextMenu]);

    // Emits an event to identify which element was clicked.
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDisabled || isDisabledClick) return;

        e.stopPropagation();

        selectItemById(id, e.ctrlKey);
    }, [id, isDisabled, isDisabledClick, selectItemById]);

    // Emits an event to identify which element was focused.
    const handleOnItemsFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (isDisabled || isDisabledClick) return;

        e.stopPropagation();

        selectItemById(id, false);
    }, [id, isDisabled, isDisabledClick, selectItemById]);

    // Emits an event to identify which element was clicked.
    const handleOnDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDisabled || isDisabledDoubleClick) return;

        e.stopPropagation();
        e.preventDefault();

        editItemById(id);
    }, [isDisabled, isDisabledDoubleClick, editItemById, id]);

    /** Permite que um elemento seja arrastado e dropado em outro lugar.. */
    const [{ isDragging }, dragRef, preview] = useDrag<IDroppableItem, any, any>({
        item: {
            type,
            itemProps: {
                itemType: type,
                height: 0,
                width: 0,
                id: id,
                label,
                icon,
            }
        },
        canDrag: isUseDrag && !isDisabledDrag,
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });
    dragRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    /** Faz com que o item que está sendo arrastado tenha um preview custumizado */
    useEffect(() => {
        if (customDragLayer) {
            preview(getEmptyImage(), { captureDraggingState: true });
        }
    }, [customDragLayer, preview]);

    /** Usado para que seja possível o drop de itens no editor. */
    const [{ isDraggingOver }, dropRef] = useDrop<IDroppableItem, any, any>({
        accept: canDropList || [],
        drop: item => handleOnDrop(item.itemProps.id),
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        canDrop: ({ itemProps }) => !!isUseDrop && !isDisabledDrop && !disabledToDrop.some(item => item === itemProps.id),
    });
    dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    return (
        <div
            title={description}
            onClick={handleOnClick}
            onContextMenu={handleOnContext}
            onDoubleClick={handleOnDoubleClick}
            className={`tree-item${isDisabled ? ' disabled' : ''}${isEditing ? ' editing' : ''}${isSelected ? ' selected' : ''}${isDragging ? ' dragging' : ''}${(isDraggingOver && isUseDrop && !isDisabledDrop) ? ' dragging-over' : ''}`}
        >
            <input
                id={id}
                type="radio"
                ref={radioItemRef}
                onKeyDown={handleKeyDown}
                onFocus={handleOnItemsFocus}
                disabled={isDisabled || isDisabledSelect}
                name={"tree-item-name-" + treeIdentifier}
            />
            <label
                htmlFor={id}
                ref={itemRef}
                style={{ paddingLeft: (showExpandIcon ? 8 : 28) + paddingLeft }}
                className={`${hasError ? ' error' : ''}${hasWarning ? ' warning' : ''}`}
            >
                <Icon
                    iconSize={12}
                    show={showExpandIcon}
                    onClick={handleExpandNode}
                    icon={nodeExpanded ? IconCollapsedFolder : IconExpandedFolder}
                    iconName={nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"}
                />
                <Icon
                    icon={icon}
                    iconName={label}
                    iconSize={iconSize || 16}
                    show={icon !== undefined}
                    onClick={useCustomIconToExpand ? handleExpandNode : undefined}
                />
                {label}
            </label>
            {(isDragging && customDragLayer) &&
                // Usada para mostrar o preview com titulo do item que está sendo arrastado
                customDragLayer(<>
                    <Icon
                        icon={icon}
                        iconSize={12}
                        iconName={label}
                        show={icon !== undefined}
                    />
                    {label}
                </>)
            }
        </div>
    );
}
