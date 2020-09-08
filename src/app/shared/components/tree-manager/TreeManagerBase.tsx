import React, { useCallback } from 'react';

import { ITreeManagerProps, ITreeManagerEvents } from './shared/interfaces';
import { useConfigs, useItems } from './shared/hooks';
import { EmptyFeedback, Tree } from './components';
import './TreeManagerBase.css';

interface TreeManagerBaseProps extends Omit<ITreeManagerProps, 'items'>, Omit<ITreeManagerEvents, 'onChangeItems'> {

}
export const TreeManagerBase: React.FC<TreeManagerBaseProps> = ({ childrenWhenEmpty, onFocus, onContextMenu, onKeyDown }) => {
    const { showEmptyMessage } = useConfigs();
    const { baseItems } = useItems();

    const handleContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onContextMenu && onContextMenu(undefined, e);
    }, [onContextMenu]);

    return (
        <div
            tabIndex={0}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={"tree-base"}
            onContextMenu={handleContextMenu}
        >
            {baseItems.length > 0 && baseItems.map((item, index) => (
                <Tree
                    key={index}
                    item={item}
                    onContextMenu={onContextMenu}
                />
            ))}
            <EmptyFeedback
                children={childrenWhenEmpty}
                onContextMenu={handleContextMenu}
                show={!!((childrenWhenEmpty && baseItems.length === 0) || showEmptyMessage)}
            />
        </div>
    );
}
