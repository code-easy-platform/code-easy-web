import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import NewConnectionBox from './line/NewConnectionBox';
import { useConfigs } from '../../shared/hooks';

interface CommentProps {
    /**
     *
     */
    item: IFlowItem;
    /**
     *
     */
    parentRef: React.RefObject<SVGSVGElement>;
    /**
     * Used in parent component to move this element in the screen
     */
    onMouseDown?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
}
export const Comment: React.FC<CommentProps> = ({ item, parentRef, onMouseDown, onContextMenu }) => {
    const { flowItemSelectedColor, commentColor, lineWidth, flowItemErrorColor, flowItemWarningColor, commentTextColor } = useConfigs();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    const isEditableOnDoubleClick = useObserverValue(item.isEditableOnDoubleClick);
    const isAcceptingConnections = useObserverValue(item.isAcceptingConnections);
    const [description, setDescription] = useObserver(item.description);
    const isSelected = useObserverValue(item.isSelected);
    const hasWarning = useObserverValue(item.hasWarning);
    const hasError = useObserverValue(item.hasError);
    const height = useObserverValue(item.height);
    const width = useObserverValue(item.width);
    const left = useObserverValue(item.left);
    const top = useObserverValue(item.top);

    const strokeColor: string = isSelected
        ? `${flowItemSelectedColor}`
        : hasError
            ? `${flowItemErrorColor}`
            : hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    useEffect(() => {
        if (textareaRef.current && isEditing) {
            textareaRef.current.select();
            textareaRef.current.focus();
        }
    }, [isEditing])

    const handleOnContextMenu = useCallback((e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    const handleOnMouseDown = useCallback((e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }, [onMouseDown]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Escape') {
            textareaRef.current?.blur();
            setIsEditing(false);
        }
        e.stopPropagation();
    }, [setIsEditing]);

    return (
        <>
            <NewConnectionBox
                height={(height || 0) + ((lineWidth || 0) * 2) + 36}
                width={(width || 0) + ((lineWidth || 0) * 2) + 38}
                originIdStore={item.id}
                lineWidth={lineWidth}
                parentRef={parentRef}
                left={left - 20}
                top={top - 20}
            />
            <foreignObject
                y={top - 10}
                x={left - 10}
                id={item.id.value}
                style={{ cursor: isEditing ? 'text' : 'move' }}
                width={(width || 0) + ((lineWidth || 0) * 2) + 18}
                height={(height || 0) + ((lineWidth || 0) * 2) + 16}
                onMouseDown={!isEditing ? handleOnMouseDown : undefined}
                onContextMenu={!isEditing ? handleOnContextMenu : undefined}
                data-allow-connection={String(isAcceptingConnections || true)}
                onDoubleClick={isEditableOnDoubleClick ? () => setIsEditing(true) : undefined}
            >
                <textarea
                    ref={textareaRef}
                    value={description}
                    onKeyDown={handleKeyDown}
                    tabIndex={isEditing ? 0 : -1}
                    onBlur={() => setIsEditing(false)}
                    onChange={e => isEditing ? setDescription(e.currentTarget.value) : undefined}
                    style={{
                        border: `${lineWidth || 0}px solid ${strokeColor}`,
                        pointerEvents: isEditing ? 'all' : 'none',
                        height: '-webkit-fill-available',
                        width: '-webkit-fill-available',
                        backgroundColor: commentColor,
                        color: commentTextColor,
                        whiteSpace: 'pre-line',
                        overflow: 'hidden',
                        lineHeight: '14px',
                        textAlign: 'start',
                        fontSize: 'small',
                        borderRadius: 0,
                        resize: 'none',
                        padding: 8,
                    }}
                />
            </foreignObject>
        </>
    );
};
