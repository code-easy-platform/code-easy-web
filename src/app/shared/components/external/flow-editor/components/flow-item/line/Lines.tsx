import React from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { useConfigs, useLines } from '../../../shared/hooks';
import { Line } from './Line';

interface ILinesProps {
    parentRef: React.RefObject<SVGSVGElement>;
    /**
     * Executed when a item is dropped in the line
     * @param item Item dropped
     * @param monitor Dnd current monitor
     * @param connectionId Used to idicate the line target
     */
    onDropItem?(item: any, monitor: DropTargetMonitor, connectionId: string | undefined): void;
    /**
     * Used to start the context menu for this específic component
     */
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
};
export const Lines: React.FC<ILinesProps> = ({ parentRef, onContextMenu, onDropItem }) => {
    const { typesAllowedToDrop } = useConfigs();
    const lines = useLines();

    return (<>
        {lines.map(({ id, originId, targetId }, index) => (
            <Line
                id={id}
                key={index}
                parentRef={parentRef}
                onDropItem={onDropItem}
                originIdStore={originId}
                targetIdStore={targetId}
                onContextMenu={onContextMenu}
                allowedsInDrop={typesAllowedToDrop}
            />
        ))}
    </>);
}
