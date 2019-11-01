import React from 'react';
import Status, { StatusBar } from '../../../../pages/editor/tabs/editor-tab/enuns/TypeOfStatus';
import {  Project, Tab, Component } from '../../../interfaces/Aplication';
import ComponentType from '../../../enuns/ComponentType';
import { DEFAULT_PROJECT } from '../../LocalStorage';

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    project: DEFAULT_PROJECT,
    editingTab: ComponentType.tabRouters,

    toggleResourcesTab: (tab: Tab) => { },
    changeProjectState: (project: Project) => { },
    toggleStatusbar: (statusBar: StatusBar) => { },
    addComponent: (tabIndex: number, component: Component) => {},
    changeComponentState: (id:  number, tabIndex: number, component: Component) => { },
});

export default CodeEditorContext;
