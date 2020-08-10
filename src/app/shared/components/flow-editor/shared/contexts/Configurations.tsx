import React, { createContext, useState, useEffect } from 'react';

import { IFlowEditorConfigs } from '../interfaces';

interface IConfigurationContextData {
    configs: IFlowEditorConfigs
}
export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IFlowEditorConfigs }> = ({ children, configs }) => {

    /** Default values from configs */

    // GENERAL
    configs.typesAllowedToDrop = configs.typesAllowedToDrop ? configs.typesAllowedToDrop : [];
    configs.backgroundColor = configs.backgroundColor ? configs.backgroundColor : '#171717';
    configs.disableSelection = configs.disableSelection ? configs.disableSelection : false;
    configs.backgroundType = configs.backgroundType ? configs.backgroundType : 'dotted';
    configs.elevationColor = configs.elevationColor ? configs.elevationColor : 'black';
    configs.useElevation = configs.useElevation ? configs.useElevation : false;
    configs.showToolbar = configs.showToolbar ? configs.showToolbar : true;
    configs.dotColor = configs.dotColor ? configs.dotColor : '#484848';
    configs.dottedSize = configs.dottedSize ? configs.dottedSize : 15;

    // BREADCRUMBS
    configs.breadcrumbBackgroundColor = configs.breadcrumbBackgroundColor ? configs.breadcrumbBackgroundColor : '#232323';
    configs.breadcrumbBorderColor = configs.breadcrumbBorderColor ? configs.breadcrumbBorderColor : 'black';
    configs.breadcrumbTextColor = configs.breadcrumbTextColor ? configs.breadcrumbTextColor : 'white';

    // TOOLBAR
    configs.toolbarBackgroundColor = configs.toolbarBackgroundColor ? configs.toolbarBackgroundColor : '#232323';
    configs.toolbarBorderColor = configs.toolbarBorderColor ? configs.toolbarBorderColor : '#000';
    configs.toolbarItemWidth = configs.toolbarItemWidth ? configs.toolbarItemWidth : 30;

    // SELECION
    configs.selectionBackgroundColor = configs.selectionBackgroundColor ? configs.selectionBackgroundColor : '#007bff1c';
    configs.selectionBorderColor = configs.selectionBorderColor ? configs.selectionBorderColor : 'blue';
    configs.selectionBorderType = configs.selectionBorderType ? configs.selectionBorderType : 'normal';
    configs.selectionBorderWidth = configs.selectionBorderWidth ? configs.selectionBorderWidth : 1;

    // FLOW ITEMS
    configs.flowItemSelectedColor = configs.flowItemSelectedColor ? configs.flowItemSelectedColor : 'blue';
    configs.flowItemWarningColor = configs.flowItemWarningColor ? configs.flowItemWarningColor : 'yellow';
    configs.snapGridWhileDragging = configs.snapGridWhileDragging ? configs.snapGridWhileDragging : true;
    configs.flowItemErrorColor = configs.flowItemErrorColor ? configs.flowItemErrorColor : 'red';
    configs.flowItemTextColor = configs.flowItemTextColor ? configs.flowItemTextColor : 'white';
    configs.commentTextColor = configs.commentTextColor ? configs.commentTextColor : 'white';
    configs.disableOpacity = configs.disableOpacity ? configs.disableOpacity : 0.5;
    configs.commentColor = configs.commentColor ? configs.commentColor : 'green';
    configs.linesColor = configs.linesColor ? configs.linesColor : 'gray';
    configs.lineWidth = configs.lineWidth ? configs.lineWidth : 1;

    const [state, setState] = useState<IConfigurationContextData>({ configs });
    useEffect(() => {
        setState({ configs });
    }, [configs]);

    return (
        <ConfigurationContext.Provider value={state} >
            {children}
        </ConfigurationContext.Provider>
    );
};
