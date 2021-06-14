import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { ITreeManagerConfigs, ITreeManagerEvents, ITreeManagerProps } from './shared/interfaces';
import { ConfigurationProvider, ItemsProvider } from './shared/contexts';
import { TreeManagerBase } from './TreeManagerBase';

interface TreeManagerProps extends ITreeManagerProps, ITreeManagerEvents {
    configs: ITreeManagerConfigs;
}
export const TreeManager: React.FC<TreeManagerProps> = ({ configs, items, ...rest }) => {
    return (
        <ConfigurationProvider configs={configs}>
            <ItemsProvider items={items}>
                <DndProvider backend={HTML5Backend}>
                    <TreeManagerBase {...rest} />
                </DndProvider>
            </ItemsProvider>
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces/ITreeItem';
