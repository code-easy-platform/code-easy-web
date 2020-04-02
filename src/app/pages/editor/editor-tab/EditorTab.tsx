import React, { Component } from 'react';

import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { IItem, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { AlertService, AlertTypes } from '../../../shared/components/tool-bar/AlertService';
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
const itensFluxoLogica: FlowItem[] = [
    new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
    new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
];

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

    state: Tab = mockTab;

    private propertiesEditorOutputItens(itens: IItem[]) {
        itens.forEach(item => {
            const index = itensFluxoLogica.findIndex(flowItem => flowItem.id === item.id);

            itensFluxoLogica[index].nome = item.name;

            this.setState({ itensFluxoLogica });

        });
    }

    private propertiesEditorGetSelectedItem(itens: TabChild[]): IItem[] {

        let itemSelected = itens.find(item => item.isSelected);

        if (itemSelected) {
            return [{
                isHeader: true,
                name: itemSelected.label,
                id: parseInt(itemSelected.id),
                properties: [
                    {
                        id: 1,
                        label: 'Label',
                        value: itemSelected.label,
                        typeValue: TypeValues.string
                    }
                ]
            }]
        } else {
            return [];
        }
    }

    private codeEditorOutputFlowItens = (updatedItens: FlowItem[]) => {

        AlertService.sendMessage(AlertTypes.loading, "Carregando módulos do node...", "A aplicação foi iniciada com êxito!");
        this.setState({ itensProperties: [] });

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

        this.setState({ itensProperties: itensPropertiesChanged });

    }

    private codeEditorOnDropItem(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem {

        console.log(oldItemId);
        console.log(newItemId);
        console.log(newItem);

        if (newItem.itemType.toString() === TreeItensTypes.file.toString()) {
            newItem.itemType = ItemType.ACTION;
        }

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

    private treeManagerOnDropItem(targetId: string, droppedId: string, droppedItem: any) {

        // Evita loop infinito
        if (targetId === droppedId) return;

        console.log(targetId);
        console.log(droppedId);
        console.log(droppedItem.itemProps.itemTree);

        let itens = this.state.itens;
        let index: number = this.state.itens.findIndex(item => item.id === droppedId);
        if (index < 0) return;
        itens[index].itemPaiId = targetId;

        this.setState({ itens });

    }

    private treeManagerOnClick(itemTreeId: string, item: TreeInterface) {

        let itens = this.state.itens;
        const index = itens.findIndex(item => item.id === itemTreeId);

        itens.forEach(item => {
            item.isSelected = false;
        });

        if (index < 0) return;

        itens[index].isSelected = true;

        this.setState({ itens });

    }

    private treeManagerOnDoubleClick(itemTreeId: string, item: TreeInterface) {

        let itens = this.state.itens;
        const index = this.state.itens.findIndex(item => item.id === itemTreeId);
        if (index < 0) return;

        itens.forEach(item => {
            item.isEditing = false;
        });

        itens[index].isEditing = true;

        this.setState({ itens });

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
                        allowDropTo={[TreeItensTypes.file]}
                        itens={this.codeEditorGetItensLogica(this.state.itens)}
                        onChangeItens={this.codeEditorOutputFlowItens.bind(this)}
                        onDropItem={this.codeEditorOnDropItem.bind(this)}
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
                                    itemId: "0",
                                    isSelected: false,
                                    nodeExpanded: true,
                                    itemLabel: "Item 01",
                                    itemType: TreeItensTypes.folder,
                                    itemChilds: this.treeManagerGetTree(this.state.itens),
                                }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={this.propertiesEditorGetSelectedItem(this.state.itens)}
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