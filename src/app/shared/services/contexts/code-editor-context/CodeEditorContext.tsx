import React from 'react';
import Status, { StatusBar } from '../../../../pages/editor/tabs/editor-tab/enuns/TypeOfStatus';
import {  Project, Tab, ComponentConfigs } from '../../../interfaces/Aplication';
import ProjectType from '../../../enuns/ProjectType';
import ComponentType from '../../../enuns/ComponentType';

const DEFAULT_PROJECT = new Project({
    projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
    tabs: [
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Routers", type: ComponentType.tabRouters, isExpanded: false, description: "Routers" }) }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Actions", type: ComponentType.tabActions, isExpanded: false, description: "Actions" }) }),
        new Tab({ itens: [], configs: new ComponentConfigs({ name: "Dates",   type: ComponentType.tabDates, isExpanded: false, description: "Dates"   }) }),
    ],
});

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    project: DEFAULT_PROJECT,

    toggleStatusbar: (statusBar: StatusBar) => { },
    changeProjectState: (project: Project) => { },
    changeComponentState: () => { },
});

export default CodeEditorContext;
