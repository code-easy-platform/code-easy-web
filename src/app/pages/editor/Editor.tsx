import React from 'react';
import ToolBar from './shared/components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './shared/components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from '../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { Status, StatusBar } from './tabs/editor-tab/enuns/TypeOfStatus';
import { Project, Tab, Component } from '../../shared/interfaces/Aplication';
import { Storage } from '../../shared/services/LocalStorage';
import { ComponentType } from '../../shared/enuns/ComponentType';
import { TreeInterface } from '../../shared/components/tree/TreeInterface';

export default class Editor extends React.Component {

    public state = {
        statusBar: Status.OUTRO_STATUS,
        project: Storage.getProject(),
        currentTab: <EditorTab />,
        editingTab: ComponentType.tabRouters,

        addComponent: (tabIndex: number, component: Component) => this.addComponent(tabIndex, component),
        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeProjectState: (project: Project) => this.changeProjectState(project),
        toggleResourcesTab: (tab: Tab) => this.setState({ editingTab: tab.configs.type }),
        changeComponentState: (id: number, tabIndex: number, component: Component) => this.changeComponentState(id, tabIndex, component),
        
        getCurrentTabSelected: () => this.getCurrentTabSelected(),
        getIndexCurrentTabSelected: () => this.getIndexCurrentTabSelected(),
        getComponents: (filters: { typeComponent: ComponentType[] }) => this.getComponents(filters),
        getCurrentTabTree: () => this.getCurrentTabTree(),
    };

    private getCurrentTabTree(): TreeInterface {
        const currTab: Tab = this.getCurrentTabSelected();
        let tree: TreeInterface = {itemChilds:[], itemId: 0, itemLabel: "TestandoArvore", itemType: ComponentType.localAction, nodeExpanded: false};


        return tree;
    }

    // Pega todos os itens para a arvore de uma Tab.
    private getComponents(filters: { typeComponent: ComponentType[] }): Component[] {
        return this.getCurrentTabSelected().itens.filter(
            (c: Component) => filters.typeComponent.find(
                (componentType: ComponentType) => componentType === c.configs.type
            )
        );
    }

    private getIndexCurrentTabSelected(): number {
        const tabIndex: number = this.state.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
        return tabIndex > 0 ? tabIndex : 0;
    }

    private getCurrentTabSelected(): Tab {
        const tabIndex: number = this.state.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
        return tabIndex > 0 ? this.state.project.tabs[tabIndex] : this.state.project.tabs[0];
    }

    private changeProjectState(project: Project) {
        this.setState(project)
        Storage.setProject(project);
    }

    private changeComponentState(id: number, tabIndex: number, component: Component) {
        let projectUpdate = this.state.project;

        const componentIndex = projectUpdate.tabs[tabIndex].itens.findIndex((item: Component) => item.id === id); // Descrobre o index do component na lista.

        projectUpdate.tabs[tabIndex].itens[componentIndex] = component; // Atualiza o componente

        this.changeProjectState(projectUpdate);
    }

    private addComponent(tabIndex: number, component: Component) {
        let projectUpdate = this.state.project;

        projectUpdate.tabs[tabIndex].itens.push(component); // Adiciona o componente

        this.setState({ project: projectUpdate });
    }

    private changeCurrentTab = (tab: String) => {
        if (tab === CurrentTab.editor) {
            this.setState({ currentTab: <EditorTab /> });
        } else if (tab === CurrentTab.plugins) {
            this.setState({ currentTab: <PluginsTab /> });
        } else if (tab === CurrentTab.properties) {
            this.setState({ currentTab: <PropertiesTab /> });
        }
    }

    render() {
        return (
            <CodeEditorContext.Provider value={this.state}>
                <div className="main-page">
                    <ToolBar changeCurrentTab={this.changeCurrentTab} />

                    <div style={{ flex: 1 }}>
                        {this.state.currentTab}
                    </div>

                    <BottonStatusBar />
                </div>
            </CodeEditorContext.Provider>
        );
    }
}
