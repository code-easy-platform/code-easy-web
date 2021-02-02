import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { ConfigurationProvider, ItemsProvider } from './shared/contexts';
import { IFlowEditorProps } from './shared/interfaces';
import { FlowEditorBoard } from './FlowEditorBoard';

export const FlowEditor: React.FC<IFlowEditorProps> = ({ configs, items, ...rest }) => {
    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <ItemsProvider items={items}>
                    <FlowEditorBoard {...rest} />
                </ItemsProvider>
            </DndProvider>
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
