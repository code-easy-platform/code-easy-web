import React from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FlowItemStore, FlowItemsStore, FlowLinesStore } from './';
import { ILine, IFlowItem } from './../interfaces';
import { useSizeByText } from '../hooks';
import { EFlowItemType } from '../enums';

interface RecoilContainerProps {
    items: IFlowItem[];
}
export const RecoilContainer: React.FC<RecoilContainerProps> = ({ items, children }) => {
    const getSizeByText = useSizeByText();

    const handleInitializaState = ({ set }: MutableSnapshot) => {
        let lines: ILine[] = [];

        // Set items ids
        set(FlowItemsStore, items.map(item => String(item.id)));

        // Set items content
        items.forEach(item => {
            if (item.id) {
                const isComment = item.flowItemType === EFlowItemType.comment;
                set(FlowItemStore(item.id), {
                    ...item,
                    ...(
                        isComment
                            ? getSizeByText(item.description || '')
                            : {}
                    )
                });
                (item.connections || []).forEach(({ id, originId, targetId }) => {
                    if (id) {
                        lines.push({ id, originId, targetId });
                    }
                });
            }
        });

        set(FlowLinesStore, lines);
    }

    return (
        <RecoilRoot initializeState={handleInitializaState}>
            {children}
        </RecoilRoot>
    );
}
