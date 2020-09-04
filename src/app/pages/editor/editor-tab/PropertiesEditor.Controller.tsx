import React from 'react';
import { Utils } from 'code-easy-components';

import { IItem, IProperties, TypeValues } from '../../../shared/components/properties-editor/shared/interfaces';
import { ContextModalListService } from '../../../shared/components/context-modais/ContextModalListService';
import { PropertiesEditor } from '../../../shared/components/properties-editor/PropertiesEditor';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { EItemType } from '../../../shared/components/flow-editor';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { useEditorContext } from '../../../shared/contexts';
import { Tab } from '../../../shared/interfaces/Tabs';

export const PropertiesEditorController: React.FC = () => {

    const { project, setProject } = useEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = () => setProject(project);


    /** O editor de propriedades emite a lista de propriedades alteradas */
    const propertiesEditorOutputItems = (item: IItem) => {

        if (project.currentComponentFocus === CurrentFocus.tree) {

            if (item.id) {
                project.tabs.forEach((tab: Tab) => {
                    tab.items.forEach(itemTree => {
                        if (itemTree.isSelected && itemTree.id === item.id) {

                            // Este block garante que se a label de uma routa muda o seu path será alterado junto.
                            if (itemTree.type === ComponentType.routerConsume || itemTree.type === ComponentType.routerExpose) {
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

        } else if (project.currentComponentFocus === CurrentFocus.flow) {

            let treeItemEditing: ItemComponent | undefined;
            project.tabs.forEach((tab: Tab) => {
                tab.items.forEach(item => {
                    if (item.isEditing) {
                        treeItemEditing = item;
                    }
                });
            });

            if (treeItemEditing) {

                let indexItemFlow = treeItemEditing.items.findIndex((oldItem: ItemFlowComplete) => oldItem.id === item.id);
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
                treeItemEditing.items[indexItemFlow] = new ItemFlowComplete({
                    ...treeItemEditing.items[indexItemFlow],
                    properties: item.properties,
                });

            }

            onChangeState();
        };
    }

    /** Devolve para o editor de propriedades as propriedades do item selecionado no momento. */
    const propertiesEditorGetSelectedItem = (currentFocus: CurrentFocus) => {
        const nullRes = {
            id: '',
            name: '',
            properties: [],
            isHeader: false,
        }

        if (currentFocus === CurrentFocus.tree) { // Mapeia os items da árvore.

            const tab = project.tabs.find((tab: Tab) => tab.items.find(item => item.isSelected));
            if (!tab) { return nullRes; }
            const res = tab.items.find(item => item.isSelected);
            if (!res) { return nullRes; }
            else {
                return {
                    id: res.id,
                    isHeader: true,
                    name: res.label,
                    subname: res.type,
                    properties: res.properties.map(prop => {
                        if (prop.id && prop.name) {
                            prop.openEditor = () => ContextModalListService.showModal({ editingId: prop.id || '' });
                        }
                        return prop;
                    })
                };
            }

        } else if (currentFocus === CurrentFocus.flow) { // Mapeia os items de fluxo
            const itemsLogica: ItemFlowComplete[] = codeEditorGetItemsLogica();
            const itemsFiltereds = itemsLogica.filter(flowItem => flowItem.isSelected);

            if (itemsFiltereds.length > 1) {
                return {
                    name: `${itemsFiltereds.length} items selecteds`,
                    subname: 'Selection',
                    properties: [],
                    isHeader: true,
                    id: undefined,
                }
            }

            const mappedItems: IItem[] = [];
            itemsFiltereds.forEach(filteredItem => {
                let paramsProps: IProperties[] = [];

                /**
                 * Pega as variáveis do item que está sendo editado atualmente para colocar como sugestão nas expressions
                 * 
                 * Pode ser usado para sugerir para o assign e outros componentes
                 */
                let paramsSuggestion: ItemComponent[] = [];
                project.tabs.forEach(tab => {
                    tab.items.forEach(tree_item => {
                        if (tree_item.isEditing) {
                            paramsSuggestion = tab.items.filter(treeItemToParams => (
                                (treeItemToParams.itemPaiId === tree_item.id) &&
                                (
                                    treeItemToParams.type === ComponentType.inputVariable ||
                                    treeItemToParams.type === ComponentType.localVariable ||
                                    treeItemToParams.type === ComponentType.outputVariable
                                )
                            ));
                        }
                    })
                });

                // Adicionar sugestões nos assigns
                filteredItem.properties.forEach(prop => {
                    if (prop.propertieType === PropertieTypes.action) {

                        /** Tranforma a action atual em tipo de campo selection */
                        prop.type = TypeValues.selection;
                        prop.suggestions = [];

                        // Encontra as action e adiciona como sugestions
                        project.tabs.forEach(tab => {
                            if (tab.configs.type === ComponentType.tabActions) {
                                tab.items.forEach(item => {
                                    if (item.type === ComponentType.globalAction) {
                                        prop.suggestions?.push({
                                            description: item.description,
                                            label: item.label,
                                            value: item.id,
                                            name: item.name,
                                            disabled: false,
                                        });
                                    }
                                });
                            }
                        });

                        // Encontra os parametros e adiona como props
                        project.tabs.forEach(tab => {
                            if (tab.configs.type === ComponentType.tabActions) {

                                // Encontra os parâmetros da action selecionada na combo
                                const params = tab.items.filter(item => (item.itemPaiId === prop.value) && item.type === ComponentType.inputVariable);

                                // Adiciona cada parâmetro como uma prop da action atual
                                params.forEach(param => {

                                    // Se a prop/param já estiver no fluxo não acontece nada
                                    if (!filteredItem.properties.some(propertie => propertie.id === param.id)) {
                                        paramsProps.push({
                                            value: '',
                                            id: param.id,
                                            group: 'Params',
                                            name: param.label,
                                            type: TypeValues.expression,
                                            propertieType: PropertieTypes.param,
                                            information: param.description !== '' ? param.description : undefined,
                                            openEditor: () => {
                                                if (param.id)
                                                    ContextModalListService.showModal({ editingId: param.id });
                                            },
                                            suggestions: paramsSuggestion.map(suggest => {
                                                return {
                                                    disabled: false,
                                                    name: suggest.name,
                                                    value: suggest.name,
                                                    label: suggest.label,
                                                    description: suggest.description,
                                                };
                                            }),
                                        });
                                    }

                                });
                            }
                        });

                    }
                    if (prop.propertieType === PropertieTypes.assigns) {
                        // Adicionar código aqui para mapear sugestões e mais no assing 
                    }
                });

                // Mapea os items para modal
                filteredItem.properties.map(prop => {
                    if (prop.id && prop.name) {
                        prop.openEditor = () => ContextModalListService.showModal({ editingId: prop.id || '' });
                    };
                    return prop;
                });

                mappedItems.push({
                    isHeader: true,
                    id: filteredItem.id,
                    name: filteredItem.name,
                    subname: filteredItem.itemType,
                    properties: [...filteredItem.properties, ...paramsProps], // Adiciona os parâmetros da action selecionada como props
                });

            });

            if (mappedItems.length > 0) {
                return mappedItems[0];
            } else {
                return nullRes;
            }

        }

        return nullRes;
    }

    /** Usando o state pode pegar os items que devem ser editados pelo fluxo. */
    const codeEditorGetItemsLogica = () => {

        let itemEditing: ItemComponent | undefined;

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {
                    itemEditing = item;
                }
            });
        });

        if (itemEditing) {
            itemEditing.items.sort((a, b) => (a.top - b.top));
            return itemEditing.items; // Se for o completo já retorna para evitar processamento.
        } else {
            return [];
        }

    }


    return (
        <PropertiesEditor
            onChange={propertiesEditorOutputItems}
            item={propertiesEditorGetSelectedItem(project.currentComponentFocus)}
        />
    );
}
