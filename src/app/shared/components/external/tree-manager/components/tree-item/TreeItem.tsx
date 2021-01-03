import React, { useCallback, useRef, useEffect } from 'react';
import { IconCollapsedFolder, IconExpandedFolder } from 'code-easy-components';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

import { ITreeItem, IDroppableItem } from '../../shared/interfaces';
import { useItems, useConfigs } from '../../shared/hooks';
import { Icon } from '../icon/icon';

interface TreeItemProps extends ITreeItem {
    paddingLeft: number;
    disabledToDrop?: string[];
    showExpandIcon: IObservable<boolean>;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const TreeItem: React.FC<TreeItemProps> = (props) => {
    const { isUseDrag, isUseDrop, id: treeIdentifier, customDragLayer } = useConfigs();
    const { editItem, selectItem, changeAscById } = useItems();

    const radioItemRef = useRef<HTMLInputElement>(null);
    const itemRef = useRef(null);

    const {
        useCustomIconToExpand: _useCustomIconToExpand, iconSize: _iconSize, isDisabledDrop: _isDisabledDrop, isDisabledSelect: _isDisabledSelect, canDropList: _canDropList,
        showExpandIcon: _showExpandIcon, description: _description, hasError: _hasError, hasWarning: _hasWarning, isDisabled: _isDisabled, isDisabledClick: _isDisabledClick,
        isAllowedToggleNodeExpand: _isAllowedToggleNodeExpand, paddingLeft, isDisabledDrag: _isDisabledDrag, isEditing: _isEditing,
        id: _id, label: _label, isSelected: _isSelected, nodeExpanded: _nodeExpanded, icon: _icon, type: _type,
        disabledToDrop = [], onContextMenu, isDisabledDoubleClick: _isDisabledDoubleClick
    } = props;

    const [isAllowedToggleNodeExpand = true] = useObserver(_isAllowedToggleNodeExpand);
    const useCustomIconToExpand = useObserverValue(_useCustomIconToExpand);
    const isDisabledDoubleClick = useObserverValue(_isDisabledDoubleClick);
    const [nodeExpanded, setNodeExpanded] = useObserver(_nodeExpanded);
    const isDisabledSelect = useObserverValue(_isDisabledSelect);
    const isDisabledClick = useObserverValue(_isDisabledClick);
    const isDisabledDrag = useObserverValue(_isDisabledDrag);
    const isDisabledDrop = useObserverValue(_isDisabledDrop);
    const showExpandIcon = useObserverValue(_showExpandIcon);
    const description = useObserverValue(_description);
    const canDropList = useObserverValue(_canDropList);
    const hasWarning = useObserverValue(_hasWarning);
    const isDisabled = useObserverValue(_isDisabled);
    const isSelected = useObserverValue(_isSelected);
    const isEditing = useObserverValue(_isEditing);
    const hasError = useObserverValue(_hasError);
    const iconSize = useObserverValue(_iconSize);
    const label = useObserverValue(_label);
    const type = useObserverValue(_type);
    const icon = useObserverValue(_icon);
    const id = useObserverValue(_id);

    const handleExpandNode = useCallback((e: React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>) => {
        if (!isAllowedToggleNodeExpand) return;

        e.stopPropagation();
        e.preventDefault();

        setNodeExpanded(oldValue => !oldValue);
    }, [isAllowedToggleNodeExpand, setNodeExpanded]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 39 && !nodeExpanded) {
            handleExpandNode(e as any);
        } else if (e.keyCode === 37 && nodeExpanded) {
            handleExpandNode(e as any);
        } else if (e.keyCode === 13) {
            editItem(_isEditing);
        }
    }, [editItem, handleExpandNode, _isEditing, nodeExpanded]);

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

        selectItem(_isSelected, e.ctrlKey);
    }, [_isSelected, isDisabled, isDisabledClick, selectItem]);

    // Emits an event to identify which element was focused.
    const handleOnItemsFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (isDisabled || isDisabledClick || isSelected) return;

        e.stopPropagation();

        selectItem(_isSelected, false);
    }, [isDisabled, isDisabledClick, isSelected, selectItem, _isSelected]);

    // Emits an event to identify which element was clicked.
    const handleOnDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDisabled || isDisabledDoubleClick) return;

        e.stopPropagation();
        e.preventDefault();

        editItem(_isEditing);
    }, [isDisabled, isDisabledDoubleClick, _isEditing, editItem]);

    /** Permite que um elemento seja arrastado e dropado em outro lugar.. */
    const [{ isDragging }, dragRef, preview] = useDrag<IDroppableItem, any, { isDragging: boolean }>({
        item: {
            type,
            itemProps: {
                itemType: type,
                height: 0,
                width: 0,
                label,
                icon,
                id,
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
    const [{ isDraggingOver }, dropRef] = useDrop<IDroppableItem, any, { isDraggingOver: boolean }>({
        accept: canDropList || [],
        drop: item => handleOnDrop(item.itemProps.id),
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        canDrop: ({ itemProps }) => !!isUseDrop && !isDisabledDrop && !disabledToDrop.some(item => item === itemProps.id),
    });
    dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    return (
        <div
            title={description}
            onMouseDown={handleOnClick}
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
