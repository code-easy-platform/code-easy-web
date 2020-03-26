import React, { FC, useState } from 'react';
import { TreeInterface } from '../models/TreeInterface';
import { TreeItem } from './TreeItem';

interface TreeProps {
    item: TreeInterface;
    paddingLeft: number;
    onClick(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    itemIdSelected: string;
}
export const Tree: FC<TreeProps> = ({ item, paddingLeft = 0, onClick, onContextMenu, onDoubleClick, itemIdSelected }) => {
    const [state, setState] = useState<TreeInterface>(item);
    state.isSelected = itemIdSelected === state.itemId;
    return (<>
        <TreeItem
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            paddingLeft={paddingLeft} itemTree={state}
            onSelect={(_, e) => {
                setState({
                    ...state,
                    nodeExpanded: !state.nodeExpanded,
                });
                onClick(item.itemId, item, e);
            }}
        />
        {state.nodeExpanded &&
            state.itemChilds.map((item: TreeInterface) => {
                return (<Tree onDoubleClick={onDoubleClick} itemIdSelected={itemIdSelected} onContextMenu={onContextMenu} onClick={onClick} paddingLeft={paddingLeft + 10} item={item} />);
            })}
    </>);
};
