import React from 'react';
import { observe, useObserverValue } from 'react-observing';

import { useConfigs, useItemsByAscendentId } from '../../shared/hooks';
import { ITreeItem } from '../../shared/interfaces';
import { TreeItem } from '../tree-item/TreeItem';

interface TreeProps {
    item: ITreeItem;
    paddingLeft?: number;
    disabledToDrop?: string[];
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}
export const Tree: React.FC<TreeProps> = ({ item, paddingLeft = 0, disabledToDrop = [], onContextMenu }) => {
    const { leftPadding = 16 } = useConfigs();

    const showExpandIcon = useObserverValue(item.showExpandIcon);
    const nodeExpanded = useObserverValue(item.nodeExpanded);
    const itemId = useObserverValue(item.id);
    const childs = useItemsByAscendentId(itemId);

    return (
        <>
            <TreeItem
                {...item}
                paddingLeft={paddingLeft}
                onContextMenu={onContextMenu}
                disabledToDrop={[...disabledToDrop]}
                showExpandIcon={observe(childs.length > 0 && (showExpandIcon === undefined ? true : showExpandIcon))}
            />
            {(nodeExpanded && itemId) &&
                childs.map((child, index) => (
                    <Tree
                        key={index}
                        item={child}
                        onContextMenu={onContextMenu}
                        paddingLeft={paddingLeft + leftPadding}
                        disabledToDrop={[...disabledToDrop, String(itemId)]}
                    />
                ))
            }
        </>
    );
}
