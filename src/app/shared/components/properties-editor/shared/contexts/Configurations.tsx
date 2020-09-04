import React, { createContext, useState, useEffect, useContext } from 'react';

import { IPropertiesEditorConfigurations } from './../interfaces/';

interface IInternalConfigs extends IPropertiesEditorConfigurations {
    inputBorderWarning?: string;
    inputBorderDefault?: string;
    inputTextWarning?: string;
    inputTextDefault?: string;
    inputBorderError?: string;
    inputTextError?: string;
}

interface IConfigurationContextData {
    configs: IInternalConfigs;
}

export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IPropertiesEditorConfigurations }> = ({ children, configs }) => {

    const [state, setState] = useState<IConfigurationContextData>({
        configs: {

            // GENERAL
            errorColor: configs?.errorColor || 'red',
            warningColor: configs?.warningColor || 'yellow',
            textDefaultColor: configs?.textDefaultColor || 'white',
            borderDefaultColor: configs?.borderDefaultColor || '#3c3c3c',
            
            // Inputs
            inputTextDefault: undefined,
            inputBorderError: `thin solid  ${configs?.errorColor || 'red'}`,
            inputTextError: `underline wavy ${configs?.errorColor || 'red'}`,
            inputBorderWarning: `thin solid  ${configs?.warningColor || 'yellow'}`,
            inputTextWarning: `underline wavy ${configs?.warningColor || 'yellow'}`,
            inputBorderDefault: `thin solid  ${configs?.borderDefaultColor || '#3c3c3c'}`,
        }
    });
    useEffect(() => {
        setState({
            configs: {

                // GENERAL
                errorColor: configs?.errorColor || 'red',
                warningColor: configs?.warningColor || 'yellow',
                textDefaultColor: configs?.textDefaultColor || 'white',
                borderDefaultColor: configs?.borderDefaultColor || '#3c3c3c',
                
                // Inputs
                inputTextDefault: undefined,
                inputBorderError: `thin solid  ${configs?.errorColor || 'red'}`,
                inputTextError: `underline wavy ${configs?.errorColor || 'red'}`,
                inputBorderWarning: `thin solid  ${configs?.warningColor || 'yellow'}`,
                inputTextWarning: `underline wavy ${configs?.warningColor || 'yellow'}`,
                inputBorderDefault: `thin solid  ${configs?.borderDefaultColor || '#3c3c3c'}`,
            }
        });
    }, [configs]);

    return (
        <ConfigurationContext.Provider value={state}>
            {children}
        </ConfigurationContext.Provider>
    );
};

export const useConfigs = () => useContext(ConfigurationContext).configs;
