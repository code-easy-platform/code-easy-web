import React from 'react';

import { Tab, ComponentConfigs, ItemComponent, ItemFlowComplete } from '../../../shared/interfaces/Aplication';
import { TreeItensTypes } from '../../../shared/components/tree-manager/shared/models/TreeItensTypes';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { IItem, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';
import { EditorTabTemplate } from '../../../shared/components/resize-tamplate/EditorTabTemplate';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import ColRightTemplate from '../../../shared/components/resize-tamplate/ColRightTemplate';
import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { ComponentType } from '../../../shared/enuns/ComponentType';

const itensLogica: FlowItem[] = [
    new FlowItem({ id: '1', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "START", itemType: ItemType.START }),
    new FlowItem({ id: '2', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "ACTION", itemType: ItemType.ACTION }),
    new FlowItem({ id: '3', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "IF", itemType: ItemType.IF }),
    new FlowItem({ id: '4', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH }),
    new FlowItem({ id: '6', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH }),
    new FlowItem({ id: '7', sucessor: ['0'], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN }),
    new FlowItem({ id: '8', sucessor: [], top: 0, left: 0, width: 0, height: 0, isSelected: false, name: "END", itemType: ItemType.END }),
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
                new ItemFlowComplete({
                    id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                        id: "1",
                        value: "START",
                        label: "Label",
                        typeValue: TypeValues.string,
                    },
                    {
                        id: "2",
                        value: "Descrição",
                        label: "Description",
                        typeValue: TypeValues.bigstring,
                    }]
                }),
                new ItemFlowComplete({
                    id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                        id: "1",
                        value: "IF",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                        id: "1",
                        value: "FOREACH",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                        id: "1",
                        value: "ACTION",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                        id: "1",
                        value: "SWITCH",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                        id: "1",
                        value: "ASSIGN",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
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
                new ItemFlowComplete({
                    id: '1', sucessor: ['2'], top: 100, left: 80, width: 50, height: 50, name: "START", itemType: ItemType.START, isSelected: false, properties: [{
                        id: "1",
                        value: "START",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '2', sucessor: ['3'], top: 200, left: 80, width: 50, height: 50, isSelected: false, name: "IF", itemType: ItemType.IF, properties: [{
                        id: "1",
                        value: "IF",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '3', sucessor: ['4'], top: 300, left: 80, width: 50, height: 50, isSelected: false, name: "FOREACH", itemType: ItemType.FOREACH, properties: [{
                        id: "1",
                        value: "FOREACH",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '4', sucessor: ['5'], top: 400, left: 80, width: 50, height: 50, isSelected: false, name: "ACTION", itemType: ItemType.ACTION, properties: [{
                        id: "1",
                        value: "ACTION",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '5', sucessor: ['6'], top: 500, left: 80, width: 50, height: 50, isSelected: false, name: "SWITCH", itemType: ItemType.SWITCH, properties: [{
                        id: "1",
                        value: "SWITCH",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
                new ItemFlowComplete({
                    id: '6', sucessor: ['7'], top: 600, left: 80, width: 50, height: 50, isSelected: false, name: "ASSIGN", itemType: ItemType.ASSIGN, properties: [{
                        id: "1",
                        value: "ASSIGN",
                        label: "Label",
                        typeValue: TypeValues.string,
                    }]
                }),
            ]
        })
    ]
});

export default class EditorTab extends React.Component {
    // private codeEditorContext: any = this.context;

    state = {
        tab: mockTab,
        currentFocus: CurrentFocus.tree,
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
                                label: 'Label',
                                value: itens[itemIndex].label,
                                typeValue: TypeValues.string
                            },
                            {
                                id: '2',
                                label: 'Description',
                                value: itens[itemIndex].description,
                                typeValue: TypeValues.bigstring
                            },
                            {
                                id: '3',
                                label: "Enabled",
                                typeValue: TypeValues.boolean,
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
                            properties: [{ id: '1', label: 'Label', typeValue: TypeValues.string, value: updatedItem.name }],
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
    }

    private codeEditorOnDropItem(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem {

        if (newItem.itemType.toString() === TreeItensTypes.file.toString()) {
            newItem.itemType = ItemType.ACTION;
        }

        this.setState({ currentFocus: CurrentFocus.flow });

        return newItem;

    }

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
                        toolItens={itensLogica}
                        allowDropTo={[TreeItensTypes.file]}
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
