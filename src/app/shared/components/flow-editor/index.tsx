import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { IFlowEditorProps } from './shared/interfaces/FlowEditorInterfaces';
import { OnChangeEmitter } from './components/on-change-emitter';
import { ConfigurationProvider } from './shared/contexts';
import { FlowEditorBoard } from './FlowEditorBoard';
import { RecoilContainer } from './shared/stores';

export const FlowEditor = ({ configs, items, onChangeItems, ...rest }: IFlowEditorProps) => {
    return (
        <ConfigurationProvider configs={configs}>
            <RecoilContainer items={items}>
                <DndProvider backend={HTML5Backend}>
                    <OnChangeEmitter onChange={onChangeItems} />
                    <FlowEditorBoard {...rest} />
                </DndProvider>
            </RecoilContainer>
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
