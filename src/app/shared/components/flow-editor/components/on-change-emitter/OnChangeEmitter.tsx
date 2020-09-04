import React, { useRef, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { GetFlowItemsSelector } from '../../shared/stores';
import { IFlowItem } from '../../shared/interfaces';
import { OnChangeService } from './OnChangeService';

export const OnChangeEmitter: React.FC<{ onChange?(items: IFlowItem[]): void }> = ({ onChange }) => {

    /** Help in onChange */
    const backupItems = useRef('');

    const handleOnChangeEmitter = useRecoilCallback(({ snapshot }) => () => {
        snapshot
            .getPromise(GetFlowItemsSelector)
            .then(items => {
                const stringfiedItems = JSON.stringify(items);

                if (onChange && (stringfiedItems !== backupItems.current)) {

                    backupItems.current = stringfiedItems;
                    onChange(items);
                }
            });
    });

    useEffect(() => {
        const listener = OnChangeService.observe().subscribe(handleOnChangeEmitter);
        return () => listener.unsubscribe();
    }, [handleOnChangeEmitter]);

    return null;
}
