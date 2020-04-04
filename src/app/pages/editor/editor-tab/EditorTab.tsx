import React, { Component } from 'react';

import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { IItem, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { AlertService, AlertTypes } from '../../../shared/components/botton-status-bar/AlertService';
import ColRightTemplate from '../../../shared/components/resize-tamplate/ColRightTemplate';
import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { FlowEditor } from './../../../shared/components/code-editor/CodeEditor';

const itensLogica: FlowItem[] = [
    new FlowItem({ id: 1, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "START", itemType: ItemType.START }),
    new FlowItem({ id: 2, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: 3, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: 4, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: 6, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: 7, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: 8, sucessor: [], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "END", itemType: ItemType.END }),
];

enum CurrentFocus {
    tree = "tree",
    flow = "flow"
}
enum TabType {
    data = "DATA",
    actions = "ACTIONS",
    routers = "ROUTERS",
}
interface TabChild {
    id: string;
    label: string;
    itens: FlowItem[];
    isEditing: boolean;
    isSelected: boolean;
    description: string;
    type: TreeItensTypes;
    nodeExpanded: boolean;
    itemPaiId: string | undefined;
}
interface Tab {
    id: string
    name: string;
    label: string;
    type: TabType;
    itens: TabChild[];
    description: string;
}

const mockTab: Tab = {
    id: '1',
    name: "actions",
    label: "Actions",
    description: "Minha tab de actions",
    type: TabType.actions,
    itens: [
        {
            id: '1',
            label: "Minha action",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: undefined,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
            ],
            type: TreeItensTypes.folder,
        },
        {
            id: '2',
            label: "Minha action 2",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: false,
            nodeExpanded: true,
            itemPaiId: undefined,
            itens: [
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
                new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
            ],
            type: TreeItensTypes.folder,
        },
        {
            id: '3',
            label: "Minha action 3",
            description: "Desc da minha action",
            itemPaiId: '1',
            isEditing: true,
            isSelected: false,
            nodeExpanded: true,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
                new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
            ],
            type: TreeItensTypes.file,
        },
        {
            id: '4',
            label: "Minha action 4",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: false,
            nodeExpanded: true,
            itemPaiId: undefined,
            itens: [],
            type: TreeItensTypes.file,
        },
        {
            id: '5',
            label: "Minha action 5",
            description: "Desc da minha action",
            itemPaiId: '1',
            isEditing: true,
            isSelected: false,
            nodeExpanded: true,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
                new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
            ],
            type: TreeItensTypes.file,
        }
    ]
}

export default class EditorTab extends Component {
    // private codeEditorContext: any = this.context;

    state = {
        tree: [],
        tab: mockTab,
        propEditor: [],
        itensLogica: [],
        currentFocus: CurrentFocus.tree,
    }

    componentWillMount() {
        this.setState({
            currentFocus: CurrentFocus.tree,
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });
    }



    private propertiesEditorOutputItens(itens: IItem[]) {

        itens.forEach(item => {

            let itemSelected = this.state.tab.itens.find(itemTree => (itemTree.isSelected && itemTree.id === item.id.toString()));

            if (itemSelected) itemSelected.label = item.name;

        });

        this.setState({ tab: { ...this.state.tab } });

        this.setState({
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });

    }

    private propertiesEditorGetSelectedItem(itens: TabChild[]): IItem[] {

        let itemIndex = itens.findIndex(item => item.isSelected);

        if (!(itemIndex < 0)) {
            if (this.state.currentFocus === CurrentFocus.tree) {
                return [
                    {
                        isHeader: true,
                        name: itens[itemIndex].label,
                        id: parseInt(itens[itemIndex].id),
                        properties: [
                            {
                                id: 1,
                                label: 'Label',
                                value: itens[itemIndex].label,
                                typeValue: TypeValues.string
                            },
                            {
                                id: 2,
                                label: 'Description',
                                value: itens[itemIndex].description,
                                typeValue: TypeValues.string
                            }
                        ]
                    }
                ]
            } else if (this.state.currentFocus === CurrentFocus.flow) {

                const itensFiltereds: FlowItem[] = this.state.itensLogica.filter((flowItem: FlowItem) => flowItem.isSelecionado);

                const mappedItens: IItem[] = [];
                itensFiltereds.forEach(filteredItem => {
                    mappedItens.push({
                        isHeader: true,
                        id: filteredItem.id,
                        name: filteredItem.nome,
                        properties: [
                            {
                                id: 1,
                                label: 'Label',
                                value: filteredItem.nome,
                                typeValue: TypeValues.string
                            }
                        ]
                    });
                });

                return mappedItens;
            }
        }

        return [];
    }



    private codeEditorOutputFlowItens = (updatedItens: FlowItem[]) => {

        AlertService.sendMessage(AlertTypes.loading, "Carregando módulos do node...", "A aplicação foi iniciada com êxito!");

        let itensPropertiesChanged: IItem[] = [];
        updatedItens.forEach(item => {
            if (item.isSelecionado) {
                itensPropertiesChanged.push({
                    id: item.id,
                    isHeader: true,
                    name: item.nome,
                    properties: [
                        {
                            id: item.id,
                            label: "Name",
                            typeValue: TypeValues.string,
                            value: item.nome
                        },
                        {
                            id: item.id + 1,
                            label: "Description",
                            typeValue: TypeValues.bigstring,
                            value: "My big string description"
                        },
                        {
                            id: item.id + 2,
                            label: "Enabled",
                            typeValue: TypeValues.boolean,
                            value: false
                        },
                        {
                            id: item.id + 3,
                            label: "Height",
                            typeValue: TypeValues.number,
                            value: 0
                        },
                        {
                            id: item.id + 4,
                            label: "Upload",
                            typeValue: TypeValues.binary,
                            value: false
                        }
                    ]
                });
            }
        });

        this.setState({
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            tab: { ...this.state.tab, itensProperties: itensPropertiesChanged },
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });

    }

    private codeEditorOnDropItem(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem {

        if (newItem.itemType.toString() === TreeItensTypes.file.toString()) {
            newItem.itemType = ItemType.ACTION;
        }

        this.setState({ currentFocus: CurrentFocus.flow });

        return newItem;

    }

    private codeEditorGetItensLogica(itens: TabChild[]): FlowItem[] {

        let itemEditing = itens.find(item => item.isEditing);

        if (itemEditing) {
            return itemEditing.itens
        } else {
            return [];
        }

    }



    private treeManagerOnDropItem(targetId: string, droppedId: string, droppedItem: any): TreeInterface {
        const itemDefault = {
            itemId: "",
            isSelected: false,
            nodeExpanded: true,
            itemLabel: "Routers",
            itemType: TreeItensTypes.folder,
            itemChilds: this.state.tree,
        };

        // Evita loop infinito
        if (targetId === droppedId) return itemDefault;

        let itens = this.state.tab.itens;
        let index: number = itens.findIndex(item => item.id === droppedId);
        if (index < 0) return itemDefault;
        itens[index].itemPaiId = targetId;

        this.setState({ currentFocus: CurrentFocus.tree });

        this.setState({
            tab: { ...this.state.tab, itens },
            tree: this.treeManagerGetTree(itens),
            itensLogica: this.codeEditorGetItensLogica(itens),
            propEditor: this.propertiesEditorGetSelectedItem(itens),
        });

        return {
            itemId: "",
            isSelected: false,
            nodeExpanded: true,
            itemLabel: "Routers",
            itemType: TreeItensTypes.folder,
            itemChilds: this.state.tree,
        };

    }

    private treeManagerOnClick(itemTreeId: string, item: TreeInterface) {

        let itens = this.state.tab.itens;
        const index = itens.findIndex(item => item.id === itemTreeId);

        itens.forEach(item => { item.isSelected = false; });

        if (index < 0) return;

        itens[index].isSelected = true;
        itens[index].nodeExpanded = true;

        this.setState({ urrentFocus: CurrentFocus.tree });

        this.setState({
            tab: { ...this.state.tab, itens },
            tree: this.treeManagerGetTree(itens),
            itensLogica: this.codeEditorGetItensLogica(itens),
            propEditor: this.propertiesEditorGetSelectedItem(itens),
        });

    }

    private treeManagerOnDoubleClick(itemTreeId: string, item: TreeInterface) {

        let itens = this.state.tab.itens;
        const index = itens.findIndex(item => item.id === itemTreeId);
        if (index < 0) return;

        itens.forEach(item => {
            item.isEditing = false;
        });

        itens[index].isEditing = true;

        this.setState({ urrentFocus: CurrentFocus.tree });

        this.setState({
            tab: { ...this.state.tab, itens },
            tree: this.treeManagerGetTree(itens),
            itensLogica: this.codeEditorGetItensLogica(itens),
            propEditor: this.propertiesEditorGetSelectedItem(itens),
        });

    }

    private treeManagerGetTree(itens: TabChild[]): TreeInterface[] {

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



    render() {
        return (
            <EditorTabTemplate
                columnCenter={
                    <FlowEditor
                        isShowToolbar={true}
                        toolItens={itensLogica}
                        itens={this.state.itensLogica}
                        allowDropTo={[TreeItensTypes.file]}
                        onDropItem={this.codeEditorOnDropItem.bind(this)}
                        onChangeItens={this.codeEditorOutputFlowItens.bind(this)}
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
                                onContextMenu={(itemId, e) => { e.preventDefault(); console.log(itemId); console.log(e); }}
                                itemBase={{
                                    itemId: "",
                                    isSelected: false,
                                    nodeExpanded: true,
                                    itemLabel: "Routers",
                                    itemType: TreeItensTypes.folder,
                                    itemChilds: this.state.tree,
                                }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={this.state.propEditor}
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
