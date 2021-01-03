import React from 'react';
import { useObserverValue } from 'react-observing';

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

    const description = useObserverValue(item.description);
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

    const handleOnContextMenu = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        onMouseDown && onMouseDown(e);
        e.stopPropagation();
        e.preventDefault();
    }

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
                style={{ cursor: 'move' }}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
                width={(width || 0) + ((lineWidth || 0) * 2) + 18}
                height={(height || 0) + ((lineWidth || 0) * 2) + 16}
            >
                <div
                    children={description}
                    style={{
                        border: `${lineWidth}px solid ${strokeColor}`,
                        height: '-webkit-fill-available',
                        width: '-webkit-fill-available',
                        backgroundColor: commentColor,
                        color: commentTextColor,
                        whiteSpace: 'pre-line',
                        pointerEvents: 'none',
                        lineHeight: '14px',
                        textAlign: 'start',
                        fontSize: 'small',
                        padding: 8,
                    }}
                />
            </foreignObject>
        </>
    );
};
