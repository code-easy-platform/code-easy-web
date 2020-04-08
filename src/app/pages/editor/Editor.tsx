import React from 'react';

import { Project, Tab, ItemComponent } from '../../shared/interfaces/Aplication';
import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { CodeEditorContext } from '../../shared/services/contexts/CodeEditorContext';
import { ToolBar } from '../../shared/components/tool-bar/ToolBar';
import { ComponentType } from '../../shared/enuns/ComponentType';
import { Storage } from '../../shared/services/LocalStorage';
import PropertiesTab from './properties-tab/PropertiesTab';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import PluginsTab from './plugins-tab/PluginsTab';
import EditorTab from './editor-tab/EditorTab';
import './Editor.scss';


export default class Editor extends React.Component {

    public state = {
        project: Storage.getProject(),
        currentTab: <EditorTab />,
        editingTab: ComponentType.tabRouters,

        addComponent: (itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): ItemComponent =>
            this.addComponent(itemPaiId, itemName, itemType, width, height, top, left),

        changeProjectState: (project: Project) => this.changeProjectState(project),
        toggleResourcesTab: (tab: Tab) => this.setState({ editingTab: tab.configs.type }),
        removeComponentById: (componentId: number) => this.removeComponentById(componentId),
        changeComponentState: (id: number, component: ItemComponent) => this.changeComponentState(id, component),

        getCurrentTabSelected: () => this.getCurrentTabSelected(),
        getIndexCurrentTabSelected: () => this.getIndexCurrentTabSelected(),
        getCurrentTabComponents: (filters: { typeComponent: ComponentType[] }) => this.getCurrentTabComponents(filters),
        getCurrentTabTree: () => this.getCurrentTabTree(),
        getComponentById: (componentId: number): any => this.getComponentById(componentId),
    };

    /** @DEPRECATED Não usar até terminar de ajustar a reestruturação. */
    private removeComponentById(componentId: number) {
        /* const tabIndex: number = this.getIndexCurrentTabSelected();
        let projectUpdate = this.state.project;

        const componentIndex = projectUpdate.tabs[tabIndex].itens.findIndex((item: Component) => item.id === componentId); // Descrobre o index do component na lista.

        projectUpdate.tabs[tabIndex].itens.splice(componentIndex, 1); // Remove o componente.

        this.changeProjectState(projectUpdate); */
    }

    /** @DEPRECATED TODO: Não usar até terminar de ajustar a reestruturação. */
    private getComponentById(componentId: number | string /*TODO: string não estava aqui*/): ItemComponent {
        return this.getCurrentTabSelected().itens.filter((c: ItemComponent) => c.id === componentId)[0];
    }


    private getCurrentTabTree(): any[] {

        const carregaFilhos = (tree: any): any[] => {
            const currTab: Tab = this.getCurrentTabSelected();

            currTab.itens.filter((comp) => {
                return true; //comp.itemPaiId === tree.itemId && comp.type !== ComponentType.flowItem
            }).forEach(comp => {
                tree.itemChilds.push({ itemChilds: [], itemId: comp.id, itemLabel: comp.label, itemType: comp.type, nodeExpanded: comp.nodeExpanded || false });
            });


            tree.itemChilds.forEach((itemTree: any) => {
                itemTree.itemChilds = carregaFilhos(itemTree);
            });

            return tree.itemChilds;
        }

        const currTab: Tab = this.getCurrentTabSelected();
        let tree: any[] = [];

        currTab.itens.filter((comp) => {
            return comp.itemPaiId === '0'
        }).forEach(comp => {
            tree.push({ itemChilds: [], itemId: comp.id, itemLabel: comp.label, itemType: comp.type, nodeExpanded: comp.nodeExpanded || false });
        });

        tree.forEach((itemTree: any) => {
            itemTree.itemChilds = carregaFilhos(itemTree);
        });

        return tree;
    }

    // Pega todos os itens para a arvore de uma Tab.
    private getCurrentTabComponents(filters: { typeComponent: ComponentType[] }): ItemComponent[] {
        return this.getCurrentTabSelected().itens.filter(
            (c: ItemComponent) => filters.typeComponent.find(
                (componentType: ComponentType) => true // componentType === c.type
            )
        );
    }

    /** @DEPRECATED TODO: Não usar até terminar de ajustar a reestruturação. */
    private getIndexCurrentTabSelected(): number {
        /* const tabIndex: number = this.state.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
        return tabIndex > 0 ? tabIndex : 0; */
        return 0;
    }

    private getCurrentTabSelected(): any {
/*         const tabIndex: number = this.state.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
        return tabIndex > 0 ? this.state.project.tabs[tabIndex] : this.state.project.tabs[0];
 */    }

    private changeProjectState(project: Project) {
        this.setState(project)
        Storage.setProject(project);
    }

    /** @DEPRECATED - TODO: Remover */
    private changeComponentState(id: number, component: ItemComponent) {
        // const tabIndex: number = this.getIndexCurrentTabSelected();
        // let projectUpdate = this.state.project;

        // const componentIndex = projectUpdate.tabs[tabIndex].itens.findIndex((item: Component) => true); //item.id === id); // Descrobre o index do component na lista.

        // projectUpdate.tabs[tabIndex].itens[componentIndex] = component; // Atualiza o componente

        // this.changeProjectState(projectUpdate);
    }

    /** @DEPRECATED TODO: Não usar até terminar de ajustar a reestruturação. */
    private addComponent(itemPaiId: number, itemName: string, itemType: ComponentType, width?: number, height?: number, top?: number, left?: number): any {
        /* let projectUpdate = this.state.project;

        let newId: number;
        let isExistentItem;

        // Vai encontrar uma id que não estaja em uso.
        do {
            newId = Utils.getRandomId(10, 1000);
            // eslint-disable-next-line
            isExistentItem = this.getCurrentTabSelected().itens.findIndex((item: Component) => true // { if (item.id === newId) return item; else return undefined; });
        } while (isExistentItem >= 0);

        const newComponent: Component = new Component({
            id: newId.toString(),
            label: "",
            itemPaiId: itemPaiId.toString(),
            description: '',
            isEditing: false,
            isSelected: false,
            itens: [],
            nodeExpanded: true,
            type: TreeItensTypes.file
        });

        projectUpdate.tabs[this.getIndexCurrentTabSelected()].itens.push(newComponent); // Adiciona o componente

        this.changeProjectState(projectUpdate);

        return newComponent; */
    }

    private onChangeTab = (tab: String) => {
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
                    <ToolBar onChangeTab={this.onChangeTab} />

                    <div style={{ height: "calc(100vh - 60px)" }}>
                        {this.state.currentTab}
                    </div>

                    <BottonStatusBar />
                </div>
            </CodeEditorContext.Provider>
        );
    }
}
