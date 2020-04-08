import React from 'react';

import { Project, Tab, ItemComponent } from '../../interfaces/Aplication';
import { ComponentType } from '../../enuns/ComponentType';

export const CodeEditorContext = React.createContext({
    editingTab: ComponentType.tabRouters,

    toggleResourcesTab: (tab: Tab) => { },
    changeProjectState: (project: Project) => { },
    addComponent: (itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): any => { },
    removeComponentById: (componentId: number): any => { },
    /**
     * @param id Identificador do componente que esta sendo alterado.
     * @param tabIndex Aba que pode ser do tipo "Routers", "Actions" ou "Data".
     * @param component Componente com suas devidas alterações, para que seja salvo no storage.
     */
    changeComponentState: (id: number, component: ItemComponent) => { },

    // Funcões axuliares.
    getCurrentTabSelected: (): any => { },
    getIndexCurrentTabSelected: (): any => { },
    getCurrentTabComponents: (filters: { typeComponent: ComponentType[] }): any => { },
    getCurrentTabTree: (): any => { },
    getComponentById: (componentId: number): any => { },
});
