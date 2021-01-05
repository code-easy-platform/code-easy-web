import React, { useCallback, useEffect, useState } from 'react';
import { ISubscription, observe, set, useObserverValue } from 'react-observing';

import { PropertiesEditor, IProperty, TypeOfValues, IItem } from '../../../shared/components/external';
import { EComponentType, ECurrentFocus, PropertieTypes } from '../../../shared/enuns';
import { TreeItemComponent } from '../../../shared/models';
import { CurrentFocusStore } from '../../../shared/stores';
import { useEditorContext } from '../../../shared/hooks';
import { openModal } from '../../../shared/services';

const useTreeItems = () => {
    const [items, setItems] = useState<TreeItemComponent[]>([]);

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);

    useEffect(() => {
        tabs.forEach(tab => {
            setItems(oldItems => {
                tab.items.value.forEach(item => {
                    if (!oldItems.some(oldItem => oldItem.id.value === item.id.value)) {
                        oldItems.push(item);
                    }
                });

                return oldItems;
            });
        });
    });

    return items;
}

export const PropertiesEditorController: React.FC = () => {
    const [itemPropertie, setItemPropertie] = useState<IItem>({
        properties: [],
        id: observe(''),
        name: observe(''),
        subname: observe(''),
    });

    const { project, getItemTreeEditing, getItemTreeByName } = useEditorContext();
    const currentFocus = useObserverValue(CurrentFocusStore);
    const items = useTreeItems();

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        if (currentFocus === ECurrentFocus.tree) {
            items.forEach(item => {

                // Select initial item
                if (item.isSelected.value) {
                    setItemPropertie({
                        id: item.id,
                        name: item.label,
                        subname: item.type,
                        properties: !item.properties.value
                            ? []
                            : item.properties.value.map(prop => {
                                return {
                                    ...prop,
                                    onPickerValueClick: observe(() => openModal(prop.id.value || ''))
                                };
                            })
                    });
                }

                // Subscribe in changes
                subscriptions.push(item.isSelected.subscribe(isSelected => {
                    console.log(isSelected)

                    if (isSelected) {
                        setItemPropertie({
                            id: item.id,
                            name: item.label,
                            subname: item.type,
                            properties: !item.properties.value
                                ? []
                                : item.properties.value.map(prop => {
                                    return {
                                        ...prop,
                                        onPickerValueClick: observe(() => openModal(prop.id.value || ''))
                                    };
                                })
                        });
                    }
                }));
            });
        } else if (currentFocus === ECurrentFocus.flow) {
            setItemPropertie({
                properties: [],
                id: observe(''),
                name: observe(''),
                subname: observe(''),
            });
        }

        return () => subscriptions.forEach(subs => subs?.unsubscribe())
    }, [currentFocus, items]);






    /** Devolve para o editor de propriedades as propriedades do item selecionado no momento. */
    const getSelectedItem = useCallback((currentFocus: ECurrentFocus): IItem => {
        const nullRes = {
            properties: [],
            id: observe(''),
            name: observe(''),
            subname: observe(''),
            isHeader: observe(false),
        }

        // Map a selected tree item.
        if (currentFocus === ECurrentFocus.flow) { // Mapeia os items de fluxo

            /** Get editing item tree */
            const editingItemTree = getItemTreeEditing();

            /** Get all selected items in the flow editor */
            const selectedItems = editingItemTree?.items.value.filter(flowItem => flowItem.isSelected.value);

            // Found nothing to edit or selected
            if (!editingItemTree || !selectedItems || selectedItems.length === 0) return nullRes;

            // If more than one is selected, returns the selected quantity
            if (selectedItems.length > 1) {
                return {
                    name: observe(`${selectedItems.length} items selecteds`),
                    subname: observe('Selection'),
                    id: observe(undefined),
                    properties: [],
                }
            }

            /** Item selected in the flow */
            const selectedItem = selectedItems[0];

            // Start mapped item
            let mappedItem: IItem = {
                id: selectedItem.id,
                name: selectedItem.label,
                subname: selectedItem.type,
                properties: selectedItem.properties.value || [],
            };

            /**
             * Return all local variables as suggestions.
             */
            const getAllLocalVariablesAsSuggestion = () => {

                /** Current tab from editing item */
                const currentTab = project.tabs.value.find(tab => tab.items.value.some(tabItem => tabItem.items.value.some(tabItemFlowItem => tabItemFlowItem.id === selectedItem.id)));
                if (!currentTab) return [];

                /** 
                 * Take all variables from the tree item that is currently being
                 * edited to put as suggestions of the item being mapped
                 */
                const allVariablesToSuggestions = currentTab.items.value.filter(treeItemToParams => (
                    (treeItemToParams.ascendantId === editingItemTree.id) &&
                    (
                        treeItemToParams.type.value === EComponentType.inputVariable ||
                        treeItemToParams.type.value === EComponentType.localVariable ||
                        treeItemToParams.type.value === EComponentType.outputVariable
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
                project.tabs.value.forEach(tab => {
                    inputParams = [
                        ...inputParams,
                        ...tab.items.value
                            .filter(treeItem => (treeItem.ascendantId.value === action.id.value && treeItem.type.value === EComponentType.inputVariable))
                            .map(item => new TreeItemComponent({
                                properties: item.properties.value,
                                items: item.items.value,
                                type: item.type.value,
                                id: item.id.value,
                            })),
                    ];
                });

                // Adiciona cada parâmetro como uma prop da action atual
                inputParams.forEach(param => {

                    // Se a prop/param já estiver no fluxo não acontece nada
                    if (!mappedItem.properties.some(propertie => propertie.id === param.id)) {
                        res.push({
                            id: param.id,
                            name: param.label,
                            value: observe(''),
                            group: observe('Params'),
                            type: observe(TypeOfValues.expression),
                            propertieType: observe(PropertieTypes.param),
                            information: param.description.value !== '' ? param.description : observe(undefined),
                            onPickerValueClick: observe(() => !param.id ? null : openModal(String(param.id.value))),
                            suggestions: observe(
                                getAllLocalVariablesAsSuggestion()
                                    .map(suggest => ({
                                        name: suggest.name,
                                        value: suggest.name,
                                        label: suggest.label,
                                        disabled: observe(false),
                                        description: suggest.description as any,
                                    }))
                            ),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            valueHasError: observe(undefined),
                            nameHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            valueHasWarning: observe(undefined),
                            editNameDisabled: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
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
                    switch (mappedItemProp.propertieType.value) {
                        case PropertieTypes.action:

                            /** Tranforma a action atual em tipo de campo selection */
                            set(mappedItemProp.type, TypeOfValues.selection);
                            set(mappedItemProp.suggestions, []);

                            project.tabs.value.forEach(tab => {
                                tab.items.value.forEach(tabItem => {

                                    // Filtra todas as actions globais ou extensions para criar as sugestões para a action.
                                    if (tabItem.id && (tabItem.type.value === EComponentType.globalAction || tabItem.type.value === EComponentType.extension)) {
                                        mappedItemProp = {
                                            ...mappedItemProp,
                                            suggestions: observe([
                                                ...mappedItemProp.suggestions.value || [],
                                                {
                                                    name: tabItem.name,
                                                    value: tabItem.name,
                                                    label: tabItem.label,
                                                    disabled: observe(false),
                                                    description: tabItem.description as any,
                                                }
                                            ])
                                        }
                                    }

                                });
                            });

                            allParamsToProps = getAllInputParamsFromActionByName(mappedItemProp.value.value);

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
                    set(prop.onPickerNameClick, () => openModal(prop.id.value || ''));
                    set(prop.onPickerValueClick, () => openModal(prop.id.value || ''));
                };
                return prop;
            });

            return mappedItem;
        }

        return nullRes;
    }, [getItemTreeByName, getItemTreeEditing, project.tabs]);

    return (
        <PropertiesEditor
            item={itemPropertie}
        />
    );
}
