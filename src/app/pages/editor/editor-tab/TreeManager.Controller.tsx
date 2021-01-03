import React, { useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowEnd } from 'code-easy-components';
import { observe, set, useObserverValue, useSetObserver } from 'react-observing';

import { TreeManager, ITreeItem, CustomDragLayer, EItemType, TypeOfValues } from '../../../shared/components/external';
import { ECurrentFocus, EComponentType, PropertieTypes } from '../../../shared/enuns';
import { TreeItemComponent, FlowItemComponent } from '../../../shared/models';
import { AssetsService, openContextMenu } from '../../../shared/services';
import { IContextItemList } from '../../../shared/interfaces';
import { useEditorContext } from '../../../shared/contexts';
import { CurrentFocusStore } from '../../../shared/stores';

export const TreeManagerController: React.FC = () => {

    const { project } = useEditorContext();
    const setCurrentFocus = useSetObserver(CurrentFocusStore);
    const tabs = useObserverValue(project.tabs);

    /** Remove tree items */
    const treeManagerRemoveItem = useCallback((inputItemId: string | undefined) => {

        // Se for undefined não faz nada
        if (!inputItemId) return;

        let indexTabToRemove: number | undefined = undefined;
        let indexItemToRemove: number | undefined = undefined;

        // Pega a lista de items corrente na árvore
        tabs.forEach((tab, indexTab) => {
            tab.items.value.forEach((item, index) => {
                if (item.id.value === inputItemId) {
                    indexTabToRemove = indexTab;
                    indexItemToRemove = index;
                }
            });
        });

        if (indexItemToRemove !== undefined && indexTabToRemove !== undefined) {

            // Select a new item
            if ((indexItemToRemove - 1) >= 0) {
                set(tabs[indexTabToRemove].items.value[indexItemToRemove - 1].isSelected, true);
            }

            // Remove o item e retorna ele mesmo para que possa ser removido os seus dependentes
            const deletedItem = tabs[indexTabToRemove].items.value.splice(indexItemToRemove, 1)[0];

            // Busca para o caso de ter um dependente
            let indexToRemove = tabs[indexTabToRemove].items.value.findIndex(item => item.ascendantId === deletedItem.id);
            while (indexToRemove > -1) {
                //Remove o item dependente
                tabs[indexTabToRemove].items.value.splice(indexToRemove, 1);
                //Busca para o caso de ter outro item dependente
                indexToRemove = tabs[indexTabToRemove].items.value.findIndex(item => item.ascendantId === deletedItem.id);
            }
        }
    }, [tabs]);

    const treeManagerOnKeyDowm = useCallback((e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            let items: TreeItemComponent[] = [];
            tabs.forEach(tab => {
                if (tab.isEditing.value) {
                    items = tab.items.value.map(item => new TreeItemComponent({
                        properties: item.properties.value,
                        items: item.items.value,
                        type: item.type.value,
                        id: item.id.value,
                    }));
                }
            });

            const itemToEdit = items.find(item => item.isSelected);
            if (itemToEdit) {
                treeManagerRemoveItem(itemToEdit.id.value);
            }
        }
    }, [tabs, treeManagerRemoveItem])

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = useCallback((itemId: string | undefined) => {
        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {
            let tabIndex: number | undefined;

            tabs.forEach((tab, indexTab) => {
                tab.items.value.forEach(item => {
                    if (item.id.value === inputItemId) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.value.forEach(item => {
                        set(item.isSelected, false);
                    });
                });
            });

            if (tabIndex !== undefined) {
                const newName = Utils.newName('NewParam', tabs[tabIndex].items.value.map(item => item.label.value));

                tabs[tabIndex].items.value.push(new TreeItemComponent({
                    items: [],
                    type: paramType,
                    id: Utils.getUUID(),
                    properties: [
                        {
                            value: observe(newName),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.label),
                            propertieType: observe(PropertieTypes.label),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            valueHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(true),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.isSelected),
                            propertieType: observe(PropertieTypes.isSelected),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            valueHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                        {
                            value: observe(inputItemId),
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.hidden),
                            name: observe(PropertieTypes.ascendantId),
                            propertieType: observe(PropertieTypes.ascendantId),

                            group: observe(undefined),
                            suggestions: observe(undefined),
                            information: observe(undefined),
                            fileMaxSize: observe(undefined),
                            nameHasError: observe(undefined),
                            valueHasError: observe(undefined),
                            focusOnRender: observe(undefined),
                            nameHasWarning: observe(undefined),
                            valueHasWarning: observe(undefined),
                            nameSuggestions: observe(undefined),
                            editNameDisabled: observe(undefined),
                            onPickerNameClick: observe(undefined),
                            editValueDisabled: observe(undefined),
                            onPickerValueClick: observe(undefined),
                        },
                    ],
                }));
            }
        }

        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routerConsume | EComponentType.routerExpose) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                tabs.forEach((tab, indexTab) => {
                    if (tab.isEditing.value) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.value.forEach(item => {
                        set(item.isEditing, false);
                        set(item.isSelected, false);
                    });
                });

                if (tabIndex !== undefined) {
                    const newName = Utils.newName('NewRouter', tabs[tabIndex].items.value.map(item => item.label.value));

                    tabs[tabIndex].items.value.push(new TreeItemComponent({
                        items: (
                            routerType === EComponentType.routerExpose
                                ? [
                                    new FlowItemComponent({
                                        id: '1',
                                        type: EItemType.START,
                                        connections: [{ id: observe(Utils.getUUID()), targetId: observe('2'), originId: observe('1'), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }],
                                        properties: [
                                            {
                                                value: observe(188),
                                                id: observe(Utils.getUUID()),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.left),
                                                propertieType: observe(PropertieTypes.left),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                value: observe(IconFlowStart),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.icon),
                                                propertieType: observe(PropertieTypes.icon),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                name: observe(PropertieTypes.top),
                                                type: observe(TypeOfValues.hidden),
                                                value: observe(Math.round(128 / 15) * 15),
                                                propertieType: observe(PropertieTypes.top),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                value: observe(EItemType.START),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.label),
                                                propertieType: observe(EItemType.START),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                        ],
                                    }),
                                    new FlowItemComponent({
                                        id: '2',
                                        connections: [],
                                        type: EItemType.END,
                                        properties: [
                                            {
                                                value: observe(188),
                                                id: observe(Utils.getUUID()),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.left),
                                                propertieType: observe(PropertieTypes.left),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                value: observe(IconFlowEnd),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.icon),
                                                propertieType: observe(PropertieTypes.icon),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                name: observe(PropertieTypes.top),
                                                type: observe(TypeOfValues.hidden),
                                                value: observe(Math.round(128 / 15) * 15),
                                                propertieType: observe(PropertieTypes.top),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                            {
                                                id: observe(Utils.getUUID()),
                                                value: observe(EItemType.END),
                                                type: observe(TypeOfValues.hidden),
                                                name: observe(PropertieTypes.label),
                                                propertieType: observe(PropertieTypes.label),

                                                group: observe(undefined),
                                                suggestions: observe(undefined),
                                                information: observe(undefined),
                                                fileMaxSize: observe(undefined),
                                                nameHasError: observe(undefined),
                                                valueHasError: observe(undefined),
                                                focusOnRender: observe(undefined),
                                                nameHasWarning: observe(undefined),
                                                valueHasWarning: observe(undefined),
                                                nameSuggestions: observe(undefined),
                                                editNameDisabled: observe(undefined),
                                                onPickerNameClick: observe(undefined),
                                                editValueDisabled: observe(undefined),
                                                onPickerValueClick: observe(undefined),
                                            },
                                        ],
                                    })
                                ]
                                : []
                        ),
                        type: routerType,
                        id: Utils.getUUID(),
                        properties: [
                            {
                                value: observe(newName),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.label),
                                propertieType: observe(PropertieTypes.label),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(true),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isSelected),
                                propertieType: observe(PropertieTypes.isSelected),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(true),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isExpanded),
                                propertieType: observe(PropertieTypes.isExpanded),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isEditing),
                                propertieType: observe(PropertieTypes.isEditing),
                                value: observe(routerType === EComponentType.routerExpose),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(inputItemId),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.ascendantId),
                                propertieType: observe(PropertieTypes.ascendantId),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                        ],
                    }));
                }
            }
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                tabs.forEach((tab, indexTab) => {
                    if (tab.isEditing.value) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.value.forEach(item => {
                        set(item.isEditing, false);
                        set(item.isSelected, false);
                    });
                });

                if (tabIndex !== undefined) {
                    const newName = Utils.newName('NewAction', tabs[tabIndex].items.value.map(item => item.label.value));

                    tabs[tabIndex].items.value.push(new TreeItemComponent({
                        type: EComponentType.routerExpose,
                        id: Utils.getUUID(),
                        properties: [
                            {
                                value: observe(newName),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.label),
                                propertieType: observe(PropertieTypes.label),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(true),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isSelected),
                                propertieType: observe(PropertieTypes.isSelected),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(true),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isExpanded),
                                propertieType: observe(PropertieTypes.isExpanded),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(true),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.isEditing),
                                propertieType: observe(PropertieTypes.isEditing),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                            {
                                value: observe(inputItemId),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.hidden),
                                name: observe(PropertieTypes.ascendantId),
                                propertieType: observe(PropertieTypes.ascendantId),

                                group: observe(undefined),
                                suggestions: observe(undefined),
                                information: observe(undefined),
                                fileMaxSize: observe(undefined),
                                nameHasError: observe(undefined),
                                valueHasError: observe(undefined),
                                focusOnRender: observe(undefined),
                                nameHasWarning: observe(undefined),
                                valueHasWarning: observe(undefined),
                                nameSuggestions: observe(undefined),
                                editNameDisabled: observe(undefined),
                                onPickerNameClick: observe(undefined),
                                editValueDisabled: observe(undefined),
                                onPickerValueClick: observe(undefined),
                            },
                        ],
                        items: [
                            new FlowItemComponent({
                                id: '1',
                                type: EItemType.START,
                                connections: [{ id: observe(Utils.getUUID()), targetId: observe('2'), originId: observe('1'), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }],
                                properties: [
                                    {
                                        value: observe(188),
                                        id: observe(Utils.getUUID()),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.left),
                                        propertieType: observe(PropertieTypes.left),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        value: observe(IconFlowStart),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.icon),
                                        propertieType: observe(PropertieTypes.icon),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        name: observe(PropertieTypes.top),
                                        type: observe(TypeOfValues.hidden),
                                        value: observe(Math.round(128 / 15) * 15),
                                        propertieType: observe(PropertieTypes.top),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        value: observe(EItemType.START),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.label),
                                        propertieType: observe(EItemType.START),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                ],
                            }),
                            new FlowItemComponent({
                                id: '2',
                                connections: [],
                                type: EItemType.END,
                                properties: [
                                    {
                                        value: observe(188),
                                        id: observe(Utils.getUUID()),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.left),
                                        propertieType: observe(PropertieTypes.left),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        value: observe(IconFlowEnd),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.icon),
                                        propertieType: observe(PropertieTypes.icon),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        name: observe(PropertieTypes.top),
                                        type: observe(TypeOfValues.hidden),
                                        value: observe(Math.round(128 / 15) * 15),
                                        propertieType: observe(PropertieTypes.top),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                    {
                                        id: observe(Utils.getUUID()),
                                        value: observe(EItemType.END),
                                        type: observe(TypeOfValues.hidden),
                                        name: observe(PropertieTypes.label),
                                        propertieType: observe(PropertieTypes.label),

                                        group: observe(undefined),
                                        suggestions: observe(undefined),
                                        information: observe(undefined),
                                        fileMaxSize: observe(undefined),
                                        nameHasError: observe(undefined),
                                        valueHasError: observe(undefined),
                                        focusOnRender: observe(undefined),
                                        nameHasWarning: observe(undefined),
                                        valueHasWarning: observe(undefined),
                                        nameSuggestions: observe(undefined),
                                        editNameDisabled: observe(undefined),
                                        onPickerNameClick: observe(undefined),
                                        editValueDisabled: observe(undefined),
                                        onPickerValueClick: observe(undefined),
                                    },
                                ],
                            })
                        ],
                    }));
                }
            }
        }

        tabs.forEach(tab => {
            if (tab.isEditing.value) {
                if (tab.type.value === EComponentType.tabRoutes) {

                    options.push({
                        action: () => addRoute(itemId, EComponentType.routerExpose),
                        icon: AssetsService.getIcon(EComponentType.routerExpose),
                        disabled: itemId !== undefined,
                        label: 'Expose a new route'
                    });

                    options.push({
                        icon: AssetsService.getIcon(EComponentType.routerConsume),
                        action: () => addRoute(itemId, EComponentType.routerConsume),
                        disabled: itemId !== undefined,
                        label: 'Consume a new route'
                    });

                } else if (tab.type.value === EComponentType.tabActions) {

                    options.push({
                        icon: AssetsService.getIcon(EComponentType.globalAction),
                        action: () => addAction(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new action'
                    });

                } else if (tab.type.value === EComponentType.tabDates) {

                }

                tab.items.value.forEach(item => {
                    if (item.id.value === itemId) {
                        switch (item.type.value) {
                            case EComponentType.globalAction:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, EComponentType.inputVariable),
                                    icon: AssetsService.getIcon(EComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable',
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.outputVariable),
                                    icon: AssetsService.getIcon(EComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.localVariable),
                                    icon: AssetsService.getIcon(EComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case EComponentType.localAction:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, EComponentType.inputVariable),
                                    icon: AssetsService.getIcon(EComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.outputVariable),
                                    icon: AssetsService.getIcon(EComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.localVariable),
                                    icon: AssetsService.getIcon(EComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case EComponentType.routerExpose:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, EComponentType.inputVariable),
                                    icon: AssetsService.getIcon(EComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input param'
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.outputVariable),
                                    icon: AssetsService.getIcon(EComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output param'
                                });
                                options.push({
                                    action: () => addParam(itemId, EComponentType.localVariable),
                                    icon: AssetsService.getIcon(EComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case EComponentType.routerConsume:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, EComponentType.inputVariable),
                                    icon: AssetsService.getIcon(EComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input param'
                                });
                                break;

                            default: break;
                        }
                    }
                });
            }
        });

        if (itemId !== undefined) {
            options.push({
                action: () => { },
                label: '-',
            });
            options.push({
                action: () => treeManagerRemoveItem(itemId),
                disabled: itemId === undefined,
                useConfirmation: false,
                icon: IconTrash,
                label: 'Delete',
            });
        }

        return options;
    }, [tabs, treeManagerRemoveItem]);

    const handleOnChange = useCallback((updatedItems: ITreeItem[]) => {

        tabs.forEach(tab => {
            if (tab.isEditing.value) {

                set(tab.items, oldItems => oldItems.map(item => {
                    const updatedItem = updatedItems.find(updatedItem => updatedItem.id === item.id);
                    if (!updatedItem) return item;

                    return new TreeItemComponent({
                        properties: item.properties.value,
                        items: item.items.value,
                        type: item.type.value,
                        id: item.id.value,
                    });
                }));

            } else {

                const isSelected = updatedItems.find(updatedItem => updatedItem.isSelected.value);
                const isEditing = updatedItems.find(updatedItem => updatedItem.isEditing.value);

                tab.items.value.forEach(item => {
                    if (isSelected) set(item.isSelected, false);
                    if (isEditing) set(item.isEditing, false);
                });
            }
        });

    }, [tabs]);

    /** Monta a estrutura da árvore e devolve no return */
    const treeManagerItems = ((): ITreeItem[] => {

        /** Disable doucle click by type */
        const cannotPerformDoubleClick = (type: EComponentType) => {
            switch (type) {
                case EComponentType.inputVariable:
                    return true;
                case EComponentType.grouper:
                    return true;
                case EComponentType.localVariable:
                    return true;
                case EComponentType.outputVariable:
                    return true;
                case EComponentType.routerConsume:
                    return true;

                default:
                    return false;
            }
        }

        /** Allowed drop list by type */
        const getCanDropList = (type: EComponentType) => {
            switch (type) {
                case EComponentType.inputVariable:
                    return [];
                case EComponentType.localAction:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                case EComponentType.localVariable:
                    return [];
                case EComponentType.outputVariable:
                    return [];
                case EComponentType.routerConsume:
                    return [EComponentType.inputVariable];
                case EComponentType.extension:
                    return [EComponentType.inputVariable, EComponentType.outputVariable];
                case EComponentType.globalAction:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                case EComponentType.grouper:
                    return [EComponentType.localAction, EComponentType.globalAction, EComponentType.extension, EComponentType.routerConsume, EComponentType.routerExpose];
                case EComponentType.routerExpose:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                default:
                    return [];
            }
        }

        let items: ITreeItem[] = [];

        tabs.forEach(tab => {
            if (tab.isEditing.value) {
                items = tab.items.value.map((item): ITreeItem => ({
                    ...item,
                    isDisabledDoubleClick: observe(cannotPerformDoubleClick(item.type.value)),
                    isDisabledDrag: observe(item.type.value === EComponentType.routerExpose),
                    canDropList: observe(getCanDropList(item.type.value)),
                    nodeExpanded: observe(Boolean(item.isExpanded)),
                    icon: observe(item.icon.value.content),
                    description: item.description,
                    ascendantId: item.ascendantId,
                    hasWarning: item.hasWarning,
                    hasError: item.hasError,
                    label: item.label,
                    id: item.id,

                    type: observe(EComponentType.routerExpose),

                    isAllowedToggleNodeExpand: observe(undefined),
                    useCustomIconToExpand: observe(undefined),
                    isDisabledSelect: observe(undefined),
                    isDisabledClick: observe(undefined),
                    showExpandIcon: observe(undefined),
                    isDisabledDrop: observe(undefined),
                    isDisabled: observe(undefined),
                    isEditing: observe(undefined),
                    iconSize: observe(undefined),
                    isSelected: observe(false),
                }));
            }
        });

        return items;
    })();

    return (
        <TreeManager
            items={treeManagerItems}
            onChangeItems={handleOnChange}
            onKeyDown={treeManagerOnKeyDowm}
            onFocus={() => setCurrentFocus(ECurrentFocus.tree)}
            configs={{
                id: 'Inspector',
                isUseDrag: true,
                isUseDrop: true,
                activeItemBackgroundColor: '#ffffff05',
                focusedItemBackgroundColor: '#ffffff05',
                editingItemBackgroundColor: '#ffffff10',
                showEmptyMessage: treeManagerItems.length === 0,
                customDragLayer: (item) => (
                    <CustomDragLayer children={item} />
                )
            }}
            onContextMenu={(treeItemId, e) => {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY, treeManagerContextMenu(treeItemId));
            }}
        />
    );
}
