import React from 'react';

import ComponentType from '../../enuns/ComponentType';
import { TreeInterface } from './TreeInterface';
import { Folder } from './components/Folder';
import { Action } from './components/Action';
import "./Tree.scss";


export const Tree = (props: any) => {

    let treeItem: TreeInterface = props.treeItem;

    const onClick = props.onItemClick;

    const onDubleClick = props.onItemDoubleClick;

    return (
        <div className="item-body">
            <div className="item-list-pai">
                {
                    (treeItem.itemType === ComponentType.pasta) &&
                    <Folder onClick={() => onClick(treeItem.itemId)} expanded={treeItem.nodeExpanded} folderName={treeItem.itemLabel} />
                }
                {
                    (treeItem.itemType === ComponentType.localAction) &&
                    <Action onClick={() => onClick(treeItem.itemId)} onDoubleClick={() => onDubleClick(treeItem.itemId)} expanded={treeItem.nodeExpanded} actionName={treeItem.itemLabel} />
                }
                {
                    (treeItem.itemType === ComponentType.localVariable) &&
                    <Folder onClick={() => onClick(treeItem.itemId)} expanded={treeItem.nodeExpanded} folderName={treeItem.itemLabel} />
                }
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
