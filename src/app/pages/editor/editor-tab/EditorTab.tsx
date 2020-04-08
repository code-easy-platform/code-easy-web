import React from 'react';

import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { AlertService, AlertTypes } from '../../../shared/components/botton-status-bar/AlertService';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { IItem, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { Tab, ComponentConfigs, ItemComponent } from '../../../shared/interfaces/Aplication';
import ColRightTemplate from '../../../shared/components/resize-tamplate/ColRightTemplate';
import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { ComponentType } from '../../../shared/enuns/ComponentType';

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

const mockTab: Tab = new Tab({
    configs: new ComponentConfigs({
        id: '1',
        name: "actions",
        isExpanded: true,
        label: "Actions",
        isEditando: false,
        description: "Minha tab de actions",
        type: ComponentType.tabActions,
    }),
    itens: [
        new ItemComponent({
            id: '2',
            name: 'authenticate',
            label: "authenticate",
            description: "Autentica os usuários!",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: undefined,
            type: TreeItensTypes.file,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
            ]
        }),
        new ItemComponent({
            id: '1',
            name: 'signup',
            label: "signup",
            description: "Cadastra novos usuários!",
            isEditing: true,
            isSelected: true,
            nodeExpanded: true,
            itemPaiId: undefined,
            type: TreeItensTypes.file,
            itens: [
                new FlowItem({ id: 1, sucessor: [2], top: 100, left: 80, width: 50, height: 50, isSelecionado: false, nome: "START", itemType: ItemType.START }),
                new FlowItem({ id: 2, sucessor: [3], top: 200, left: 80, width: 50, height: 50, isSelecionado: false, nome: "IF", itemType: ItemType.IF }),
                new FlowItem({ id: 3, sucessor: [4], top: 300, left: 80, width: 50, height: 50, isSelecionado: false, nome: "FOREACH", itemType: ItemType.FOREACH }),
                new FlowItem({ id: 4, sucessor: [5], top: 400, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ACTION", itemType: ItemType.ACTION }),
                new FlowItem({ id: 5, sucessor: [6], top: 500, left: 80, width: 50, height: 50, isSelecionado: false, nome: "SWITCH", itemType: ItemType.SWITCH }),
                new FlowItem({ id: 6, sucessor: [7], top: 600, left: 80, width: 50, height: 50, isSelecionado: false, nome: "ASSIGN", itemType: ItemType.ASSIGN }),
            ]
        })
    ]
});

export default class EditorTab extends React.Component {
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
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });
    }



    private propertiesEditorOutputItens(itens: IItem[]) {

        if (this.state.currentFocus === CurrentFocus.tree) {
            itens.forEach(item => {

                let itemSelected = this.state.tab.itens.find(itemTree => (itemTree.isSelected && itemTree.id === item.id.toString()));

                if (itemSelected) {
                    itemSelected.label = item.properties[0].value;
                    itemSelected.description = item.properties[1].value;
                }

            });
        } else if (this.state.currentFocus === CurrentFocus.flow) {

            let itensSelected = this.codeEditorGetItensLogica(this.state.tab.itens).filter(item => item.isSelecionado);

            itensSelected.forEach((item, index) => {

                item.id = itens[index].id;
                item.nome = itens[index].properties[0].value;

            });

        }


        this.setState({ tab: { ...this.state.tab } });

        this.setState({
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });

    }

    private propertiesEditorGetSelectedItem(itens: ItemComponent[]): IItem[] {

        let itemIndex = itens.findIndex(item => item.isSelected);

        if (!(itemIndex < 0)) {
            if (this.state.currentFocus === CurrentFocus.tree) {
                return [
                    {
                        isHeader: true,
                        name: itens[itemIndex].label,
                        // TODO: Ajustar o itemId para não ser any assim que as outras estruturas estiverem prontas.
                        id: parseInt(itens[itemIndex].id as any),
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
            currentFocus: CurrentFocus.flow,
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

    private codeEditorGetItensLogica(itens: ItemComponent[]): FlowItem[] {

        let itemEditing = itens.find(item => item.isEditing);

        if (itemEditing) {
            itemEditing.itens.sort((a, b) => (a.top - b.top));

            return itemEditing.itens
        } else {
            return [];
        }

    }

    private codeEditorRemoveItem(data: any) {
        console.log(data);

        let itemEditing = this.state.tab.itens.find(item => item.isEditing);

        if (itemEditing) {

            /* const index = itemEditing.itens.findIndex(item => item.id.toString() === itemId);
            if (index < 0) return;

            itemEditing.itens.splice(index, 1);

            this.setState({
                tab: this.state.tab,
                tree: this.treeManagerGetTree(this.state.tab.itens),
                itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
                propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
            }); */

            return;
        } else {
            return;
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

        this.setState({
            currentFocus: CurrentFocus.tree,
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

        this.setState({
            currentFocus: CurrentFocus.tree,
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

        this.setState({
            currentFocus: CurrentFocus.tree,
            tab: { ...this.state.tab, itens },
            tree: this.treeManagerGetTree(itens),
            itensLogica: this.codeEditorGetItensLogica(itens),
            propEditor: this.propertiesEditorGetSelectedItem(itens),
        });

    }

    private treeManagerGetTree(itens: ItemComponent[]): TreeInterface[] {

        const loadChilds = (tree: TreeInterface): TreeInterface[] => {

            // Busca todos os itens que tem como pai o elemento corrente
            itens.filter((item) => {
                return item.itemPaiId === tree.itemId;
            }).forEach(item => {
                // TODO: Ajustar o itemId para não ser any assim que as outras estruturas estiverem prontas.
                tree.itemChilds.push({ itemChilds: [], itemId: item.id as any, itemLabel: item.label, itemType: item.type, nodeExpanded: item.nodeExpanded, isSelected: false });
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
            // TODO: Ajustar o itemId para não ser any assim que as outras estruturas estiverem prontas.
            tree.push({ itemChilds: [], itemId: item.id as any, itemLabel: item.label, itemType: item.type, nodeExpanded: item.nodeExpanded, isSelected: false });
        });

        // Carrega os filhos de cada item da árvore
        tree.forEach(itemTree => {
            itemTree.itemChilds = loadChilds(itemTree);
        });

        return tree;
    }

    private treeManagerRemoveItem(itemId: string) {
        const index = this.state.tab.itens.findIndex(item => item.id === itemId);

        if (index < 0) return;
        this.state.tab.itens.splice(index, 1);

        this.setState({
            tab: this.state.tab,
            currentFocus: CurrentFocus.tree,
            tree: this.treeManagerGetTree(this.state.tab.itens),
            itensLogica: this.codeEditorGetItensLogica(this.state.tab.itens),
            propEditor: this.propertiesEditorGetSelectedItem(this.state.tab.itens),
        });

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
                        onContextMenu={(data, e) => {
                            /*  ContextMenuService.sendMessage(e?.clientX || 0, e?.clientY || 0, [
                                 {
                                     action: () => {this.codeEditorRemoveItem.bind(this)(data);},
                                     label: 'Excluir'
                                 }
                             ]); */
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
                                    ContextMenuService.sendMessage(e.clientX, e.clientY, [
                                        {
                                            action: () => this.treeManagerRemoveItem.bind(this)(itemId),
                                            label: 'Excluir'
                                        }
                                    ]);
                                }}
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
