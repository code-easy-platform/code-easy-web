import React, { useEffect, memo } from 'react';
import { useRecoilValue } from 'recoil';

import { GetFlowItemsSelector } from '../../shared/stores';
import { IFlowItem } from '../../shared/interfaces';

interface OnChangeEmitterProps {
    onChange?(items: IFlowItem[]): void;
}
const OnChangeEmitter: React.FC<OnChangeEmitterProps> = ({ onChange }) => {
    const items = useRecoilValue(GetFlowItemsSelector);

    useEffect(() => {
        onChange && onChange(items);
    }, [items, onChange]);

    return null;
}

export default memo(OnChangeEmitter);
