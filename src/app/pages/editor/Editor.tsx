import React from 'react';
import ToolBar from './shared/components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './shared/components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from '../../shared/services/contexts/CodeEditorContext';
import { Status, StatusBar } from './tabs/editor-tab/enuns/TypeOfStatus';
import { Project, Tab, Component, ComponentConfigs } from '../../shared/interfaces/Aplication';
import { Storage } from '../../shared/services/LocalStorage';
import { ComponentType } from '../../shared/enuns/ComponentType';
import { TreeInterface } from '../../shared/components/tree/TreeInterface';
import { Utils } from '../../shared/services/Utils';
import FluxoComponentTypes from './tabs/editor-tab/components/code-editor/enuns/FluxoList';

export default class Editor extends React.Component {

    public state = {
        statusBar: Status.OUTRO_STATUS,
        project: Storage.getProject(),
        currentTab: <EditorTab />,
        editingTab: ComponentType.tabRouters,

        addComponent: (itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): Component =>
            this.addComponent(itemPaiId, itemName, itemType, width, height, top, left),

        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeProjectState: (project: Project) => this.changeProjectState(project),
        toggleResourcesTab: (tab: Tab) => this.setState({ editingTab: tab.configs.type }),
        removeComponentById: (componentId: number) => this.removeComponentById(componentId),
        changeComponentState: (id: number, tabIndex: number, component: Component) => this.changeComponentState(id, tabIndex, component),

        getCurrentTabSelected: () => this.getCurrentTabSelected(),
        getIndexCurrentTabSelected: () => this.getIndexCurrentTabSelected(),
        getCurrentTabComponents: (filters: { typeComponent: ComponentType[] }) => this.getCurrentTabComponents(filters),
        getCurrentTabTree: () => this.getCurrentTabTree(),
        getComponentById: (componentId: number): any => this.getComponentById(componentId),
    };

    private removeComponentById(componentId: number) {
        const tabIndex: number = this.getIndexCurrentTabSelected();
        let projectUpdate = this.state.project;

        const componentIndex = projectUpdate.tabs[tabIndex].itens.findIndex((item: Component) => item.id === componentId); // Descrobre o index do component na lista.

        projectUpdate.tabs[tabIndex].itens.splice(componentIndex, 1); // Remove o componente.

        this.changeProjectState(projectUpdate);
    }

    private getComponentById(componentId: number): Component {
        return this.getCurrentTabSelected().itens.filter((c: Component) => c.id === componentId)[0];
    }

    private carregaFilhos(tree: TreeInterface): TreeInterface[] {
        const currTab: Tab = this.getCurrentTabSelected();

        currTab.itens.filter((comp) => {
            return comp.paiId === tree.itemId && comp.configs.type !== ComponentType.flowItem
        }).forEach(comp => {
            tree.itemChilds.push({ itemChilds: [], itemId: comp.id, itemLabel: comp.configs.name, itemType: comp.configs.type, nodeExpanded: comp.configs.isExpanded || false });
        });


        tree.itemChilds.forEach((itemTree: TreeInterface) => {
            itemTree.itemChilds = this.carregaFilhos(itemTree);
        });

        return tree.itemChilds;
    }

    private getCurrentTabTree(): TreeInterface[] {
        const currTab: Tab = this.getCurrentTabSelected();
        let tree: TreeInterface[] = [];

        currTab.itens.filter((comp) => {
            return comp.paiId === 0
        }).forEach(comp => {
            tree.push({ itemChilds: [], itemId: comp.id, itemLabel: comp.configs.name, itemType: comp.configs.type, nodeExpanded: comp.configs.isExpanded || false });
        });

        tree.forEach((itemTree: TreeInterface) => {
            itemTree.itemChilds = this.carregaFilhos(itemTree);
        });

        return tree;
    }

    // Pega todos os itens para a arvore de uma Tab.
    private getCurrentTabComponents(filters: { typeComponent: ComponentType[] }): Component[] {
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

    private addComponent(itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): Component {
        let projectUpdate = this.state.project;

        let newId: number;
        let isExistentItem;

        // Vai encontrar uma id que não estaja em uso.
        do {
            newId = Utils.getRandomId(10, 1000);
            // eslint-disable-next-line
            isExistentItem = this.getCurrentTabSelected().itens.findIndex((item: Component) => { if (item.id === newId) return item; else return undefined; });
        } while (isExistentItem >= 0);

        const newComponent: Component = new Component({
            id: newId,
            title: "",
            paiId: itemPaiId,
            configs: new ComponentConfigs({
                name: itemName,
                description: "",
                type: itemType,
                isEditando: false,
                isExpanded: false,
            }),
            width: width || 0,
            height: height || 0,
            top: top || 0,
            left: left || 0,
            fluxoItemTypes: FluxoComponentTypes.flowItem,
            isHaveAntecessor: false,
            isHaveSucessor: false,
            antecessorId: 0,
            sucessorId: 0,
        });

        projectUpdate.tabs[this.getIndexCurrentTabSelected()].itens.push(newComponent); // Adiciona o componente

        this.changeProjectState(projectUpdate);

        return newComponent;
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
