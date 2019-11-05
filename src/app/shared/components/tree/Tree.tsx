import React from 'react';

import { TreeInterface } from './TreeInterface';
import "./Tree.scss";
import { Folder } from './components/Folder';


export const Tree = (props: any) => {

    let treeItem: TreeInterface = props.treeItem;

    const onClick = props.onItemClick;

    const onDubleClick = props.onItemoDubleClick;

    return (
        <div className="item-body">
            <div className="item-list-pai" onDoubleClick={() => onDubleClick(treeItem.itemId)}>
                <Folder onClick={onClick} expanded={treeItem.nodeExpanded} folderName={treeItem.itemLabel} />
            </div>
            {
                treeItem.nodeExpanded === true
                    ? treeItem.itemChilds.map((tree: TreeInterface) => {
                        return (
                            <div className="item-list-filho">
                                <Tree treeItem={tree} />
                            </div>
                        );
                    })
                    : undefined
            }
        </div>
    );
}

export default Tree;
