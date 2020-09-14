import React, { useCallback } from 'react';
import { Utils } from 'code-easy-components';

import { PropertiesEditor, IProperty, TypeOfValues, IItem } from '../../../shared/components/properties-editor';
import { ContextModalListService } from '../../../shared/components/context-modais/ContextModalListService';
import { EComponentType, ECurrentFocus, PropertieTypes } from '../../../shared/enuns';
import { FlowItemComponent, TreeItemComponent, Tab } from '../../../shared/models';
import { EItemType } from '../../../shared/components/flow-editor';
import { useEditorContext } from '../../../shared/contexts';

export const PropertiesEditorController: React.FC = () => {

    const { project, setProject, getItemTreeEditing, getItemTreeByName } = useEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = useCallback(() => setProject(project), [project, setProject]);

    /** O editor de propriedades emite a lista de propriedades alteradas */
    const handleOnChangeItems = useCallback((item: IItem) => {

        if (project.currentComponentFocus === ECurrentFocus.tree) {

            if (item.id) return;

            project.tabs.forEach((tab: Tab) => {
                tab.items.forEach(itemTree => {
                    if (itemTree && itemTree.isSelected && itemTree.id === item.id) {

                        // Este bloco garante que se a label de uma routa muda o seu path será alterado junto.
                        if (itemTree.type === EComponentType.routerConsume || itemTree.type === EComponentType.routerExpose) {
                            const newLabel = item.properties.find(prop => prop.propertieType === PropertieTypes.label);
                            item.properties.forEach(prop => {
                                if (prop.propertieType === PropertieTypes.url) {
                                    prop.value = `/${Utils.getNormalizedString(newLabel ? newLabel.value : prop.value).toLowerCase()}`;
                                }
                            });
                        }

                        // Atualizas as props
                        itemTree.properties = item.properties;
                    }
                });
            });

        } else if (project.currentComponentFocus === ECurrentFocus.flow) {

            project.tabs.forEach(tab => {

                /** Tree item on is the flow item being edited */
                let treeItemEditing = tab.items.find(treeItem => treeItem.items.some(flowItem => flowItem.id === item.id));
                if (!treeItemEditing) return;

                /** Flow item being edited */
                let editingFlowItem = treeItemEditing.items.find(flowItem => flowItem.id === item.id);
                if (!editingFlowItem) return;

                if (editingFlowItem.itemType === EItemType.ACTION) {

                    // Pega a antiga action
                    const oldActionProp = editingFlowItem.properties.find(itemOld => itemOld.propertieType === PropertieTypes.action);
                    if (!oldActionProp) return;

                    // Pega a nova action
                    const newSelectedActionProp = item.properties.find(itemNew => itemNew.propertieType === PropertieTypes.action);
                    if (!newSelectedActionProp) return;

                    // Compara os dois nomes, se mudou apaga todos os parâmetro da action anterior.
                    if ((oldActionProp?.value !== '') && (oldActionProp?.value !== newSelectedActionProp?.value)) {
                        // Encontra o promeiro parametro e remove, depois encontra os outros e irá remover eté não restar mais parâmetros
                        let indexToRemove = item.properties.findIndex(itemOld => itemOld.propertieType === PropertieTypes.param);
                        while (indexToRemove >= 0) {
                            item.properties.splice(indexToRemove, 1);
                            indexToRemove = item.properties.findIndex(itemOld => itemOld.propertieType === PropertieTypes.param);
                        }
                    }

                    // Altera a label do componente de fluxo
                    item.properties.forEach(prop => {
                        if (prop.propertieType === PropertieTypes.label) {

                            // Pega a action selecionada pelo seu nome
                            let actionByName: TreeItemComponent | undefined;
                            project.tabs.forEach(currentTab => {
                                actionByName = currentTab.items.find(treeItem => treeItem.name === newSelectedActionProp?.value);
                            });
                            if (!actionByName) return;

                            // Pega prop label da action selecionada
                            const actionLabelProp = actionByName.properties.find(propAction => propAction.propertieType === PropertieTypes.label);
                            if (!actionLabelProp) return;

                            // Altera o valor da label
                            prop.value = actionLabelProp.value || prop.value;
                        }
                    });
                }

                // Reinstancia a classe para revalidar as propriedade e mais
                editingFlowItem = new FlowItemComponent({
                    ...editingFlowItem,
                    properties: item.properties,
                });

                treeItemEditing = new TreeItemComponent({
                    ...treeItemEditing,
                    items: [
                        ...treeItemEditing.items.filter(flowItem => flowItem.id !== editingFlowItem?.id),
                        editingFlowItem,
                    ]
                });

                tab.items = [
                    ...tab.items.filter(flowItem => flowItem.id !== treeItemEditing?.id),
                    treeItemEditing,
                ];
            });
        };

        onChangeState();
    }, [project, onChangeState]);

    /** Devolve para o editor de propriedades as propriedades do item selecionado no momento. */
    const getSelectedItem = useCallback((currentFocus: ECurrentFocus): IItem => {
        const nullRes = {
            id: '',
            name: '',
            properties: [],
            isHeader: false,
        }

        // Map a selected tree item.
        if (currentFocus === ECurrentFocus.tree) {

            const tab = project.tabs.find((tab: Tab) => tab.items.find(item => item.isSelected));
            if (!tab) return nullRes;
            const res = tab.items.find(item => item.isSelected);
            if (!res) return nullRes;
            else {
                return {
                    id: res.id,
                    subname: res.type,
                    name: res.properties.find(prop => prop.propertieType === PropertieTypes.label)?.value,
                    properties: res.properties.map(prop => {
                        if (prop.id && prop.name) {
                            prop.onPickerValueClick = () => ContextModalListService.showModal({ editingId: prop.id || '' });
                        }
                        return prop;
                    })
                };
            }

        } else if (currentFocus === ECurrentFocus.flow) { // Mapeia os items de fluxo

            /** Get editing item tree */
            const editingItemTree = getItemTreeEditing();

            /** Get all selected items in the flow editor */
            const selectedItems = editingItemTree?.items.filter(flowItem => flowItem.isSelected);

            // Found nothing to edit or selected
            if (!editingItemTree || !selectedItems || selectedItems.length === 0) return nullRes;

            // If more than one is selected, returns the selected quantity
            if (selectedItems.length > 1) {
                return {
                    name: `${selectedItems.length} items selecteds`,
                    subname: 'Selection',
                    properties: [],
                    id: undefined,
                }
            }

            /** Item selected in the flow */
            const selectedItem = selectedItems[0];

            // Start mapped item
            let mappedItem: IItem = {
                id: selectedItem.id,
                subname: selectedItem.itemType,
                properties: selectedItem.properties,
                name: selectedItem.properties.find(prop => prop.propertieType === PropertieTypes.label)?.value,
            };

            /**
             * Return all local variables as suggestions.
             */
            const getAllLocalVariablesAsSuggestion = () => {

                /** Current tab from editing item */
                const currentTab = project.tabs.find(tab => tab.items.some(tabItem => tabItem.items.some(tabItemFlowItem => tabItemFlowItem.id === selectedItem.id)));
                if (!currentTab) return [];

                /** 
                 * Take all variables from the tree item that is currently being
                 * edited to put as suggestions of the item being mapped
                 */
                const allVariablesToSuggestions = currentTab.items.filter(treeItemToParams => (
                    (treeItemToParams.itemPaiId === editingItemTree.id) &&
                    (
                        treeItemToParams.type === EComponentType.inputVariable ||
                        treeItemToParams.type === EComponentType.localVariable ||
                        treeItemToParams.type === EComponentType.outputVariable
                    )
                ));

                return allVariablesToSuggestions;
            }

            /**
             * Return all input params by action name
             * @param actionName Action name
             */
            const getAllInputParamsFromActionByName = (actionName: string) => {

                /** Action selected */
                const action = getItemTreeByName(actionName);
                if (!action) return [];

                const res: IProperty[] = [];

                /** Get all input params from action selected */
                let inputParams: TreeItemComponent[] = [];
                project.tabs.forEach(tab => {
                    inputParams = [
                        ...inputParams,
                        ...tab.items.filter(treeItem => (treeItem.itemPaiId === action.id && treeItem.type === EComponentType.inputVariable)),
                    ];
                });

                // Adiciona cada parâmetro como uma prop da action atual
                inputParams.forEach(param => {

                    // Se a prop/param já estiver no fluxo não acontece nada
                    if (!mappedItem.properties.some(propertie => propertie.id === param.id)) {
                        res.push({
                            value: '',
                            id: param.id,
                            group: 'Params',
                            name: param.label,
                            type: TypeOfValues.expression,
                            propertieType: PropertieTypes.param,
                            information: param.description !== '' ? param.description : undefined,
                            onPickerValueClick: () => !param.id ? null : ContextModalListService.showModal({ editingId: param.id }),
                            suggestions: getAllLocalVariablesAsSuggestion()
                                .map(suggest => ({
                                    disabled: false,
                                    name: suggest.name,
                                    value: suggest.name,
                                    label: suggest.label,
                                    description: suggest.description,
                                })),
                        });
                    }
                });

                return res;
            }

            /**
             * Pega todos os parâmetros de entrada da action selecionada e adiciona como props
             */
            let allParamsToProps: IProperty[] = [];
            mappedItem.properties = [
                ...mappedItem.properties.map(mappedItemProp => {
                    switch (mappedItemProp.propertieType) {
                        case PropertieTypes.action:

                            /** Tranforma a action atual em tipo de campo selection */
                            mappedItemProp.type = TypeOfValues.selection;
                            mappedItemProp.suggestions = [];

                            project.tabs.forEach(tab => {
                                tab.items.forEach(tabItem => {

                                    // Filtra todas as actions globais ou extensions para criar as sugestões para a action.
                                    if (tabItem.id && (tabItem.type === EComponentType.globalAction || tabItem.type === EComponentType.extension)) {
                                        mappedItemProp = {
                                            ...mappedItemProp,
                                            suggestions: [
                                                ...mappedItemProp.suggestions || [],
                                                {
                                                    disabled: false,
                                                    name: tabItem.name,
                                                    value: tabItem.name,
                                                    label: tabItem.label,
                                                    description: tabItem.description,
                                                }
                                            ]
                                        }
                                    }

                                });
                            });

                            allParamsToProps = getAllInputParamsFromActionByName(mappedItemProp.value);

                            break;

                        default:
                            break;
                    }

                    return mappedItemProp;
                })
            ];

            // Adiciona nas props os parâmetros encontrados acima
            mappedItem.properties = [
                ...mappedItem.properties,
                ...allParamsToProps,
            ];

            // Mapea os items para modal
            mappedItem.properties.map(prop => {
                if (prop.id && prop.name) {
                    prop.onPickerValueClick = () => ContextModalListService.showModal({ editingId: prop.id || '' });
                };
                return prop;
            });

            return mappedItem;
        }

        return nullRes;
    }, [getItemTreeByName, getItemTreeEditing, project.tabs]);

    return (
        <PropertiesEditor
            onChange={handleOnChangeItems}
            item={getSelectedItem(project.currentComponentFocus)}
        />
    );
}
