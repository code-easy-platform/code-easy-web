import React from 'react';

import { IItem, TypeValues, IProperties } from '../../../shared/components/properties-editor/shared/interfaces';
import { CodeEditorContext, ICodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { Tab, ItemComponent, ItemFlowComplete } from '../../../shared/interfaces/Aplication';
import ColRightTemplate from '../../../shared/components/resize-tamplate/ColRightTemplate';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { Utils } from '../../../shared/services/Utils';


enum CurrentFocus {
    tree = "tree",
    flow = "flow"
}

export default class EditorTab extends React.Component {
    private editorContext: ICodeEditorContext = this.context;

    state: { currentFocus: CurrentFocus } = {
        currentFocus: CurrentFocus.tree,
    }



    private onChangeState() {
        this.editorContext.updateProjectState(this.editorContext.project);
    }



    /** O editor de propriedades emite a lista de propriedades alteradas */
    private propertiesEditorOutputItens(itens: IItem[]) {

        if (this.state.currentFocus === CurrentFocus.tree) {

            itens.forEach(item => {
                if (item.id !== undefined) {
                    this.editorContext.project.tabs.forEach((tab: Tab) => {
                        tab.itens.forEach(itemTree => {
                            if (itemTree.isSelected && itemTree.id === item.id) {

                                if (itemTree) {
                                    itemTree.label = item.properties[0].value;
                                    itemTree.description = item.properties[1].value;
                                }

                            }
                        });
                    });
                }
            });

        } else if (this.state.currentFocus === CurrentFocus.flow) {

            let itemEditing: any;
            this.editorContext.project.tabs.forEach((tab: Tab) => {
                tab.itens.forEach(item => {
                    if (item.isEditing) {
                        itemEditing = item;
                    }
                })
            });

            if (itemEditing !== null) {
                itens.forEach(item => {

                    let index = itemEditing.itens.findIndex((oldItem: ItemFlowComplete) => oldItem.id === item.id);
                    if (index && (index < 0)) return;

                    itemEditing.itens[index].name = item.name;
                    itemEditing.itens[index].properties = item.properties;

                });
            }

        }
        this.onChangeState();

    }

    /** Devolve para o editor de propriedades as propriedades do item selecionado no momento. */
    private propertiesEditorGetSelectedItem(currentFocus: CurrentFocus): IItem[] {

        if (currentFocus === CurrentFocus.tree) { // Mapeia os itens da árvore.
            let res: IItem[] = [];

            this.editorContext.project.tabs.forEach((tab: Tab) => {
                tab.itens.forEach(item => {
                    if (item.isSelected) {
                        res = [
                            {
                                id: item.id,
                                isHeader: true,
                                name: item.label,
                                properties: item.properties,
                            }
                        ]
                    }
                });
            });

            return res;
        } else if (currentFocus === CurrentFocus.flow) { // Mapeia os itens de fluxo
            const itensLogica = this.codeEditorGetItensLogica('ItemFlowComplete');
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

        return [];

    }

    /** Devolve uma lista de propriedades para ser adicionado em novos itens de fluxo ou da árvore. */
    private propertiesEditorGetNewProperties(itemType: ItemType, name: string): IProperties[] {
        switch (itemType) {
            case ItemType.START:
                return [
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

        // Caso não haja itens de fluxo, evita o processamento desnecessário.
        if (updatedItens.length === 0) return;

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.isEditing) {

                    let newItens: ItemFlowComplete[] = [];

                    // Atualiza os itens da arvore.
                    updatedItens.forEach(updatedItem => {
                        if (updatedItem.id !== undefined) {

                            const index = item.itens.findIndex(item => updatedItem.id === item.id);
                            if (index >= 0) {
                                newItens.push(new ItemFlowComplete({
                                    properties: item.itens[index].properties,
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
                    item.itens = newItens;

                    // Atualiza a tab no state
                    this.setState({
                        currentFocus: CurrentFocus.flow,
                        tab: tab
                    });

                } else {
                    item.itens.forEach(flowItem => flowItem.isSelected = false);
                }
            });
        });
        this.onChangeState();

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

    /** Usando o state pode pegar os itens que devem ser editados pelo fluxo. */
    private codeEditorGetItensLogica(resultType?: 'ItemFlowComplete' | 'FlowItem'): any[] {

        let itemEditing: ItemComponent | undefined;

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.isEditing) {
                    itemEditing = item;
                }
            });
        });

        if (itemEditing) {
            itemEditing.itens.sort((a, b) => (a.top - b.top));
            if (resultType === 'ItemFlowComplete') return itemEditing.itens; // Se for o completo já retorna para evitar processamento.

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
                    isSelected: item.isSelected,
                }));
            });

            return flowItens;
        } else {
            return [];
        }

    }

    /** Alimenta a toolbox, de onde pode ser arrastados itens para o fluxo. */
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

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada. */
    private codeEditorContextMenu(data: any): any[] {
        console.log("--------");
        console.log(data);
        console.log("--------");

        return [];
    }

    /** Monta o breadcamps que será exibido no top do editor de fluxos. */
    private codeEditorGetBreadcamps(): string {

        let breadcamps = '';

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.isEditing) {
                    breadcamps = `${tab.configs.label}/${item.label}`;
                }
            });
        });

        return breadcamps;
    }



    /** Quando um item for dropado na árvore está função será chamada */
    private treeManagerOnDropItem(targetId: string, droppedId: string, droppedItem: any) {

        this.setState({ currentFocus: CurrentFocus.tree });

        // Evita loop infinito
        if (targetId === droppedId) return;

        // Pega a lista de itens corrente na árvore
        let itens: ItemComponent[] = [];
        this.editorContext.project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditando) {
                itens = tab.itens;
            }
        });

        // Realiza a troca de item pai
        let index: number = itens.findIndex(item => item.id === droppedId);
        if (index < 0) return;
        itens[index].itemPaiId = targetId;

        // Expande o elemento onde o item foi dropado
        index = itens.findIndex(item => item.id === targetId);
        if (index < 0) return;
        itens[index].nodeExpanded = true;

        // Atualiza o estado para as alterações fazerem efeito
        this.setState({ currentFocus: CurrentFocus.tree });
        this.onChangeState()
    }

    /** Quando um item da árvore for clicado, está função será chamada */
    private treeManagerOnClick(itemTreeId: string, item: TreeInterface) {

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.id === itemTreeId) {
                    item.isSelected = true;
                    item.nodeExpanded = !item.nodeExpanded;
                } else {
                    item.isSelected = false;
                }
            });
        });

        this.setState({ currentFocus: CurrentFocus.tree });
        this.onChangeState()

    }

    /** Quando houver um duplo clique em um item da árvore, está função será chamada */
    private treeManagerOnDoubleClick(itemTreeId: string, item: TreeInterface) {

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.id === itemTreeId) {
                    item.isEditing = true;
                } else {
                    item.isEditing = false;
                }
            });
        });

        this.setState({ currentFocus: CurrentFocus.tree });
        this.onChangeState();

    }

    /** Monta a estrutura da árvore e devolve no return */
    private treeManagerGetTree(): TreeInterface[] {

        let itens: ItemComponent[] = [];
        this.editorContext.project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditando) {
                itens = tab.itens;
            }
        });

        const loadChilds = (tree: TreeInterface): TreeInterface[] => {

            // Busca todos os itens que tem como pai o elemento corrente
            itens.filter((item) => item.itemPaiId === tree.id).forEach(item => {
                tree.childs.push({
                    childs: [],
                    id: item.id,
                    type: item.type,
                    isSelected: false,
                    label: item.label,
                    description: item.description,
                    nodeExpanded: item.nodeExpanded,
                });
            });

            // Carrega os filhos de cada item da árvore
            tree.childs.forEach((itemTree: any) => {
                itemTree.childs = loadChilds(itemTree);
            });

            return tree.childs;
        }

        // Mapea todos os itens que não tem pai id, significa que eles estão na raiz
        let tree: TreeInterface[] = [];
        itens.filter(item => {
            return item.itemPaiId === undefined
        }).forEach(item => {
            tree.push({
                childs: [],
                id: item.id,
                type: item.type,
                isSelected: false,
                label: item.label,
                description: item.description,
                isAllowedToggleNodeExpand: false,
                nodeExpanded: item.nodeExpanded,
            });
        });

        // Carrega os filhos de cada item da árvore
        tree.forEach(itemTree => {
            itemTree.childs = loadChilds(itemTree);
        });

        return tree;
    }

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    private treeManagerContextMenu(itemId: string): any[] {

        const removeItem = (itemId: string) => {
            this.setState({ currentFocus: CurrentFocus.tree });

            // Pega a lista de itens corrente na árvore
            let indexTabToRemove: number | any;
            let indexItemToRemove: number | any;
            this.editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
                tab.itens.forEach((item, index) => {
                    if (item.id === itemId) {
                        indexItemToRemove = index;
                        indexTabToRemove = indexTab;
                    }
                });
            });

            if (indexItemToRemove !== undefined && indexItemToRemove !== undefined) {
                this.editorContext.project.tabs[indexTabToRemove].itens.splice(indexItemToRemove, 1);
            }

            this.onChangeState();

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
                        onDropItem={this.codeEditorOnDropItem.bind(this)}
                        itens={this.codeEditorGetItensLogica.bind(this)()}
                        onChangeItens={this.codeEditorOutputFlowItens.bind(this)}
                        breadcrumbsPath={this.codeEditorGetBreadcamps.bind(this)()}
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
                                    id: undefined,
                                    isSelected: false,
                                    nodeExpanded: true,
                                    isDisabledDrag: true,
                                    type: TreeItensTypes.folder,
                                    childs: this.treeManagerGetTree.bind(this)(),
                                    label: this.editorContext.project.tabs.find(item => item.configs.isEditando)?.configs.label || '',
                                }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={this.propertiesEditorGetSelectedItem.bind(this)(this.state.currentFocus)}
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
