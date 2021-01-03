import React, { useEffect } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { set } from 'react-observing';

import { ITreeManagerConfigs, ITreeManagerEvents, ITreeManagerProps } from './shared/interfaces';
import { ConfigurationProvider } from './shared/contexts';
import { TreeManagerBase } from './TreeManagerBase';
import { TreeItemsStore } from './shared/stores';

interface TreeManagerProps extends ITreeManagerProps, ITreeManagerEvents {
    configs: ITreeManagerConfigs;
}
export const TreeManager: React.FC<TreeManagerProps> = ({ configs, items, onChangeItems, ...rest }) => {
    useEffect(() => {
        set(TreeItemsStore, items);
    }, [items]);

    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <TreeManagerBase {...rest} />
            </DndProvider>
        </ConfigurationProvider>
    );
}

export { CustomDragLayer } from './components';
export * from './shared/interfaces/ITreeItem';
