import React, { FC, useState, useEffect } from 'react';
import { TreeInterface } from '../models/TreeInterface';
import { TreeItem } from './TreeItem';

interface TreeProps {
    isUseDrop: boolean;
    isUseDrag: boolean;
    item: TreeInterface;
    paddingLeft: number;
    itemIdSelected: string;
    onDropItem(targetItemId: string | undefined, dropppedItemId: string | undefined, droppedItemProps: any): void;
    onContextMenu(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onClick(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const Tree: FC<TreeProps> = ({ item, paddingLeft = 0, onClick, onContextMenu, onDoubleClick, onDropItem, itemIdSelected, isUseDrag, isUseDrop }) => {

    const [state, setState] = useState<TreeInterface>(item);
    state.isSelected = itemIdSelected === item.id;

    useEffect(() => {
        setState(item);
    }, [item]);

    return (<>
        <TreeItem
            itemTree={state}
            isUseDrag={isUseDrag}
            isUseDrop={isUseDrop}
            onDropItem={onDropItem}
            paddingLeft={paddingLeft}
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            onClick={(_, e) => onClick(item.id, item, e)}
            onExpandNode={(_, e) => {
                setState({
                    ...state,
                    nodeExpanded: state.isAllowedToggleNodeExpand === false ? state.nodeExpanded : !state.nodeExpanded,
                });
            }}
        />
        {state.nodeExpanded &&
            state.childs.map((item: TreeInterface) => {
                return (<Tree
                    item={item}
                    onClick={onClick}
                    isUseDrag={isUseDrag}
                    isUseDrop={isUseDrop}
                    onDropItem={onDropItem}
                    onDoubleClick={onDoubleClick}
                    onContextMenu={onContextMenu}
                    paddingLeft={paddingLeft + 10}
                    itemIdSelected={itemIdSelected}
                />);
            })}
    </>);
};
