import React, { useCallback } from 'react';

import { IFlowItem } from '../../../shared/interfaces/FlowItemInterfaces';
import { useConfigs, useSelectItemById } from '../../../shared/hooks';
import { SelectionBox, TextOverItem, ImageView} from './components';
import NewConnectionBox from '../line/NewConnectionBox';

interface FlowComponentProps {
    item: IFlowItem;

    /** Used in parent component to move this element in the screen */
    onMouseDown?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    /** Used to start the context menu for this específic component */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const Acorn: React.FC<FlowComponentProps> = ({ item, onContextMenu, onMouseDown }) => {
    const { flowItemErrorColor, flowItemTextColor, flowItemWarningColor, flowItemSelectedColor, lineWidth, backgroundColor } = useConfigs();
    const selectItemById = useSelectItemById();

    const strokeColor: string = item.isSelected
        ? `${flowItemSelectedColor}`
        : item.hasError
            ? `${flowItemErrorColor}`
            : item.hasWarning
                ? `${flowItemWarningColor}`
                : "transparent";

    const mouseDownMove = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (item.isDisabled) return;
        e.stopPropagation();
        onMouseDown && onMouseDown(e);
    }

    const contextMenu = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    return (
        <g
            role={item.flowItemType}
            onContextMenu={contextMenu}
        >
            {item.isEnabledNewConnetion && <NewConnectionBox
                onMouseDown={e => selectItemById(item.id, e.ctrlKey)}
                height={(item.height || 0) + 20}
                width={(item.width || 0) + 20}
                originId={String(item.id)}
                left={item.left - 10}
                top={item.top - 10}
                isRounded={true}
            />}
            <TextOverItem
                left={item.left + ((item.width || 0) / 2)}
                textColor={flowItemTextColor}
                label={item.label}
                top={item.top}
            />
            <SelectionBox
                fullDraggable={!item.isEnabledNewConnetion}
                backgroundColor={backgroundColor}
                onMouseDown={mouseDownMove}
                strokeColor={strokeColor}
                height={item.height || 0}
                strokeWidth={lineWidth}
                width={item.width || 0}
                id={String(item.id)}
                left={item.left}
                top={item.top}
            />
            <ImageView
                imageSrc={item.icon}
                height={item.height}
                width={item.width}
                left={item.left}
                top={item.top}
            />
            <title>{item.description}</title>
        </g>
    );
};
