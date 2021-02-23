import React from 'react';
import { useObserverValue } from 'react-observing';

import { LoadingIndicator } from '../loading-indicator/LoadingIndicator';
import { BottonStatusBarStore } from '../../stores';
import { IdeVersion } from '../version/IdeVersion';
import './BottonStatusBar.css';

export const BottonStatusBar: React.FC = () => {
    const { type, message, color, messageLong } = useObserverValue(BottonStatusBarStore);

    return (
        <div style={{ backgroundColor: color }} className="status-bar-main width-auto z1 padding-sx padding-left-s padding-right-s display-flex flex-items-center background-bars">
            {type === 'loading' && <LoadingIndicator />}
            <div className="flex1 margin-left-s flex-items-center" title={messageLong}>
                {message}
            </div>
            <IdeVersion prefix={"v. "} />
        </div>
    );
}
