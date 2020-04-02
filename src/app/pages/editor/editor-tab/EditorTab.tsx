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
            type: TreeItensTypes.folder,
            itens: itensFluxoLogica
        },
        {
            id: '2',
            label: "Minha action 2",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: '1',
            type: TreeItensTypes.file,
            itens: itensFluxoLogica
        },
        {
            id: '3',
            label: "Minha action 3",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: '1',
            type: TreeItensTypes.file,
            itens: itensFluxoLogica
        },
        {
            id: '4',
            label: "Minha action 4",
            description: "Desc da minha action",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: undefined,
            type: TreeItensTypes.file,
            itens: itensFluxoLogica
        }
    ]
}

export default class EditorTab extends Component {
    // private codeEditorContext: any = this.context;

    state: Tab = mockTab;

    private outputFlowItens = (updatedItens: FlowItem[]) => {

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

    private outputPropertiesItens(itens: IItem[]) {

        /* itens.forEach(item => {
            const index = itensFluxoLogica.findIndex(flowItem => flowItem.id === item.id);

            itensFluxoLogica[index].nome = item.name;

            this.setState({ itensFluxoLogica });

        }); */

    }

    private onDropItemTreeManager(targetId: string, droppedId: string, droppedItem: any) {

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

    private onDropItemCodeEditor(oldItemId: string, newItemId: string, newItem: FlowItem): boolean {
        console.log(oldItemId);
        console.log(newItemId);
        console.log(newItem);

        return true;
    }

    private getSelectedItem(tab: Tab): IItem {

        return {
            id: 45,
            isHeader: false,
            name: 'Teste',
            properties: [
                {
                    id: 45,
                    label: 'teste',
                    value: 'teste',
                    typeValue: TypeValues.string
                }
            ]
        }
    }

    private getTree(itens: TabChild[]): TreeInterface[] {

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
                        itens={itensFluxoLogica}
                        allowDropTo={[TreeItensTypes.file]}
                        onChangeItens={this.outputFlowItens}
                        onDropItem={this.onDropItemCodeEditor.bind(this)}
                    />
                }
                columnRight={
                    <ColRightTemplate
                        rowTop={
                            <TreeManager
                                isUseDrag={true}
                                isUseDrop={true}
                                onClick={itemId => { console.log(itemId) }}
                                onDropItem={this.onDropItemTreeManager.bind(this)}
                                itemBase={{ itemId: "0", itemLabel: "Item 01", isSelected: false, itemChilds: this.getTree(this.state.itens), itemType: TreeItensTypes.folder, nodeExpanded: false }}
                                onContextMenu={(itemId, e) => { e.preventDefault(); console.log(itemId); console.log(e); }}
                                onDoubleClick={(itemId, item, e) => { console.log(itemId); console.log(item); console.log(e); }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={[this.getSelectedItem(this.state)]}
                                onChange={this.outputPropertiesItens.bind(this)}
                            />
                        }
                    />
                }
            />
        );
    }
}
EditorTab.contextType = CodeEditorContext;