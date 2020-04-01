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
const itensArvore: TreeInterface[] = [
    {
        itemId: "1", itemLabel: "Item 02", isSelected: false, itemChilds: [
            {
                itemId: "2", itemLabel: "Item 01", isSelected: false, itemChilds: [
                    {
                        itemId: "3", itemLabel: "Item 01", isSelected: false, itemChilds: [
                            {
                                itemId: "4", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                    {
                                        itemId: "5", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                            {
                                                itemId: "6", itemLabel: "Item 03", isSelected: false, itemChilds: [
                                                    {
                                                        itemId: "7", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                            {
                                                                itemId: "8", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                    {
                                                                        itemId: "9", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                            {
                                                                                itemId: "10", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                    {
                                                                                        itemId: "11", itemLabel: "Item 04", isSelected: false, itemChilds: [
                                                                                            {
                                                                                                itemId: "12", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                    {
                                                                                                        itemId: "13", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                            {
                                                                                                                itemId: "14", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                                    {
                                                                                                                        itemId: "15", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                                            {
                                                                                                                                itemId: "16", itemLabel: "Item 05", isSelected: false, itemChilds: [
                                                                                                                                    {
                                                                                                                                        itemId: "17", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                                                            {
                                                                                                                                                itemId: "18", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                                                                    {
                                                                                                                                                        itemId: "19", itemLabel: "Item 01", isSelected: false, itemChilds: [
                                                                                                                                                            { itemId: "20", itemLabel: "Item 01", isSelected: false, itemChilds: [], itemType: TreeItensTypes.folder, nodeExpanded: false }
                                                                                                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                                                                    }
                                                                                                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                                                            }
                                                                                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                                                    }
                                                                                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                                            },
                                                                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                                    }
                                                                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                            }
                                                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                                    }
                                                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                            }
                                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                                    },
                                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                            }
                                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                                    }
                                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                            }
                                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                                    }
                                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                            },
                                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                                    }
                                ], itemType: TreeItensTypes.folder, nodeExpanded: false
                            }
                        ], itemType: TreeItensTypes.folder, nodeExpanded: false
                    }
                ], itemType: TreeItensTypes.folder, nodeExpanded: false
            }
        ], itemType: TreeItensTypes.folder, nodeExpanded: false
    },
    { itemId: "21", itemLabel: "Item 03", isSelected: false, itemChilds: [], itemType: TreeItensTypes.file, nodeExpanded: false },
    { itemId: "22", itemLabel: "Item 04", isSelected: false, itemChilds: [], itemType: TreeItensTypes.file, nodeExpanded: false },
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
interface Tab {
    name: string,
    label: string,
    description: string,
    type: TabType,
    itens: {
        id: number,
        type: TreeItensTypes,
        label: string,
        isEditing: boolean,
        isSelected: boolean,
        description: string,
        nodeExpanded: boolean,
        itens: FlowItem[]
    }[]
}

const tab: Tab = {
    name: "actions",
    label: "Actions",
    description: "Minha tab de actions",
    type: TabType.actions,
    itens: [
        {
            id: 1,
            label: "Minha action",
            description: "Desc da minha action",
            type: TreeItensTypes.file,
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
                new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
            ]
        },
        {
            id: 2,
            label: "Minha action 2",
            description: "Desc da minha action",
            type: TreeItensTypes.file,
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
                new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
            ]
        }
    ]
}

interface IEditorTabState {
    itensFluxoLogica: FlowItem[];
    toolsItensFluxo: FlowItem[];
    itensArvore: TreeInterface[];
    itensProperties: IItem[];
}
export default class EditorTab extends Component {
    private codeEditorContext: any = this.context;

    state: IEditorTabState = {
        itensFluxoLogica: [],
        toolsItensFluxo: [],
        itensProperties: [],
        itensArvore: [],
    }

    componentDidMount = () => {
        let itensTree: TreeInterface[] = [];

        tab.itens.forEach(item => {
            itensTree.push({
                itemChilds: [],
                itemType: item.type,
                itemLabel: item.label,
                itemId: item.id.toString(),
                isSelected: item.isSelected,
                nodeExpanded: item.nodeExpanded
            });
        });

        console.log(itensTree);

        this.setState({
            itensFluxoLogica: itensFluxoLogica,
            toolsItensFluxo: itensLogica,
            itensArvore: itensTree,
        });

    }

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

    private outputPropertiesItens(itens: IItem[], itensFluxoLogica: FlowItem[]) {

        itens.forEach(item => {
            const index = itensFluxoLogica.findIndex(flowItem => flowItem.id === item.id);

            itensFluxoLogica[index].nome = item.name;

            this.setState({ itensFluxoLogica });

        });

    }

    render() {
        return (
            <EditorTabTemplate
                columnCenter={
                    <FlowEditor
                        itens={this.state.itensFluxoLogica}
                        onChangeItens={this.outputFlowItens}
                        toolItens={this.state.toolsItensFluxo}
                        isShowToolbar={true}
                    />
                }
                columnRight={
                    <ColRightTemplate
                        rowTop={
                            <TreeManager
                                isUseDrag
                                isUseDrop
                                onClick={itemId => { console.log(itemId) }}
                                itemBase={{ itemId: "0", itemLabel: "Item 01", isSelected: false, itemChilds: this.state.itensArvore, itemType: TreeItensTypes.folder, nodeExpanded: false }}
                                onContextMenu={(itemId, e) => { e.preventDefault(); console.log(itemId); console.log(e); }}
                                onDoubleClick={(itemId, item, e) => { console.log(itemId); console.log(item); console.log(e); }}
                            />
                        }
                        rowBottom={
                            <PropertiesEditor
                                itens={this.state.itensProperties}
                                onChange={itensProperties => this.outputPropertiesItens(itensProperties, this.state.itensFluxoLogica)}
                            />
                        }
                    />
                }
            />
        );
    }
}
EditorTab.contextType = CodeEditorContext;