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
                {
                    (treeItem.itemType === ComponentType.pasta) &&
                    <div style={{ flex: 1 }}>
                        <Folder
                            allowDrag={true}
                            treeItem={treeItem}
                            paddingLeft={paddingPai}
                            outputPosition={() => { }}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                        />
                    </div>
                }
                {
                    (treeItem.itemType === ComponentType.localAction) &&
                    <div style={{ flex: 1 }}>
                        <Action
                            allowDrag={true}
                            paddingLeft={paddingPai}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                            treeItem={treeItem}
                        />
                    </div>
                }
                {
                    (treeItem.itemType === ComponentType.localVariable) &&
                    <div style={{ flex: 1 }}>
                        <Variable
                            allowDrag={true}
                            paddingLeft={paddingPai}
                            onClick={() => onClick(treeItem.itemId)}
                            onDoubleClick={() => onDubleClick(treeItem.itemId)}
                            treeItem={treeItem}
                        />
                    </div>
                }
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
