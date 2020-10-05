import React, { createContext, useState, useEffect } from 'react';

import { IFlowEditorConfigs } from '../interfaces';

interface IConfigurationContextData {
    configs: IFlowEditorConfigs
}
export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IFlowEditorConfigs }> = ({ children, configs }) => {

    /** Default values from configs */

    // GENERAL
    configs.typesAllowedToDrop = configs.typesAllowedToDrop !== undefined ? configs.typesAllowedToDrop : [];
    configs.backgroundColor = configs.backgroundColor !== undefined ? configs.backgroundColor : '#171717';
    configs.disableSelection = configs.disableSelection !== undefined ? configs.disableSelection : false;
    configs.backgroundType = configs.backgroundType !== undefined ? configs.backgroundType : 'dotted';
    configs.elevationColor = configs.elevationColor !== undefined ? configs.elevationColor : 'black';
    configs.useElevation = configs.useElevation !== undefined ? configs.useElevation : false;
    configs.dotColor = configs.dotColor !== undefined ? configs.dotColor : '#484848';
    configs.dottedSize = configs.dottedSize !== undefined ? configs.dottedSize : 15;

    // BREADCRUMBS
    configs.breadcrumbBackgroundColor = configs.breadcrumbBackgroundColor !== undefined ? configs.breadcrumbBackgroundColor : '#232323';
    configs.breadcrumbBorderColor = configs.breadcrumbBorderColor !== undefined ? configs.breadcrumbBorderColor : 'black';
    configs.breadcrumbTextColor = configs.breadcrumbTextColor !== undefined ? configs.breadcrumbTextColor : 'white';

    // TOOLBAR
    configs.toolbarBackgroundColor = configs.toolbarBackgroundColor !== undefined ? configs.toolbarBackgroundColor : '#232323';
    configs.toolbarBorderColor = configs.toolbarBorderColor !== undefined ? configs.toolbarBorderColor : '#000';
    configs.toolbarItemWidth = configs.toolbarItemWidth !== undefined ? configs.toolbarItemWidth : 30;
    configs.showToolbar = configs.showToolbar !== undefined ? configs.showToolbar : true;

    // SELECION
    configs.selectionBackgroundColor = configs.selectionBackgroundColor !== undefined ? configs.selectionBackgroundColor : '#007bff1c';
    configs.selectionBorderColor = configs.selectionBorderColor !== undefined ? configs.selectionBorderColor : 'blue';
    configs.selectionBorderType = configs.selectionBorderType !== undefined ? configs.selectionBorderType : 'normal';
    configs.selectionBorderWidth = configs.selectionBorderWidth !== undefined ? configs.selectionBorderWidth : 1;

    // FLOW ITEMS
    configs.flowItemSelectedColor = configs.flowItemSelectedColor !== undefined ? configs.flowItemSelectedColor : 'blue';
    configs.flowItemWarningColor = configs.flowItemWarningColor !== undefined ? configs.flowItemWarningColor : 'yellow';
    configs.snapGridWhileDragging = configs.snapGridWhileDragging !== undefined ? configs.snapGridWhileDragging : true;
    configs.flowItemErrorColor = configs.flowItemErrorColor !== undefined ? configs.flowItemErrorColor : 'red';
    configs.flowItemTextColor = configs.flowItemTextColor !== undefined ? configs.flowItemTextColor : 'white';
    configs.commentTextColor = configs.commentTextColor !== undefined ? configs.commentTextColor : 'white';
    configs.disableOpacity = configs.disableOpacity !== undefined ? configs.disableOpacity : 0.5;
    configs.commentColor = configs.commentColor !== undefined ? configs.commentColor : 'green';
    configs.linesColor = configs.linesColor !== undefined ? configs.linesColor : 'gray';
    configs.lineWidth = configs.lineWidth !== undefined ? configs.lineWidth : 1;

    const [state, setState] = useState<IConfigurationContextData>({ configs });
    useEffect(() => {
        setState({ configs });
    }, [configs]);

    return (
        <ConfigurationContext.Provider value={state}>
            {children}
        </ConfigurationContext.Provider>
    );
};
