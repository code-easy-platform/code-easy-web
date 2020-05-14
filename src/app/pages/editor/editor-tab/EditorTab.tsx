import React from 'react';

import { TwoVerticalColumnsResizable } from '../../../shared/components/resizable-columns/TwoVerticalColumnsResizable';
import { IItem, TypeValues, IProperties } from '../../../shared/components/properties-editor/shared/interfaces';
import { CodeEditorContext, ICodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { TwoColumnsResizable } from '../../../shared/components/resizable-columns/TwoColumnsResizable';
import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { PropertiesEditor } from './../../../shared/components/properties-editor/PropertiesEditor';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { FlowItem, ItemType } from './../../../shared/components/code-editor/models/ItemFluxo';
import { Tab, ItemComponent, ItemFlowComplete } from '../../../shared/interfaces/Aplication';
import { IContextItemList } from './../../../shared/components/context-menu/ContextMenu';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { OutputPanel } from '../../../shared/components/output-panel/OutputPanel';
import { ProblemsHelper } from '../../../shared/services/helpers/ProblemsHelper';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { OutputHelper } from '../../../shared/services/helpers/OutputHelper';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { Utils } from '../../../shared/services/Utils';
import { AssetsService } from '../../../shared/services/AssetsService';
import { BreadCampButton } from '../../../shared/components/code-editor/shared/Interfaces/CodeEditorInterfaces';


enum CurrentFocus {
    tree = "tree",
    flow = "flow"
}

export default class EditorTab extends React.Component {
    private editorContext: ICodeEditorContext = this.context;

    state: { currentFocus: CurrentFocus } = {
        currentFocus: CurrentFocus.tree,
    }


    private onChangeState = () => this.editorContext.updateProjectState(this.editorContext.project);


    //#region Editor de propriedades

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
    private propertiesEditorGetNewProperties(itemType: ItemType | ComponentType, name: string): IProperties[] {
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

            case ComponentType.router:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "" },
                    { id: Utils.getUUID(), name: 'Url', type: TypeValues.string, value: "/newroute" },
                ];

            case ComponentType.globalAction:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "" },
                ];

            case ComponentType.inputVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "" },
                    { id: Utils.getUUID(), name: 'Data type', type: TypeValues.expression, value: "" },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "" },
                ];

            case ComponentType.localVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "" },
                    { id: Utils.getUUID(), name: 'Data type', type: TypeValues.expression, value: "" },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "" },
                ];

            case ComponentType.outputVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "" },
                    { id: Utils.getUUID(), name: 'Data type', type: TypeValues.expression, value: "" },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "" },
                ];

            default:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: '<tipo de item não encontrado>' },
                ];
        }
    }

    //#endregion


    //#region Editor de fluxo

    /** Toda vez que houver uma alteração nos itens de fluxo está função será executada. */
    private codeEditorOutputFlowItens = (updatedItens: FlowItem[]) => {
        // console.table(updatedItens);

        // Atualiza o currentFocus da tab
        this.setState({ currentFocus: CurrentFocus.flow });

        // Encontra a tab certa e atualiza os itens
        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.isEditing) {
                    let newItens: ItemFlowComplete[] = [];

                    // Atualiza os itens do item da arvore.
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
                } else {
                    item.itens.forEach(flowItem => flowItem.isSelected = false);
                }
            });
        });

        // Atualiza o context do projeto
        this.onChangeState();
    }

    /** Ao soltar um novo item permitido no editor está função será executada.
     * 
     * Por aqui pode ser feito alterações no item dropado no fluxo.
     */
    private codeEditorOnDropItem(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem {

        if (newItem.itemType.toString() === ComponentType.globalAction.toString() || newItem.itemType.toString() === ComponentType.localAction.toString()) {
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
                    hasError: item.properties.some(prop => (prop.valueHasError || prop.nameHasError)),
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
    private codeEditorGetBreadcamps(): BreadCampButton[] {

        let breadcamps: BreadCampButton[] = [];

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            tab.itens.forEach(item => {
                if (item.isEditing) {

                    breadcamps.push({
                        label: tab.configs.label,
                        onClick: () => { }
                    });

                    breadcamps.push({
                        label: item.label,
                        onClick: () => { }
                    });

                }
            });
        });

        return breadcamps;
    }

    //#endregion


    //#region Tree manager

    /** Quando um item for dropado na árvore está função será chamada */
    private treeManagerOnDropItem(targetId: string, droppedId: string, droppedItem: any) {

        this.setState({ currentFocus: CurrentFocus.tree });

        // Evita loop infinito
        if (targetId === droppedId) return;

        // Pega a lista de itens corrente na árvore
        let itens: ItemComponent[] = [];
        this.editorContext.project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
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
            tab.itens.forEach(item_loop => {
                if (item_loop.id === itemTreeId) {
                    item_loop.isSelected = true;
                    item_loop.nodeExpanded = !item_loop.nodeExpanded;
                } else {
                    item_loop.isSelected = false;
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

                /** Valida para que seja editado somente se for actions ou routers */
                if (item.type === ComponentType.globalAction || item.type === ComponentType.localAction || item.type === ComponentType.router) {
                    if (item.id === itemTreeId) {
                        item.isEditing = true;
                    } else {
                        item.isEditing = false;
                    }
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
            if (tab.configs.isEditing) {
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
                    canDropList: [],
                    label: item.label,
                    isEditing: item.isEditing,
                    isSelected: item.isSelected,
                    description: item.description,
                    nodeExpanded: item.nodeExpanded,
                    icon: AssetsService.getIcon(item.type),
                    hasError: item.itens.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
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
                label: item.label,
                isEditing: item.isEditing,
                isSelected: item.isSelected,
                description: item.description,
                nodeExpanded: item.nodeExpanded,
                icon: AssetsService.getIcon(item.type),
                canDropList: [ComponentType.inputVariable, ComponentType.localVariable, ComponentType.outputVariable],
                hasError: item.itens.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
            });
        });

        // Carrega os filhos de cada item da árvore
        tree.forEach(itemTree => {
            itemTree.childs = loadChilds(itemTree);
        });

        return [{
            childs: tree,
            id: undefined,
            isSelected: false,
            nodeExpanded: true,
            isDisabledDrag: true,
            isDisabledSelect: true,
            type: ComponentType.grouper,
            icon: AssetsService.getIcon(ComponentType.grouper),
            label: this.editorContext.project.tabs.find(item => item.configs.isEditing)?.configs.label || '',
        }];
    }

    /** Remove itens da árvore */
    private treeManagerRemoveItem(inputItemId: string | undefined) {
        this.setState({ currentFocus: CurrentFocus.tree });

        // Pega a lista de itens corrente na árvore
        let indexTabToRemove: number | any;
        let indexItemToRemove: number | any;
        this.editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
            tab.itens.forEach((item, index) => {
                if (item.id === inputItemId) {
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

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    private treeManagerContextMenu(itemId: string | undefined): IContextItemList[] {
        this.setState({ currentFocus: CurrentFocus.tree });

        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: ComponentType.inputVariable | ComponentType.localVariable | ComponentType.outputVariable) => {
            let tabIndex: number | undefined;
            this.editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
                tab.itens.forEach(item => {
                    if (item.id === inputItemId) {
                        tabIndex = indexTab
                    }
                });
            });

            if (tabIndex !== undefined) {
                this.editorContext.project.tabs[tabIndex].itens.push(new ItemComponent({
                    id: Utils.getUUID(),
                    itens: [],
                    description: '',
                    type: paramType,
                    isSelected: true,
                    isEditing: false,
                    name: 'newparam',
                    label: 'newparam',
                    nodeExpanded: true,
                    itemPaiId: inputItemId,
                    properties: this.propertiesEditorGetNewProperties(paramType, 'newparam'),
                }));
            }

            this.onChangeState();
        }

        const addRoute = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                this.editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.configs.isEditing) {
                        tabIndex = indexTab;
                    }
                });

                if (tabIndex !== undefined) {
                    this.editorContext.project.tabs[tabIndex].itens.push(new ItemComponent({
                        itens: [],
                        isEditing: true,
                        description: '',
                        isSelected: true,
                        name: 'newrouter',
                        nodeExpanded: true,
                        label: 'newrouter',
                        id: Utils.getUUID(),
                        itemPaiId: inputItemId,
                        type: ComponentType.router,
                        properties: this.propertiesEditorGetNewProperties(ComponentType.router, 'newrouter'),
                    }));
                }
            }
            this.onChangeState();
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                this.editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.configs.isEditing) {
                        tabIndex = indexTab;
                    }
                });

                if (tabIndex !== undefined) {
                    this.editorContext.project.tabs[tabIndex].itens.push(new ItemComponent({
                        id: Utils.getUUID(),
                        itens: [],
                        description: '',
                        isSelected: true,
                        isEditing: true,
                        name: 'newaction',
                        nodeExpanded: true,
                        label: 'newaction',
                        itemPaiId: inputItemId,
                        type: ComponentType.globalAction,
                        properties: this.propertiesEditorGetNewProperties(ComponentType.globalAction, 'newaction'),
                    }));
                }
            }
            this.onChangeState()
        }

        this.editorContext.project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                if (tab.configs.type === ComponentType.tabRouters) {

                    options.push({
                        action: () => addRoute(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new route'
                    });

                } else if (tab.configs.type === ComponentType.tabActions) {

                    options.push({
                        action: () => addAction(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new action'
                    });

                } else if (tab.configs.type === ComponentType.tabDates) {

                }

                tab.itens.forEach(item => {
                    if (item.id === itemId) {
                        switch (item.type) {
                            case ComponentType.globalAction:
                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case ComponentType.localAction:
                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case ComponentType.router:
                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input param'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output param'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            default:
                                break;
                        }
                    }
                });

            }
        });

        if (itemId !== undefined) {
            options.push({
                action: () => this.treeManagerRemoveItem(itemId),
                disabled: itemId === undefined,
                useConfirmation: true,
                label: 'Delete'
            });
        }

        return options;
    }

    private treeManagerKeyDowm(e: React.FocusEvent<HTMLDivElement> | any) {
        if (e.key === 'Delete') {
            let itens: ItemComponent[] = [];
            this.editorContext.project.tabs.forEach((tab: Tab) => {
                if (tab.configs.isEditing) {
                    itens = tab.itens;
                }
            });

            const itemToEdit = itens.find(item => item.isSelected);
            if (itemToEdit) {
                this.treeManagerRemoveItem(itemToEdit.id);
            }

        }
    }

    //#endregion



    render() {
        const flowEditorItens = this.codeEditorGetItensLogica.bind(this)();
        return (
            <TwoColumnsResizable
                aligment="right"
                id="EditorTabCenter"
                columnLeft={
                    <TwoVerticalColumnsResizable
                        id="TwoVerticalColumnsResizableOutput"
                        useMinHeight={false}
                        top={
                            <div className="flex1 overflow-auto">
                                <FlowEditor
                                    id={"CODE_EDITOR"}
                                    showToolbar={true}
                                    itens={flowEditorItens}
                                    toolItens={this.codeEditorGetToolBoxItens()}
                                    enabledSelection={flowEditorItens.length !== 0}
                                    onDropItem={this.codeEditorOnDropItem.bind(this)}
                                    onChangeItens={this.codeEditorOutputFlowItens.bind(this)}
                                    breadcrumbs={this.codeEditorGetBreadcamps.bind(this)()}
                                    allowedsInDrop={[ComponentType.globalAction, ComponentType.localAction]}
                                    onContextMenu={(data, e) => {
                                        if (e) {
                                            e.preventDefault();
                                            ContextMenuService.showMenu(e.clientX, e.clientY, this.codeEditorContextMenu.bind(this)(data));
                                        }
                                    }}
                                />
                            </div>
                        }
                        bottom={
                            <OutputPanel
                                problems={ProblemsHelper.getProblems(this.editorContext.project)}
                                output={OutputHelper.getOutput(this.editorContext.project)}
                            />
                        }
                    />
                }
                columnRight={
                    <div className="flex1 background-panels">
                        <TwoVerticalColumnsResizable
                            id="EditorTabRightVertical"
                            top={
                                <TreeManager
                                    isUseDrag={true}
                                    isUseDrop={true}
                                    onClick={this.treeManagerOnClick.bind(this)}
                                    onKeyDown={this.treeManagerKeyDowm.bind(this)}
                                    onDropItem={this.treeManagerOnDropItem.bind(this)}
                                    onDoubleClick={this.treeManagerOnDoubleClick.bind(this)}
                                    onContextMenu={(itemId, e) => {
                                        e.preventDefault();
                                        ContextMenuService.showMenu(e.clientX, e.clientY, this.treeManagerContextMenu.bind(this)(itemId));
                                    }}
                                    itens={this.treeManagerGetTree.bind(this)()}
                                />
                            }
                            bottom={
                                <PropertiesEditor
                                    onChangeInputWidth={width => console.log(width)}
                                    onChange={this.propertiesEditorOutputItens.bind(this)}
                                    itens={this.propertiesEditorGetSelectedItem.bind(this)(this.state.currentFocus)}
                                />
                            }
                        />
                    </div>
                }
            />
        );
    }

}
EditorTab.contextType = CodeEditorContext;
