import React, { FC, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { TreeItensTypes } from '../models/TreeItensTypes';
import { TreeInterface } from '../models/TreeInterface';
import { Icon } from './icon/icon';

interface ItemTreeProps {
    isUseDrop: boolean;
    isUseDrag: boolean;
    paddingLeft: number;
    itemTree: TreeInterface;
    onSelect(itemTreeId: string | undefined, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick(itemTreeId: string | undefined, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onContextMenu(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDropItem(targetItemId: string | undefined, dropppedItemId: string | undefined, droppedItemProps: any): void;
}
export const TreeItem: FC<ItemTreeProps> = ({ itemTree, paddingLeft, onSelect, onContextMenu, onDoubleClick, onDropItem, isUseDrag, isUseDrop }) => {

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
        item: {
            type: itemTree.itemType,
            itemProps: {
                itemType: itemTree.itemType,
                title: itemTree.itemLabel,
                id: itemTree.itemId,
                itemTree: itemTree,
                sucessor: [0],
            }
        },
        collect: monitor => ({ isDragging: monitor.isDragging() }),

    });
    if (isUseDrag) dragRef(itemRef); /** Agrupa as referências do drop com as da ref. */

    /** Usado para que seja possível o drop de itens no editor. */
    const [, dropRef] = useDrop({
        accept: [TreeItensTypes.file, TreeItensTypes.folder],
        drop(item: any, monitor: DropTargetMonitor) { onDropItem(itemTree.itemId, item.itemProps.id, item) },
    });
    if (isUseDrop) dropRef(itemRef); /** Agrupa as referências do drop com as da ref. */

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
                {(itemTree.itemType === TreeItensTypes.folder || itemTree.itemChilds.length > 0) &&
                    <Icon iconName={itemTree.nodeExpanded ? "btn-collapse-folder" : "btn-expand-folder"} />
                }
                {(itemTree.itemType === TreeItensTypes.file && itemTree.itemChilds.length === 0) &&
                    <Icon />
                }
                {itemTree.itemLabel}
            </div>
        </div>
    );
}
