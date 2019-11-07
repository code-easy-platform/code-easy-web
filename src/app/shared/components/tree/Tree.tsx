import React from 'react';

import ComponentType from '../../enuns/ComponentType';
import { TreeInterface } from './TreeInterface';
import { Variable } from './components/Variable';
import { Folder } from './components/Folder';
import { Action } from './components/Action';
import "./Tree.scss";


export const Tree = (props: any) => {

    let treeItem: TreeInterface = props.treeItem;

    const onClick = props.onItemClick;
    const onDubleClick = props.onItemDoubleClick;
    const paddingPai = props.paddingPai || 0;

    return (
        <div className="item-body">
            <div className="item-list-pai">
                <div>
                    {
                        (treeItem.itemType === ComponentType.pasta) &&
                        <Folder
                            paddingLeft={paddingPai}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                            treeItem={treeItem}
                        />
                    }
                </div>
                <div>
                    {
                        (treeItem.itemType === ComponentType.localAction) &&
                        <Action
                            paddingLeft={paddingPai}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                            treeItem={treeItem}
                        />
                    }
                </div>
                <div>
                    {
                        (treeItem.itemType === ComponentType.localVariable) &&
                        <Variable
                            paddingLeft={paddingPai}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                            treeItem={treeItem}
                        />
                    }
                </div>
            </div>
            {
                treeItem.nodeExpanded === true
                    ? treeItem.itemChilds.map((tree: TreeInterface) => {
                        return <Tree treeItem={tree} onItemClick={onClick} onItemDoubleClick={onDubleClick} paddingPai={paddingPai + 15} />;
                    })
                    : undefined
            }
        </div>
    );
}

export default Tree;
