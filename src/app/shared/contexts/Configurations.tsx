import React, { createContext, useState, useCallback, useContext } from 'react';

import { IdeConfigStorage } from '../services/storage/IdeConfigStorage';
import { IConfigurations } from "../interfaces/IConfigurations";

interface IConfigurationContextData {
    configs: IConfigurations;
    setConfigs(configs: Partial<IConfigurations>): void
}
export const IdeConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const IdeConfigurationProvider: React.FC = ({ children }) => {

    const handleSetConfigs = useCallback((configs: Partial<IConfigurations>) => {
        setState(oldState => {
            const newState = {
                ...oldState,
                configs: {
                    ...oldState.configs,
                    ...configs,
                },
            }

            IdeConfigStorage.setConfigs(newState.configs);

            return newState;
        });
    }, []);

    const [state, setState] = useState<IConfigurationContextData>({
        configs: IdeConfigStorage.getConfigs(),
        setConfigs: handleSetConfigs
    });

    return (
        <IdeConfigurationContext.Provider value={state}>
            {children}
        </IdeConfigurationContext.Provider >
    );
}

/**
 * Change general platform settings
 */
export const useIdeConfigs = () => {
    const context = useContext(IdeConfigurationContext);
    return {
        ...context.configs,
        setConfigs: context.setConfigs,
        ideVersion: process.env.REACT_APP_VERSION,
    };
}
