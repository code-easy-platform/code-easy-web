import React, { FC, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { TreeInterface } from './shared/models/TreeInterface';
import { Tree } from './shared/components/Tree';
import './TreeManager.css';

interface TreeManagerProps {
    isUseDrop?: boolean;
    isUseDrag?: boolean;
    itens: TreeInterface[];
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    onKeyDown?(e: React.FocusEvent<HTMLDivElement>): void;
    onDropItem?(targetItemId: string, dropppedItemId: string, droppedItemProps: any): void;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onExpandNode?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const TreeManager: FC<TreeManagerProps> = ({ itens, onClick, onFocus, onKeyDown, onContextMenu, onDoubleClick, onExpandNode = () => { }, onDropItem = () => { }, isUseDrag = false, isUseDrop = false }) => {

    const [clickedId, setClickedId] = useState("");
    useEffect(() => {
        setClickedId(clickedId)
    }, [clickedId]);

    const click = (id: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (!item.isDisabledSelect) {
            setClickedId(id);
        }

        if (!item.isDisabled) {
            onClick && onClick(id, item, e);
        }

    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                tabIndex={0}
                onFocus={onFocus}
                className="tree-base"
                onKeyDown={(e: any) => onKeyDown && onKeyDown(e)}
            >
                {itens.map((item, index) => (
                    <Tree
                        key={index}
                        item={item}
                        paddingLeft={5}
                        onClick={click}
                        isUseDrag={isUseDrag}
                        isUseDrop={isUseDrop}
                        onDropItem={onDropItem}
                        itemIdSelected={clickedId}
                        onExpandNode={onExpandNode}
                        onContextMenu={onContextMenu}
                        onDoubleClick={onDoubleClick}
                    />
                ))}
                <div onContextMenu={e => onContextMenu && onContextMenu(undefined, e)} className="flex1" style={{ paddingBottom: 100 }} />
            </div>
        </DndProvider>
    );

}
