import React, { useCallback, useRef, useEffect, useState } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

import { ITreeItem, IDroppableItem } from '../../shared/interfaces';
import { ExpandCollapse } from '../expand-collapse/ExpandCollapse';
import { useItems, useConfigs } from '../../shared/hooks';
import { getCustomDragLayer } from '../../shared/tools';
import { Icon } from '../icon/icon';
import './TreeItem.css';
import { InsertBar } from '../insert-bar/InsertBar';


interface TreeItemProps {
    item: ITreeItem;
    paddingLeft: number;
    showExpandIcon: boolean;
    disabledToDrop?: string[];
    /**
     * Event emitted whenever the key press is identified
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement | HTMLLabelElement>) => void;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<any, MouseEvent>): void | undefined;
}
export const TreeItem: React.FC<TreeItemProps> = ({ item, paddingLeft, disabledToDrop = [], children, showExpandIcon, onContextMenu, onKeyDown }) => {
    const { isUseDrag, isUseDrop = true, id: treeIdentifier, activeItemBackgroundColor, leftPadding = 8 } = useConfigs();
    const { editItem, selectItem, changeAscendentById, selectAll } = useItems();

    const treeItemLabelHtmlRef = useRef<HTMLLabelElement>(null);
    const treeItemHtmlRef = useRef<HTMLDivElement>(null);

    const [isOverCurrentStart, setIsOverStartCurrent] = useState(false);
    const [isOverCurrentEnd, setIsOverEndCurrent] = useState(false);
    const [isOverStart, setIsOverStart] = useState(false);
    const [isOverEnd, setIsOverEnd] = useState(false);

    const [isAllowedToggleNodeExpand = true] = useObserver(item.isAllowedToggleNodeExpand);
    const [useCustomIconToExpand] = useObserver(item.useCustomIconToExpand);
    const [isDisabledDoubleClick] = useObserver(item.isDisabledDoubleClick);
    const [nodeExpanded, setNodeExpanded] = useObserver(item.nodeExpanded);
    const [isDisabledSelect] = useObserver(item.isDisabledSelect);
    const [isDisabledClick] = useObserver(item.isDisabledClick);
    const [isDisabledDrag] = useObserver(item.isDisabledDrag);
    const [isDisabledDrop] = useObserver(item.isDisabledDrop);
    const [canDropList = []] = useObserver(item.canDropList);
    const [description] = useObserver(item.description);
    const [hasWarning] = useObserver(item.hasWarning);
    const [isSelected] = useObserver(item.isSelected);
    const [isDisabled] = useObserver(item.isDisabled);
    const [isEditing] = useObserver(item.isEditing);
    const [iconSize] = useObserver(item.iconSize);
    const [hasError] = useObserver(item.hasError);
    const [label] = useObserver(item.label);
    const [icon] = useObserver(item.icon);
    const [type] = useObserver(item.type);
    const [id] = useObserver(item.id);

    /* Focus in this label element */
    useEffect(() => {
        if (isSelected && treeItemLabelHtmlRef.current) {
            treeItemLabelHtmlRef.current.focus();
        }
    }, [isSelected]);


    /** Emits an event to identify which element was clicked. */
    const handleContext = useCallback((e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        e.stopPropagation();
        onContextMenu && onContextMenu(treeIdentifier, e);
    }, [treeIdentifier, onContextMenu]);

    /** Emits an event to identify which element was clicked. */
    const handleSelect = useCallback((e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        if (isDisabled || isDisabledClick || isDisabledSelect) return;

        e.stopPropagation();

        selectItem(item.isSelected, e.ctrlKey)
    }, [isDisabled, isDisabledClick, isDisabledSelect, item.isSelected, selectItem]);

    const handleEdit = useCallback((e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        if (isDisabled || isDisabledDoubleClick) return;

        e.stopPropagation();
        e.preventDefault();

        editItem(item.isEditing);
    }, [editItem, isDisabled, isDisabledDoubleClick, item.isEditing]);

    const handleKeyDown: React.KeyboardEventHandler<HTMLLabelElement> = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();

        const allTreeItems = Array.from(document.querySelectorAll(`#${treeIdentifier} .tree-item > .tree-item-label[tabIndex="0"]`));
        if (allTreeItems.length === 0) return;

        if (!treeItemLabelHtmlRef.current) return;

        const index = allTreeItems.indexOf(treeItemLabelHtmlRef.current);
        if (index < 0) return;

        switch (e.key) {
            case 'ArrowUp':
                if (index > 0) {
                    (allTreeItems[index - 1] as any)?.click();
                }
                break;
            case 'ArrowDown':
                if (allTreeItems.length > (index + 1)) {
                    (allTreeItems[index + 1] as any)?.click()
                }
                break;
            case 'ArrowLeft':
                if (nodeExpanded && isAllowedToggleNodeExpand) {
                    setNodeExpanded(false);
                } else {
                    if (index > 0) {
                        (allTreeItems[index - 1] as any)?.click();
                    }
                }
                break;
            case 'ArrowRight':
                if (!nodeExpanded && isAllowedToggleNodeExpand) {
                    setNodeExpanded(true);
                } else {
                    if (allTreeItems.length > (index + 1)) {
                        (allTreeItems[index + 1] as any)?.click();
                    }
                }
                break;
            case 'Enter':
                if (!isDisabled && !isDisabledDoubleClick) {
                    editItem(item.isEditing);
                }
                break;
            case 'Escape':
                const treeBase = document.querySelector(`#${treeIdentifier}`);
                if (!treeBase) return;

                (treeBase as any).focus();
                break;
            case 'a':
                if (e.ctrlKey) selectAll();
                onKeyDown && onKeyDown(e);
                break;
            case ' ':
                if (isAllowedToggleNodeExpand) {
                    setNodeExpanded(old => !old);
                }
                break;
            default:
                onKeyDown && onKeyDown(e);
                break;
        }
    }, [treeIdentifier, nodeExpanded, isAllowedToggleNodeExpand, isDisabled, isDisabledDoubleClick, item.isEditing, selectAll, setNodeExpanded, editItem, onKeyDown]);

    const handleHover = useCallback((item: IDroppableItem, monitor: DropTargetMonitor) => {
        if (!treeItemHtmlRef.current || !treeItemLabelHtmlRef.current) {
            setIsOverEnd(false);
            setIsOverStart(false);
            setIsOverEndCurrent(false);
            setIsOverStartCurrent(false);

            return;
        }

        else if (item.id === id || disabledToDrop.some(itemId => itemId === item.id)) {
            setIsOverEnd(false);
            setIsOverStart(false);
            setIsOverEndCurrent(false);
            setIsOverStartCurrent(false);

            return;
        }

        const monitorOffset = monitor.getClientOffset();

        if (!monitorOffset) {
            setIsOverEnd(false);
            setIsOverStart(false);
            setIsOverEndCurrent(false);
            setIsOverStartCurrent(false);

            return;
        }

        const targetSize = treeItemLabelHtmlRef.current.getBoundingClientRect();
        const monitorIsOver = monitor.isOver({ shallow: true });
        const draggedTop = monitorOffset.y - targetSize.top;

        const startEndBreackSize = 4;

        const tempIsOverEnd = draggedTop >= (targetSize.height - startEndBreackSize) && draggedTop <= targetSize.height;
        const tempIsOverStart = draggedTop >= 0 && draggedTop <= startEndBreackSize;
        const tempIsOverEndCurrent = (draggedTop >= (targetSize.height / 2)) && (draggedTop <= (targetSize.height - startEndBreackSize));
        const tempIsOverStartCurrent = draggedTop >= startEndBreackSize && (draggedTop <= (targetSize.height / 2));


        const isNotCurrent = tempIsOverEnd || tempIsOverStart;

        setIsOverEnd(tempIsOverEnd && monitorIsOver);
        setIsOverStart(tempIsOverStart && monitorIsOver);
        setIsOverEndCurrent(tempIsOverEndCurrent && monitorIsOver && !isNotCurrent);
        setIsOverStartCurrent(tempIsOverStartCurrent && monitorIsOver && !isNotCurrent);

    }, [disabledToDrop, id]);

    const handleDragLeave = useCallback(() => {
        setIsOverEnd(false);
        setIsOverStart(false);
        setIsOverEndCurrent(false);
        setIsOverStartCurrent(false);
    }, []);

    const handleDrop = useCallback((item: IDroppableItem, monitor: DropTargetMonitor, isOverStart: boolean, isOverEnd: boolean, isOverCurrentStart: boolean, isOverCurrentEnd: boolean) => {
        setIsOverEnd(false);
        setIsOverStart(false);
        setIsOverEndCurrent(false);
        setIsOverStartCurrent(false);

        if (item.id === id || disabledToDrop.some(itemId => itemId === item.id)) return;

        if (monitor.didDrop()) return;

        if (!isOverStart && !isOverEnd && !isOverCurrentStart && !isOverCurrentEnd) return;

        const position = isOverCurrentStart || isOverCurrentEnd
            ? 'center'
            : isOverStart
                ? 'up'
                : 'down';


        changeAscendentById(item.id, id, position);
    }, [changeAscendentById, disabledToDrop, id]);


    const [, dropRef] = useDrop<IDroppableItem, any, any>({
        hover: handleHover,
        accept: canDropList,
        canDrop: () => isUseDrop && !isDisabledDrop,
        drop: (item, monitor) => handleDrop(item, monitor, isOverStart, isOverEnd, isOverCurrentStart, isOverCurrentEnd),
    }, [canDropList, isUseDrop, isDisabledDrop, isOverStart, isOverEnd, isOverCurrentStart, isOverCurrentEnd, handleHover]);

    const [{ isDragging }, dragRef, preview] = useDrag<IDroppableItem, any, { isDragging: boolean }>({
        type,
        canDrag: isUseDrag && !isDisabledDrag,
        collect: monitor => ({ isDragging: monitor.isDragging() }),
        item: {
            itemType: type,
            height: 0,
            width: 0,
            label,
            icon,
            id,
        },
    }, [id, icon, label, isUseDrag, isDisabledDrag, type]);

    dropRef(dragRef(treeItemLabelHtmlRef));

    /** Faz com que o item que está sendo arrastado tenha um preview custumizado */
    useEffect(() => {
        const customDragLayer = getCustomDragLayer(label, {
            icon: typeof icon === 'string' ? icon : String(icon?.content),
            color: activeItemBackgroundColor,
        });

        preview(customDragLayer, { captureDraggingState: false, offsetX: -16, offsetY: customDragLayer.offsetHeight / 2 })

        return () => customDragLayer.remove();
    }, [preview, label, icon, activeItemBackgroundColor]);

    return (
        <div
            className="tree-item"
            ref={treeItemHtmlRef}
            onDragEnd={handleDragLeave}
            onDragLeave={handleDragLeave}
            tree-item-is-dragging={String(isDragging)}
        >
            <InsertBar
                visible={isOverStart}
                marginLeft={paddingLeft}
                background={activeItemBackgroundColor}
            />

            <label
                role="treeitem"
                aria-label={label}
                title={description}
                onClick={handleSelect}
                style={{ paddingLeft }}
                onKeyDown={handleKeyDown}
                ref={treeItemLabelHtmlRef}
                onDoubleClick={handleEdit}
                className="tree-item-label"
                onContextMenu={handleContext}
                tabIndex={(isDisabledSelect || isDisabled || isDisabledClick) ? -1 : 0}

                tree-item-editing={String(isEditing)}
                tree-item-has-error={String(hasError)}
                tree-item-disabled={String(isDisabled)}
                tree-item-selected={String(isSelected)}
                tree-item-has-warning={String(hasWarning)}
                tree-item-is-dragging-over={String(isOverCurrentStart || isOverCurrentEnd)}
            >
                <ExpandCollapse
                    display={showExpandIcon}
                    isExpanded={nodeExpanded}
                    allowToggle={isAllowedToggleNodeExpand}
                    onClick={() => setNodeExpanded(!nodeExpanded)}
                />

                <Icon
                    iconName={label}
                    iconSize={iconSize || 16}
                    show={icon !== undefined}
                    icon={typeof icon === 'string' ? icon : String(icon?.content)}
                    onClick={useCustomIconToExpand ? () => setNodeExpanded(!nodeExpanded) : undefined}
                />

                <p className="tree-item-label-content-text">
                    {label}
                </p>
            </label>

            <InsertBar
                visible={isOverEnd}
                background={activeItemBackgroundColor}
                marginLeft={paddingLeft + (children ? leftPadding : 0)}
            />

            {children && (
                <div className="tree-item-childs">
                    {children}
                </div>
            )}
        </div>
    );
}









interface _TreeItemProps extends ITreeItem {
    paddingLeft: number;
    disabledToDrop?: string[];
    showExpandIcon: IObservable<boolean>;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const _TreeItem: React.FC<_TreeItemProps> = ({ disabledToDrop = [], onContextMenu, paddingLeft, children, ...props }) => {
    const { isUseDrag, isUseDrop, id: treeIdentifier, activeItemBackgroundColor } = useConfigs();
    const { editItem, selectItem, changeAscendentById } = useItems();

    const radioItemRef = useRef<HTMLInputElement>(null);
    const itemRef = useRef<HTMLLabelElement>(null);

    //#region States

    const [isAllowedToggleNodeExpand = true] = useObserver(props.isAllowedToggleNodeExpand);
    const useCustomIconToExpand = useObserverValue(props.useCustomIconToExpand);
    const isDisabledDoubleClick = useObserverValue(props.isDisabledDoubleClick);
    const [nodeExpanded, setNodeExpanded] = useObserver(props.nodeExpanded);
    const isDisabledSelect = useObserverValue(props.isDisabledSelect);
    const isDisabledClick = useObserverValue(props.isDisabledClick);
    const isDisabledDrag = useObserverValue(props.isDisabledDrag);
    const isDisabledDrop = useObserverValue(props.isDisabledDrop);
    const showExpandIcon = useObserverValue(props.showExpandIcon);
    const description = useObserverValue(props.description);
    const canDropList = useObserverValue(props.canDropList);
    const isDisabled = useObserverValue(props.isDisabled);
    const hasWarning = useObserverValue(props.hasWarning);
    const isSelected = useObserverValue(props.isSelected);
    const isEditing = useObserverValue(props.isEditing);
    const hasError = useObserverValue(props.hasError);
    const iconSize = useObserverValue(props.iconSize);
    const label = useObserverValue(props.label);
    const type = useObserverValue(props.type);
    const icon = useObserverValue(props.icon);
    const id = useObserverValue(props.id);

    //#endregion

    // Scroll elements
    useEffect(() => {
        if (isSelected && itemRef.current) {
            (itemRef.current as any)?.scrollIntoViewIfNeeded({ behavior: 'smooth' });
        }
    }, [isSelected]);

    //#region Methdos

    const handleExpandNode = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
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
            editItem(props.isEditing);
        }
    }, [editItem, handleExpandNode, props.isEditing, nodeExpanded]);

    /** Emits an event to identify which element was clicked. */
    const handleOnContext = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onContextMenu && onContextMenu(id, e);
    }, [id, onContextMenu]);

    // Emits an event to identify which element was clicked.
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDisabled || isDisabledClick) return;

        e.stopPropagation();

        selectItem(props.isSelected, e.ctrlKey);
    }, [props.isSelected, isDisabled, isDisabledClick, selectItem]);

    // Emits an event to identify which element was focused.
    const handleOnItemsFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (isDisabled || isDisabledClick || isSelected) return;

        e.stopPropagation();

        selectItem(props.isSelected, false);
    }, [isDisabled, isDisabledClick, isSelected, selectItem, props.isSelected]);

    // Emits an event to identify which element was clicked.
    const handleOnDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDisabled || isDisabledDoubleClick) return;

        e.stopPropagation();
        e.preventDefault();

        editItem(props.isEditing);
    }, [isDisabled, isDisabledDoubleClick, props.isEditing, editItem]);



    const handleOnDrop = useCallback((droppedId: string | undefined) => {
        changeAscendentById(droppedId, id)
    }, [changeAscendentById, id]);

    //#endregion

    //#region Drag and drop

    /** Usado para que seja possível o drop de itens no editor. */
    const [{ isDraggingOver }, dropRef] = useDrop<IDroppableItem, any, { isDraggingOver: boolean }>({
        accept: canDropList || [],
        drop: item => handleOnDrop(item.id),
        collect: (monitor) => ({ isDraggingOver: monitor.isOver() }),
        canDrop: ({ id }) => !!isUseDrop && !isDisabledDrop && !disabledToDrop.some(item => item === id),
    });

    /** Permite que um elemento seja arrastado e dropado em outro lugar.. */
    const [{ isDragging }, dragRef, preview] = useDrag<IDroppableItem, any, { isDragging: boolean }>({
        type,
        canDrag: isUseDrag && !isDisabledDrag,
        collect: monitor => ({ isDragging: monitor.isDragging() }),
        item: {
            itemType: type,
            height: 0,
            width: 0,
            label,
            icon,
            id,
        },
    });

    /** Faz com que o item que está sendo arrastado tenha um preview custumizado */
    useEffect(() => {
        const customDragLayer = getCustomDragLayer(label, {
            icon: typeof icon === 'string' ? icon : String(icon?.content),
            color: activeItemBackgroundColor,
        });

        preview(customDragLayer, { captureDraggingState: false, offsetX: -16, offsetY: customDragLayer.offsetHeight / 2 })

        return () => customDragLayer.remove();
    }, [preview, label, icon, activeItemBackgroundColor]);

    dropRef(dragRef(itemRef)); /** Agrupa as referências do drop e drag com as da ref. */

    //#endregion

    return (
        <div style={{ width: '100%', flexDirection: 'column', backgroundColor: (isDraggingOver && !isDragging) ? '#ffffff07' : undefined, opacity: isDragging ? 0.5 : undefined }}>
            <div
                title={description}
                onMouseDown={handleOnClick}
                onContextMenu={handleOnContext}
                onDoubleClick={handleOnDoubleClick}
                className={`tree-item${isDisabled ? ' disabled' : ''}${isEditing ? ' editing' : ''}${isSelected ? ' selected' : ''}${isDragging ? ' dragging' : ''}${(isDraggingOver && isUseDrop && !isDisabledDrop && !isDragging) ? ' dragging-over' : ''}`}
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
                    {showExpandIcon && (nodeExpanded
                        ? (
                            <VscChevronDown
                                size={16}
                                style={{ marginRight: 8 }}
                                onClick={handleExpandNode}
                            />
                        )
                        : (
                            <VscChevronRight
                                size={16}
                                style={{ marginRight: 8 }}
                                onClick={handleExpandNode}
                            />
                        )
                    )}
                    <Icon
                        iconName={label}
                        iconSize={iconSize || 16}
                        show={icon !== undefined}
                        icon={typeof icon === 'string' ? icon : String(icon?.content)}
                        onClick={useCustomIconToExpand ? handleExpandNode : undefined}
                    />
                    {label}
                </label>
            </div>
            {children}
        </div>
    );
}
