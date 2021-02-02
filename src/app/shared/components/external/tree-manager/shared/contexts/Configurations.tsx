import React, { createContext, useState, useEffect, useCallback } from 'react';

import { ITreeManagerConfigs } from '../interfaces';

interface IConfigurationContextData {
    configs: ITreeManagerConfigs
}
export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: ITreeManagerConfigs }> = ({ children, configs }) => {

    /** Default values from configs */

    // GENERAL
    configs.showEmptyMessage = configs.showEmptyMessage || false;
    configs.leftPadding = configs.leftPadding || 16;

    const setCSSVars = useCallback(() => {
        document.documentElement.style.setProperty('--selected-item-color', `${configs.activeItemBackgroundColor || '#1f724320'}`);
        document.documentElement.style.setProperty('--focused-item-color', `${configs.focusedItemBackgroundColor || '#1f724320'}`);
        document.documentElement.style.setProperty('--editing-item-color', `${configs.editingItemBackgroundColor || '#1f724340'}`);
        document.documentElement.style.setProperty('--warning-item-text-color', `${configs.warningTextColor || 'yellow'}`);
        document.documentElement.style.setProperty('--error-item-text-color', `${configs.errorTextColor || 'red'}`);
    }, [configs]);


    const [state, setState] = useState<IConfigurationContextData>({ configs });
    useEffect(() => {
        setState({ configs });
        setCSSVars();
    }, [configs, setCSSVars]);

    return (
        <ConfigurationContext.Provider value={state} >
            {children}
        </ConfigurationContext.Provider>
    );
};
