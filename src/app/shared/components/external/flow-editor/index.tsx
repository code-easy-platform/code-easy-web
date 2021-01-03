import React, { useEffect } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { observe, set } from 'react-observing';

import { ConfigurationProvider } from './shared/contexts';
import { IFlowEditorProps } from './shared/interfaces';
import { FlowEditorBoard } from './FlowEditorBoard';
import { FlowItemsState } from './shared/stores';
import { EFlowItemType } from './shared/enums';
import { useSizeByText } from './shared/hooks';

export const FlowEditor: React.FC<IFlowEditorProps> = ({ configs, items, ...rest }) => {
    const getSizeByText = useSizeByText();

    useEffect(() => {
        set(FlowItemsState, items.map(item => {
            if (item.flowItemType.value !== EFlowItemType.comment) {
                return item;
            }

            const commentSizes = getSizeByText(item.description.value || '');
            return {
                ...item,
                height: observe(commentSizes.height),
                width: observe(commentSizes.width),
            };
        }))
    }, [getSizeByText, items]);

    return (
        <ConfigurationProvider configs={configs}>
            <DndProvider backend={HTML5Backend}>
                <FlowEditorBoard {...rest} />
            </DndProvider>
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
