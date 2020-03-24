import React, { Component } from 'react';
import { TreeManager, TreeItensTypes } from 'code-easy-components';

import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { EditorTabTemplate } from './components/resize-tamplate/EditorTabTemplate';
import { FlowEditor } from './../../../shared/components/code-editor/CodeEditor';
import ColRightTemplate from './components/resize-tamplate/ColRightTemplate';
import { IItem, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';

const itensLogica: FlowItem[] = [
    new FlowItem({ id: 1, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "START", itemType: ItemType.START }),
    new FlowItem({ id: 2, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: 3, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: 4, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: 6, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: 7, sucessor: [0], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: 8, sucessor: [], top: 0, left: 0, width: 0, height: 0, isSelecionado: false, nome: "END", itemType: ItemType.END }),
];
const itensArvore = [
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
const itens: IItem[] = [
    {
        id: 1,
        name: 'IF',
        isHeader: true,
        properties: [
            {
                id: 1,
                label: 'Name',
                value: 'IF',
                typeValue: TypeValues.string
            },
            {
                id: 2,
                label: 'Condiction',
                value: 'true',
                typeValue: TypeValues.boolean
            },
        ]
    }
]

export default class EditorTab extends Component {

    private itens: FlowItem[] = [
        new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
        new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
        new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
        new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
        new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
        new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
        new FlowItem({ id: 7, sucessor: [], top: 700, left: 80, width: 50, height: 50, isSelecionado: false, nome: "END", itemType: ItemType.END }),
    ];

    private outItens = (updatedItens: FlowItem[]) => {

        console.log(updatedItens);

    }

    render() {
        return (
            <EditorTabTemplate
                columnCenter={
                    <FlowEditor
                        onChangeItens={this.outItens}
                        toolItens={itensLogica}
                        isShowToolbar={true}
                        itens={this.itens}
                    />
                }
                columnRight={
                    <ColRightTemplate
                        rowTop={
                            <TreeManager
                                onClick={itemId => { console.log(itemId) }}
                                itemBase={{ itemId: "0", itemLabel: "Item 01", isSelected: false, itemChilds: itensArvore, itemType: TreeItensTypes.folder, nodeExpanded: false }}
                                onContextMenu={(itemId, e) => { e.preventDefault(); console.log(itemId); console.log(e); }}
                                onDoubleClick={(itemId, item, e) => { console.log(itemId); console.log(item); console.log(e); }}
                            />
                        }
                        rowBottom={<PropertiesEditor itens={itens} />}
                    />
                }
            />
        );
    }
}
