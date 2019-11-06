import React from 'react';
import Status, { StatusBar } from '../../../pages/editor/tabs/editor-tab/enuns/TypeOfStatus';
import {  Project, Tab, Component } from '../../interfaces/Aplication';
import ComponentType from '../../enuns/ComponentType';
import { DEFAULT_PROJECT } from '../LocalStorage';

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    project: DEFAULT_PROJECT,
    editingTab: ComponentType.tabRouters,

    toggleResourcesTab: (tab: Tab) => { },
    changeProjectState: (project: Project) => { },
    toggleStatusbar: (statusBar: StatusBar) => { },
    addComponent: (itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): any => {},
    /**
     * @param id Identificador do componente que esta sendo alterado.
     * @param tabIndex Aba que pode ser do tipo "Routers", "Actions" ou "Data".
     * @param component Componente com suas devidas alterações, para que seja salvo no storage.
     */
    changeComponentState: (id:  number, tabIndex: number, component: Component) => { },

    // Funcões axuliares.
    getCurrentTabSelected: (): any => {},
    getIndexCurrentTabSelected: (): any => {},
    getCurrentTabComponents: (filters: { typeComponent: ComponentType[] }): any => {},
    getCurrentTabTree: (): any => {},
    getComponentById: (componentId: number): any => {},
});

export default CodeEditorContext;
