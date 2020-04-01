import React, { FC, useRef } from 'react';
import { useDrag } from 'react-dnd';

import { TreeItensTypes } from '../models/TreeItensTypes';
import { TreeInterface } from '../models/TreeInterface';
import { Icon } from './icon/icon';

interface ItemTreeProps {
    paddingLeft: number,
    itemTree: TreeInterface,
    onSelect(itemTreeId: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined,
    onDoubleClick(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined,
}
export const TreeItem: FC<ItemTreeProps> = ({ itemTree, paddingLeft, onSelect, onContextMenu, onDoubleClick }) => {

    // Vai mandar para fora da arvore qual o id do item que foi clicado.
    const onContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onContextMenu(itemTree.itemId, e);
    }

    const itemRef = useRef(null);
    if (itemRef.current) {
        let item: any = itemRef.current
        item.setAttribute('selected', itemTree.isSelected);
    }

    /** Permite que um elemento seja arrastado e dropado em outro lugar.. */
    const [, dragRef] = useDrag({
        item: { type: 'ACTION', itemProps: { left: 0, top: 0, title: itemTree.itemLabel, itemType: 'ACTION', sucessor: [0] } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    dragRef(itemRef)

    return (
        <div
            ref={itemRef}
            className="tree-item"
            key={itemTree.itemId}
            onContextMenu={onContext}
            id={"tree_" + itemTree.itemId}
            onClick={(e: any) => onSelect(itemTree.itemId, e)}
            onDoubleClick={e => { onDoubleClick(itemTree.itemId, itemTree, e) }}
        >
            <div className="item" style={{ paddingLeft: `${paddingLeft}px` }}>
                {itemTree.itemType === TreeItensTypes.folder &&
                    <Icon iconName={itemTree.nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"} />
                }
                {itemTree.itemType === TreeItensTypes.file &&
                    <Icon />
                }
                {itemTree.itemLabel}
            </div>
        </div>
    );
}
