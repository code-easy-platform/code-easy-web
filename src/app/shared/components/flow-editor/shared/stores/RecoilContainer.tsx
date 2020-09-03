import React from 'react';
import { RecoilRoot } from 'recoil';

import { InitializeState } from './RecoilInitializeState';
import { IFlowItem } from '../interfaces';

interface RecoilContainerProps {
    items: IFlowItem[];
}
export const RecoilContainer: React.FC<RecoilContainerProps> = ({ items, children }) => {
    return (
        <RecoilRoot>
            <InitializeState items={items} />
            {children}
        </RecoilRoot>
    );
}
