import React, { createContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { ITreeManagerConfigs } from '../interfaces';

interface IConfigurationContextData {
    configs: ITreeManagerConfigs
}
export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: ITreeManagerConfigs }> = ({ children, configs }) => {

    /** Default values from configs */

    // GENERAL
    configs.showEmptyMessage = configs.showEmptyMessage || false;
    configs.id = configs.id || 'generated-tree-id_' + uuid();
    configs.leftPadding = configs.leftPadding || 8;

    const setCSSVars = useCallback(() => {
        document.documentElement.style.setProperty('--selected-item-color', `${configs.activeItemBackgroundColor || '#ffffff10'}`);
        document.documentElement.style.setProperty('--hovered-item-color', `${configs.hoveredItemBackgroundColor || '#ffffff10'}`);
        document.documentElement.style.setProperty('--editing-item-color', `${configs.editingItemBackgroundColor || '#ffffff15'}`);
        /*  */
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
