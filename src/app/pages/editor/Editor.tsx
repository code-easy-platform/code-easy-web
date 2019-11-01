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
        changeComponentState: (id:  number, tabIndex: number, component: Component) => this.changeComponentState(id, tabIndex, component),
    };

    private changeProjectState(project: Project) {
        this.setState(project)
        Storage.setProject(project);
    }

    private changeComponentState(id:  number, tabIndex: number, component: Component) {
        let projectUpdate = this.state.project;

        const componentIndex = projectUpdate.tabs[tabIndex].itens.findIndex((item: Component) => item.key === id); // Descrobre o index do component na lista.

        projectUpdate.tabs[tabIndex].itens[componentIndex] = component; // Atualiza o componente

        this.setState({ project: projectUpdate });
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
