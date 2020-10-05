import React from 'react';

import { IFlowItem } from '../../shared/interfaces/FlowItemInterfaces';
import NewConnectionBox from './line/NewConnectionBox';
import { useConfigs } from '../../shared/hooks';

interface CommentProps {
    item: IFlowItem;
    parentRef: React.RefObject<SVGSVGElement>;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement | HTMLDivElement, MouseEvent>): void;
}
export const Comment: React.FC<CommentProps> = ({ item, parentRef, onMouseDown, onContextMenu }) => {
    const { flowItemSelectedColor, commentColor, lineWidth, flowItemErrorColor, flowItemWarningColor, commentTextColor } = useConfigs();

    const strokeColor: string = item.isSelected
        ? `${flowItemSelectedColor}`
        : item.hasError
            ? `${flowItemErrorColor}`
            : item.hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    const handleOnContextMenu = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }

    return (
        <>
            <NewConnectionBox
                height={(item.height || 0) + ((lineWidth || 0) * 2) + 36}
                width={(item.width || 0) + ((lineWidth || 0) * 2) + 38}
                originId={String(item.id)}
                lineWidth={lineWidth}
                left={item.left - 20}
                parentRef={parentRef}
                top={item.top - 20}
            />
            <foreignObject
                id={item.id}
                y={item.top - 10}
                x={item.left - 10}
                style={{ cursor: 'move' }}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
                width={(item.width || 0) + ((lineWidth || 0) * 2) + 18}
                height={(item.height || 0) + ((lineWidth || 0) * 2) + 16}
            >
                <div
                    children={item.description}
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
