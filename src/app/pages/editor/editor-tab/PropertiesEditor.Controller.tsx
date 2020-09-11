import React from 'react';
import { Utils } from 'code-easy-components';

import { PropertiesEditor, IProperty, TypeOfValues, IItem } from '../../../shared/components/properties-editor';
import { ContextModalListService } from '../../../shared/components/context-modais/ContextModalListService';
import { TreeItemComponent, FlowItemComponent } from '../../../shared/models';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { EItemType } from '../../../shared/components/flow-editor';
import { ECurrentFocus } from '../../../shared/enuns/ECurrentFocus';
import { useEditorContext } from '../../../shared/contexts';
import { EComponentType } from '../../../shared/enuns';
import { Tab } from '../../../shared/models/Tabs';

export const PropertiesEditorController: React.FC = () => {

    const { project, setProject, getItemTreeEditing } = useEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = () => setProject(project);


    /** O editor de propriedades emite a lista de propriedades alteradas */
    const handleOnChangeItems = (item: IItem) => {

        if (project.currentComponentFocus === ECurrentFocus.tree) {

            if (item.id) {
                project.tabs.forEach((tab: Tab) => {
                    tab.items.forEach(itemTree => {
                        if (itemTree.isSelected && itemTree.id === item.id) {

                            // Este block garante que se a label de uma routa muda o seu path será alterado junto.
                            if (itemTree.type === EComponentType.routerConsume || itemTree.type === EComponentType.routerExpose) {
                                const newLabel = item.properties.find(prop => prop.propertieType === PropertieTypes.label);
                                item.properties.forEach(prop => {
                                    if (prop.propertieType === PropertieTypes.url) {
                                        prop.value = `/${Utils.getNormalizedString(newLabel ? newLabel.value : prop.value).toLowerCase()}`;
                                    }
                                });
                            }

                            if (itemTree) {
                                const nameProp = item.properties.find(prop => prop.propertieType === PropertieTypes.name);
                                const labelProp = item.properties.find(prop => prop.propertieType === PropertieTypes.label);
                                const descriptionProp = item.properties.find(prop => prop.propertieType === PropertieTypes.description);

                                if (labelProp) { itemTree.label = labelProp.value; }
                                if (descriptionProp) { itemTree.description = descriptionProp.value; }
                                if (nameProp) { itemTree.name = Utils.getNormalizedString(nameProp.value); }

                                // Atualizas as props
                                itemTree.properties = item.properties;

                            }

                        }
                    });
                });
                onChangeState();
            }

        } else if (project.currentComponentFocus === ECurrentFocus.flow) {

            let treeItemEditing: TreeItemComponent | undefined;
            project.tabs.forEach((tab: Tab) => {
                tab.items.forEach(item => {
                    if (item.isEditing) {
                        treeItemEditing = item;
                    }
                });
            });

            if (treeItemEditing) {

                let indexItemFlow = treeItemEditing.items.findIndex((oldItem: FlowItemComponent) => oldItem.id === item.id);
                if (indexItemFlow && (indexItemFlow < 0)) { return; };


                if (treeItemEditing.items[indexItemFlow].itemType === EItemType.ACTION) {

                    // Pega a antiga action ID
                    const oldActionId = treeItemEditing.items[indexItemFlow].properties.find(itemOld => itemOld.propertieType === PropertieTypes.action)?.value;

                    // Pega a nova action ID
                    const newSelectedActionId = item.properties.find(itemNew => itemNew.propertieType === PropertieTypes.action)?.value;

                    // Compara os dois IDs, se mudou apaga todos os parâmetro da action anterior.
                    if ((oldActionId !== '') && (oldActionId !== newSelectedActionId)) {
                        // Encontra o promeiro parametro e remove, depois encontra os outros e irá remover eté não restar mais parâmetros
                        let indexToRemove = item.properties.findIndex(itemOld => itemOld.propertieType === PropertieTypes.param);
                        while (indexToRemove >= 0) {
                            item.properties.splice(indexToRemove, 1);
                            indexToRemove = item.properties.findIndex(itemOld => itemOld.propertieType === PropertieTypes.param);
                        }
                    }

                    // Altera a label do componente de fluxo
                    const tab = project.tabs.find((tab: Tab) => tab.items.some(itemTree => itemTree.id === newSelectedActionId));
                    if (tab) {

                        /** Action selectionada */
                        const actionSelected = tab.items.find(itemTree => itemTree.id === newSelectedActionId);
                        if (actionSelected) {

                            item.properties.forEach(prop => {
                                if (prop.propertieType === PropertieTypes.label) {

                                    // Pega prop label da action selecionada
                                    const actionLabelProp = actionSelected.properties.find(propAction => propAction.propertieType === PropertieTypes.label);
                                    if (actionLabelProp) {

                                        // Altera o valor da label
                                        prop.value = actionSelected ? actionLabelProp.value || prop.value : prop.value;
                                    }
                                }
                            });
                            item.name = actionSelected.label;
                        }
                    }

                }

                // Reinstancia a classe para revalidar as propriedade e mais
                treeItemEditing.items[indexItemFlow] = new FlowItemComponent({
                    ...treeItemEditing.items[indexItemFlow],
                    properties: item.properties,
                });

            }

            onChangeState();
        };
    }

    /** Devolve para o editor de propriedades as propriedades do item selecionado no momento. */
    const propertiesEditorGetSelectedItem = (currentFocus: ECurrentFocus): IItem => {
        const nullRes = {
            id: '',
            name: '',
            properties: [],
            isHeader: false,
        }

        // Map a selected tree item.
        if (currentFocus === ECurrentFocus.tree) {

            const tab = project.tabs.find((tab: Tab) => tab.items.find(item => item.isSelected));
            if (!tab) { return nullRes; }
            const res = tab.items.find(item => item.isSelected);
            if (!res) { return nullRes; }
            else {
                return {
                    id: res.id,
                    name: res.label,
                    subname: res.type,
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
                name: selectedItem.name,
                subname: selectedItem.itemType,
                properties: selectedItem.properties,
            };

            /** Current tab from editing item */
            const currentTab = project.tabs.find(tab => tab.items.some(tabItem => tabItem.items.some(tabItemFlowItem => tabItemFlowItem.id === selectedItem.id)));
            if (!currentTab) return nullRes;

            /** 
             * Take all variables from the tree item that is currently being
             * edited to put as properties of the item being mapped
             */
            const allVariablesToProps = currentTab.items.filter(treeItemToParams => (
                (treeItemToParams.itemPaiId === selectedItem.id) &&
                (
                    treeItemToParams.type === EComponentType.inputVariable ||
                    treeItemToParams.type === EComponentType.localVariable ||
                    treeItemToParams.type === EComponentType.outputVariable
                )
            ));


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

                                    // Filtra todas as actions globais ou extensions
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

                                    // Pega os parâmetros da action ou extension selecionada
                                    if (tabItem.name === mappedItemProp.value) {
                                        const params = tab.items.filter(tabItemChild => (tabItemChild.itemPaiId === tabItem.id && tabItemChild.type === EComponentType.inputVariable));

                                        // Adiciona cada parâmetro como uma prop da action atual
                                        params.forEach(param => {

                                            // Se a prop/param já estiver no fluxo não acontece nada
                                            if (!mappedItem.properties.some(propertie => propertie.id === param.id)) {
                                                allParamsToProps.push({
                                                    value: '',
                                                    id: param.id,
                                                    group: 'Params',
                                                    name: param.label,
                                                    type: TypeOfValues.expression,
                                                    propertieType: PropertieTypes.param,
                                                    information: param.description !== '' ? param.description : undefined,
                                                    onPickerValueClick: () => !param.id ? null : ContextModalListService.showModal({ editingId: param.id }),
                                                    suggestions: allVariablesToProps.map(suggest => ({
                                                        disabled: false,
                                                        name: suggest.name,
                                                        value: suggest.name,
                                                        label: suggest.label,
                                                        description: suggest.description,
                                                    })),
                                                });
                                            }

                                        });
                                    }
                                });
                            });

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
            ]

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
    }


    return (
        <PropertiesEditor
            onChange={handleOnChangeItems}
            item={propertiesEditorGetSelectedItem(project.currentComponentFocus)}
        />
    );
}
