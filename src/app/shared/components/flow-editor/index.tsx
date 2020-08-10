import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { ConfigurationProvider } from './shared/contexts/Configurations';
import { RecoilContainer } from './shared/stores/RecoilContainer';
import { FlowEditorBoard } from './FlowEditorBoard';

export const FlowEditor = ({ configs, items, ...rest }: IFlowEditorProps) => {
    return (
        <ConfigurationProvider configs={configs}>
            <RecoilContainer items={items}>
                <DndProvider backend={HTML5Backend}>
                    <FlowEditorBoard {...rest} />
                </DndProvider>
            </RecoilContainer >
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
