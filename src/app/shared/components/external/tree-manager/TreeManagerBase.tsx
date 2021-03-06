import React, { useCallback } from 'react';

import { ITreeManagerProps, ITreeManagerEvents } from './shared/interfaces';
import { useBaseItems, useConfigs } from './shared/hooks';
import { EmptyFeedback, OnEditListener, OnSelectListener, Tree } from './components';
import './TreeManagerBase.css';

interface TreeManagerBaseProps extends Omit<ITreeManagerProps, 'items'>, ITreeManagerEvents { }
export const TreeManagerBase: React.FC<TreeManagerBaseProps> = ({ childrenWhenEmpty, onFocus, onContextMenu, onKeyDown, onSelect, onEdit }) => {
    const { showEmptyMessage } = useConfigs();
    const baseItems = useBaseItems();

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
                <div key={index} className="tree-base-internal">
                    <Tree
                        item={item}
                        onContextMenu={onContextMenu}
                    />
                </div>
            ))}
            {!((childrenWhenEmpty && baseItems.length === 0) || showEmptyMessage) &&
                <div style={{ padding: 50 }} />
            }
            <OnEditListener onEdit={onEdit} />
            <OnSelectListener onSelect={onSelect} />
            <EmptyFeedback
                children={childrenWhenEmpty}
                onContextMenu={handleContextMenu}
                show={!!((childrenWhenEmpty && baseItems.length === 0) || showEmptyMessage)}
            />
        </div>
    );
}
