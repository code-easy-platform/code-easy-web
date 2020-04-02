import React, { FC, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { TreeInterface } from './shared/models/TreeInterface';
import { Tree } from './shared/components/Tree';
import './TreeManager.scss';

interface TreeManagerProps {
    isUseDrop?: boolean;
    isUseDrag?: boolean;
    itemBase: TreeInterface;
    onClick(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDropItem?(targetItemId: string, dropppedItemId: string, droppedItemProps: any): void;
}
export const TreeManager: FC<TreeManagerProps> = ({ itemBase, onClick, onContextMenu, onDoubleClick, onDropItem = () => { }, isUseDrag = false, isUseDrop = false }) => {

    const [clickedId, setClickedId] = useState("");
    useEffect(() => {
        setClickedId(clickedId)
    }, [clickedId]);

    const onSelect = (id: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setClickedId(id);
        onClick(id, item, e);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="tree-base">
                <Tree
                    item={itemBase}
                    paddingLeft={5}
                    onClick={onSelect}
                    isUseDrag={isUseDrag}
                    isUseDrop={isUseDrop}
                    onDropItem={onDropItem}
                    itemIdSelected={clickedId}
                    onContextMenu={onContextMenu}
                    onDoubleClick={onDoubleClick}
                />
                <div style={{ paddingBottom: 100 }} />
            </div>
        </DndProvider>
    );

}
