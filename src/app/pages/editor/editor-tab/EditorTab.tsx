import React from 'react';

import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { IItem, TypeValues, IProperties } from '../../../shared/components/properties-editor/shared/interfaces';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { Tab, ItemComponent, ItemFlowComplete } from '../../../shared/interfaces/Aplication';
import ColRightTemplate from '../../../shared/components/resize-tamplate/ColRightTemplate';
import { CodeEditorContext, ICodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { Storage } from '../../../shared/services/LocalStorage';
import { Utils } from '../../../shared/services/Utils';


enum CurrentFocus {
    tree = "tree",
    flow = "flow"
}

export default class EditorTab extends React.Component {
    private editorContext: ICodeEditorContext = this.context;

    state: { tab: Tab, currentFocus: CurrentFocus } = {
        tab: this.editorContext.project.tabs.find((tab: Tab) => tab.configs.isEditando) || Storage.getProject().tabs[0],
        currentFocus: CurrentFocus.tree,
    }


    private onChangeState() {

        const tabIndex = this.editorContext.project.tabs.findIndex((tab: Tab) => tab.configs.isEditando);
        let project = this.editorContext.project;
        project.tabs[tabIndex] = this.state.tab;

        this.editorContext.updateProjectState(project);
    }


    private propertiesEditorOutputItens(itens: IItem[]) {

        if (this.state.currentFocus === CurrentFocus.tree) {
            itens.forEach(item => {

                if (item.id !== undefined) {
                    let itemSelected = this.state.tab.itens.find(itemTree => (itemTree.isSelected && itemTree.id === item.id));

                    if (itemSelected) {
                        itemSelected.label = item.properties[0].value;
                        itemSelected.description = item.properties[1].value;
                    }
                }

            });
        } else if (this.state.currentFocus === CurrentFocus.flow) {

            let itemEditing: any = this.state.tab.itens.find(item => item.isEditing);
            if (itemEditing !== null) {

                itens.forEach(item => {

                    let index = itemEditing.itens.findIndex((oldItem: ItemFlowComplete) => oldItem.id === item.id);
                    if (index && (index < 0)) return;

                    itemEditing.itens[index].name = item.name;
                    itemEditing.itens[index].properties = item.properties;

                });

            }

        }

        this.setState({ tab: { ...this.state.tab } });
        this.onChangeState()

    }

    private propertiesEditorGetSelectedItem(itens: ItemComponent[], currentFocus: CurrentFocus): IItem[] {

        let itemIndex = itens.findIndex(item => item.isSelected);

        if (!(itemIndex < 0)) {
            if (currentFocus === CurrentFocus.tree) {
                return [
                    {
                        isHeader: true,
                        id: itens[itemIndex].id,
                        name: itens[itemIndex].label,
                        properties: [
                            {
                                id: '1',
                                name: 'Label',
                                value: itens[itemIndex].label,
                                type: TypeValues.string
                            },
                            {
                                id: '2',
                                name: 'Description',
                                value: itens[itemIndex].description,
                                type: TypeValues.bigstring
                            },
                            {
                                id: '3',
                                name: "Enabled",
                                type: TypeValues.boolean,
                                value: false
                            }
                        ]
                    }
                ]
            } else if (currentFocus === CurrentFocus.flow) {

                const itensLogica = this.codeEditorGetItensLogica(this.state.tab.itens, 'ItemFlowComplete');
                const itensFiltereds = itensLogica.filter(flowItem => flowItem.isSelected);

                const mappedItens: IItem[] = [];
                itensFiltereds.forEach(filteredItem => {
                    mappedItens.push({
                        isHeader: true,
                        id: filteredItem.id,
                        name: filteredItem.name,
                        properties: filteredItem.properties,
                    });
                });

                return mappedItens;
            }
        }

        return [];
    }

    private propertiesEditorGetNewProperties(itemType: ItemType, name: string): IProperties[] {
        switch (itemType) {
            case ItemType.START:
                return [
                    // TODO: Alterar o tipo "string" para um tipo de apenas exibição(será adicionado no futuro o suporte para este tipo).
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: name },
                ];

            case ItemType.ACTION:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name },
                    { id: Utils.getUUID(), name: 'Action', type: TypeValues.expression, value: '' },
                ];

            case ItemType.ASSIGN:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name },
                    { id: Utils.getUUID(), name: '', type: TypeValues.assign, value: '' },
                ];

            case ItemType.COMMENT:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: name },
                    { id: Utils.getUUID(), name: 'Comment', type: TypeValues.string, value: name },
                ];

            case ItemType.FOREACH:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name },
                    { id: Utils.getUUID(), name: 'SourceList', type: TypeValues.expression, value: name },
                ];

            case ItemType.IF:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name },
                    { id: Utils.getUUID(), name: 'Condiction', type: TypeValues.expression, value: '' },
                ];

            case ItemType.SWITCH:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name },
                    { id: Utils.getUUID(), name: 'Condiction1', type: TypeValues.expression, value: '' },
                ];

            case ItemType.END:
                return [
                    // TODO: Alterar o tipo "string" para um tipo de apenas exibição(será adicionado no futuro o suporte para este tipo).
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: name },
                ];

            default:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: '<tipo de item não encontrado>' },
                ];
        }
    }



    /** Toda vez que houver uma alteração nos itens de fluxo está função será executada. */
    private codeEditorOutputFlowItens = (updatedItens: FlowItem[]) => {

        let tab = this.state.tab;

        let itemTreeEditingIndex = tab.itens.findIndex(item => item.isEditing);
        if (itemTreeEditingIndex >= 0) {

            // Pega os itens de fluxo do item da árvore atual para pode editar
            let itens = tab.itens[itemTreeEditingIndex].itens;

            let newItens: ItemFlowComplete[] = [];

            // Atualiza os itens da arvore.
            updatedItens.forEach(updatedItem => {
                if (updatedItem.id !== undefined) {

                    const index = itens.findIndex(item => updatedItem.id === item.id);
                    if (index >= 0) {
                        newItens.push(new ItemFlowComplete({
                            properties: itens[index].properties,
                            isSelected: updatedItem.isSelected,
                            sucessor: updatedItem.sucessor,
                            itemType: updatedItem.itemType,
                            height: updatedItem.height,
                            width: updatedItem.width,
                            left: updatedItem.left,
                            name: updatedItem.name,
                            top: updatedItem.top,
                            id: updatedItem.id,
                        }));
                    } else {
                        newItens.push(new ItemFlowComplete({
                            properties: this.propertiesEditorGetNewProperties(updatedItem.itemType, updatedItem.name), // Criar uma função para isso
                            isSelected: updatedItem.isSelected,
                            sucessor: updatedItem.sucessor,
                            itemType: updatedItem.itemType,
                            height: updatedItem.height,
                            width: updatedItem.width,
                            left: updatedItem.left,
                            name: updatedItem.name,
                            top: updatedItem.top,
                            id: updatedItem.id,
                        }));
                    }

                }
            });

            // Atualiza a tab com os itens alterados
            tab.itens[itemTreeEditingIndex].itens = newItens;

        }

        // Atualiza a tab no state
        this.setState({
            currentFocus: CurrentFocus.flow,
            tab: tab
        });
        this.onChangeState()
    }

    /** Ao soltar um novo item permitido no editor está função será executada.
     * 
     * Por aqui pode ser feito alterações no item dropado no fluxo.
     */
    private codeEditorOnDropItem(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem {

        if (newItem.itemType.toString() === TreeItensTypes.file.toString()) {
            newItem.itemType = ItemType.ACTION;
        }

        this.setState({ currentFocus: CurrentFocus.flow });

        return newItem;

    }

    /** Usando o state pode pegar os itens que devem ser editados pelo fluxo */
    private codeEditorGetItensLogica(itens: ItemComponent[], res?: 'ItemFlowComplete' | 'FlowItem'): any[] {

        let itemEditing = itens.find(item => item.isEditing);

        if (itemEditing) {
            itemEditing.itens.sort((a, b) => (a.top - b.top));
            if (res === 'ItemFlowComplete') return itemEditing.itens; // Se for o completo já retorna para evitar processamento.

            // Se for o simples para o editor de fluxos, faz um map dos itens.
            let flowItens: FlowItem[] = [];
            itemEditing.itens.forEach(item => {
                flowItens.push(new FlowItem({
                    id: item.id,
                    top: item.top,
                    left: item.left,
                    name: item.name,
                    width: item.width,
                    height: item.height,
                    itemType: item.itemType,
                    sucessor: item.sucessor,
                    isSelected: item.isSelected
                }));
            });

            return flowItens;
        } else {
            return [];
        }

    }

    /** Alimenta a toolbox, de onde pode ser arrastados itens para o fluxo */
    private codeEditorGetToolBoxItens(): FlowItem[] {
        return [
            new FlowItem({ id: '1', name: "START", itemType: ItemType.START }),
            new FlowItem({ id: '2', name: "ACTION", itemType: ItemType.ACTION }),
            new FlowItem({ id: '3', name: "IF", itemType: ItemType.IF }),
            new FlowItem({ id: '4', name: "FOREACH", itemType: ItemType.FOREACH }),
            new FlowItem({ id: '6', name: "SWITCH", itemType: ItemType.SWITCH }),
            new FlowItem({ id: '7', name: "ASSIGN", itemType: ItemType.ASSIGN }),
            new FlowItem({ id: '8', name: "END", itemType: ItemType.END }),
            new FlowItem({ id: '9', name: "COMMENT", itemType: ItemType.COMMENT }),
        ];
    }

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada */
    private codeEditorContextMenu(data: any): any[] {
        console.log("--------");
        console.log(data);
        console.log("--------");

        const removeItem = (itemId: string) => {
            console.log("Removido!");
            /* this.setState({ currentFocus: CurrentFocus.tree });
    
            const index = this.state.tab.itens.findIndex(item => item.id === itemId);
    
            if (index < 0) return;
            this.state.tab.itens.splice(index, 1);
    
            this.setState({
                tab: this.state.tab,
                tree: this.treeManagerGetTree(this.state.tab.itens),
                itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
                propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
            }); */
        };

        return [
            {
                action: () => removeItem(data.itemId),
                label: 'Excluir'
            }
        ];

    }

    /** Monta o breadcamps que será exibido no top do editor de fluxos */
    private codeEditorGetBreadcamps(): string {

        let tab = this.state.tab;

        let itemTreeEditing = tab.itens.find(item => item.isEditing);

        return `${tab.configs.label}/${itemTreeEditing?.label}`;
    }



    private treeManagerOnDropItem(targetId: string, droppedId: string, droppedItem: any): TreeInterface {

        this.setState({ currentFocus: CurrentFocus.tree });

        const itemDefault = {
            itemId: "",
            isSelected: false,
            nodeExpanded: true,
            itemLabel: "Routers",
            itemType: TreeItensTypes.folder,
            itemChilds: this.treeManagerGetTree(this.state.tab.itens),
        };

        // Evita loop infinito
        if (targetId === droppedId) return itemDefault;

        let itens = this.state.tab.itens;
        let index: number = itens.findIndex(item => item.id === droppedId);
        if (index < 0) return itemDefault;
        itens[index].itemPaiId = targetId;

        this.setState({
            currentFocus: CurrentFocus.tree,
            tab: { ...this.state.tab, itens }
        });

        return {
            itemId: "",
            isSelected: false,
            nodeExpanded: true,
            itemLabel: "Routers",
            itemType: TreeItensTypes.folder,
            itemChilds: this.treeManagerGetTree(this.state.tab.itens),
        };

    }

    private treeManagerOnClick(itemTreeId: string, item: TreeInterface) {

        console.log(itemTreeId, item);

        let itens = this.state.tab.itens;
        const index = itens.findIndex(item => item.id === itemTreeId);

        itens.forEach(item => { item.isSelected = false; });

        if (index < 0) return;

        itens[index].nodeExpanded = !itens[index].nodeExpanded;
        itens[index].isSelected = true;

        this.setState({
            tab: { ...this.state.tab, itens },
            currentFocus: CurrentFocus.tree,
        });
        this.onChangeState()

    }

    private treeManagerOnDoubleClick(itemTreeId: string, item: TreeInterface) {

        let itens = this.state.tab.itens;
        const index = itens.findIndex(item => item.id === itemTreeId);
        if (index < 0) return;

        itens.forEach(item => {
            item.isEditing = false;
        });

        itens[index].isEditing = true;

        this.setState({
            currentFocus: CurrentFocus.tree,
            tab: { ...this.state.tab, itens }
        });
        this.onChangeState()

    }

    private treeManagerGetTree(itens: ItemComponent[]): TreeInterface[] {

        const loadChilds = (tree: TreeInterface): TreeInterface[] => {

            // Busca todos os itens que tem como pai o elemento corrente
            itens.filter((item) => {
                return item.itemPaiId === tree.itemId;
            }).forEach(item => {
                tree.itemChilds.push({ itemChilds: [], itemId: item.id, itemLabel: item.label, itemType: item.type, nodeExpanded: item.nodeExpanded, isSelected: false });
            });

            // Carrega os filhos de cada item da árvore
            tree.itemChilds.forEach((itemTree: any) => {
                itemTree.itemChilds = loadChilds(itemTree);
            });

            return tree.itemChilds;
        }

        // Mapea todos os itens que não tem pai id, significa que eles estão na raiz
        let tree: TreeInterface[] = [];
        itens.filter(item => {
            return item.itemPaiId === undefined
        }).forEach(item => {
            tree.push({ itemChilds: [], itemId: item.id, itemLabel: item.label, itemType: item.type, nodeExpanded: item.nodeExpanded, isSelected: false });
        });

        // Carrega os filhos de cada item da árvore
        tree.forEach(itemTree => {
            itemTree.itemChilds = loadChilds(itemTree);
        });

        return tree;
    }

    private treeManagerContextMenu(itemId: string): any[] {

        const removeItem = (itemId: string) => {
            this.setState({ currentFocus: CurrentFocus.tree });

            const index = this.state.tab.itens.findIndex(item => item.id === itemId);

            if (index < 0) return;
            this.state.tab.itens.splice(index, 1);

            this.setState({ tab: this.state.tab });

        };

        return [
            {
                action: () => removeItem(itemId),
                label: 'Excluir'
            }
        ];

    }



    render() {
        return (
            <EditorTabTemplate
                columnCenter={
                    <FlowEditor
                        isShowToolbar={true}
                        allowDropTo={[TreeItensTypes.file]}
                        toolItens={this.codeEditorGetToolBoxItens()}
                        breadcrumbsPath={this.codeEditorGetBreadcamps.bind(this)()}
                        itens={this.codeEditorGetItensLogica.bind(this)(this.state.tab.itens)}
                        onDropItem={this.codeEditorOnDropItem.bind(this)}
                        onChangeItens={this.codeEditorOutputFlowItens.bind(this)}
                        onContextMenu={(data, e) => {
                            if (e) {
                                e.preventDefault();
                                ContextMenuService.showMenu(e.clientX, e.clientY, this.codeEditorContextMenu.bind(this)(data));
                            }
                        }}
                    />
                }
                columnRight={
                    <ColRightTemplate
                        rowTop={
                            <TreeManager
                                isUseDrag={true}
                                isUseDrop={true}
                                onClick={this.treeManagerOnClick.bind(this)}
                                onDropItem={this.treeManagerOnDropItem.bind(this)}
                                onDoubleClick={this.treeManagerOnDoubleClick.bind(this)}
                                onContextMenu={(itemId, e) => {
                                    e.preventDefault();
                                    ContextMenuService.showMenu(e.clientX, e.clientY, this.treeManagerContextMenu.bind(this)(itemId));
                                }}
                                itemBase={{
                                    itemId: undefined,
                                    isSelected: false,
                                    nodeExpanded: true,
                                    itemLabel: "Routers",
                                    itemType: TreeItensTypes.folder,
                                    itemChilds: this.treeManagerGetTree.bind(this)(this.state.tab.itens),
                                }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={this.propertiesEditorGetSelectedItem.bind(this)(this.state.tab.itens, this.state.currentFocus)}
                                onChange={this.propertiesEditorOutputItens.bind(this)}
                            />
                        }
                    />
                }
            />
        );
    }

}
EditorTab.contextType = CodeEditorContext;
