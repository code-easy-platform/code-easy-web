import React, { useCallback, useEffect, useState } from 'react';
import { ISubscription, observe, set, useObserver, useObserverValue, useSetObserver } from 'react-observing';
import { IconFlowEnd, IconFlowStart, IconTrash, Utils } from 'code-easy-components';

import { TreeManager, ITreeItem, CustomDragLayer, TypeOfValues, EItemType } from '../../../shared/components/external';
import { ECurrentFocus, EComponentType, PropertieTypes } from '../../../shared/enuns';
import { FlowItemComponent, Tab, TreeItemComponent } from '../../../shared/models';
import { AssetsService, openContextMenu } from '../../../shared/services';
import { IContextItemList } from '../../../shared/interfaces';
import { CurrentFocusStore } from '../../../shared/stores';
import { useEditorContext } from '../../../shared/hooks';

const useCurrentTab = () => {
    const [currentTab, setCurrentTab] = useState<Tab>(new Tab({ items: [], type: EComponentType.tabRoutes, properties: [] }));

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);
    const [itemsCurrent, setItemsCurrent] = useObserver(currentTab.items);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        tabs.forEach(tab => {

            if (tab.isEditing.value) {
                setCurrentTab(tab);
            }

            subscriptions.push(tab.isEditing.subscribe(isEditing => {
                if (isEditing) {
                    setCurrentTab(tab);
                }
            }));
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [tabs]);

    return {
        currentTab,
        itemsCurrent,
        setItemsCurrent
    };
}

export const TreeManagerController: React.FC = () => {
    const setCurrentFocus = useSetObserver(CurrentFocusStore);

    const { itemsCurrent, setItemsCurrent, currentTab } = useCurrentTab();
    const { project } = useEditorContext();

    /** Remove tree items */
    const treeManagerRemoveItem = useCallback((inputItemId: string | undefined) => {

        // Se for undefined não faz nada
        if (!inputItemId) return;

        setItemsCurrent(oldCurrentItems => oldCurrentItems
            .filter(item => item.id.value !== inputItemId)
            .filter(item => item.ascendantId.value !== inputItemId)
        );

    }, [setItemsCurrent]);

    const treeManagerOnKeyDowm = useCallback((e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            const itemToEdit = itemsCurrent.find(item => item.isSelected.value);
            if (itemToEdit) {
                treeManagerRemoveItem(itemToEdit.id.value);
            }
        }
    }, [itemsCurrent, treeManagerRemoveItem])

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = useCallback((itemId: string | undefined) => {
        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {

            project.tabs.value.forEach(tab => {
                tab.items.value.forEach(item => {
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    set(item.isSelected, false);
                });
            });

            const newName = Utils.newName('NewParam', itemsCurrent.map(item => item.label.value));

            setItemsCurrent(oldCurrentItems => {
                return [
                    ...oldCurrentItems,
                    new TreeItemComponent({
                        items: [],
                        type: paramType,
                        id: Utils.getUUID(),
                        properties: [
                            {
                                value: observe(newName),
                                id: observe(Utils.getUUID()),
                                type: observe(TypeOfValues.string),
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
                    })
                ];
            });
        }

        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routerConsume | EComponentType.routerExpose) => {
            if (inputItemId === undefined) {

                project.tabs.value.forEach(tab => {
                    tab.items.value.forEach(item => {
                        // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                        set(item.isSelected, false);
                    });
                });

                const newName = Utils.newName('NewRouter', itemsCurrent.map(item => item.label.value));

                setItemsCurrent(oldCurrentItems => {
                    return [
                        ...oldCurrentItems,
                        new TreeItemComponent({
                            type: routerType,
                            id: Utils.getUUID(),
                            items: (
                                routerType === EComponentType.routerExpose
                                    ? [
                                        new FlowItemComponent({
                                            id: '1',
                                            type: EItemType.START,
                                            connections: [{ id: observe(Utils.getUUID()), targetId: observe('2'), originId: observe('1'), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }],
                                            properties: [
                                                {
                                                    value: observe(100),
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
                                                    type: observe(TypeOfValues.binary),
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
                                                    type: observe(TypeOfValues.string),
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
                                        }),
                                        new FlowItemComponent({
                                            id: '2',
                                            connections: [],
                                            type: EItemType.END,
                                            properties: [
                                                {
                                                    value: observe(100),
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
                                                    value: observe(IconFlowEnd),
                                                    id: observe(Utils.getUUID()),
                                                    type: observe(TypeOfValues.binary),
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
                                                    value: observe(Math.round(328 / 15) * 15),
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
                                                    type: observe(TypeOfValues.string),
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
                            properties: [
                                {
                                    value: observe(newName),
                                    id: observe(Utils.getUUID()),
                                    type: observe(TypeOfValues.string),
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
                        })
                    ];
                });
            }
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {

                project.tabs.value.forEach(tab => {
                    tab.items.value.forEach(item => {
                        // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                        set(item.isSelected, false);
                    });
                });

                const newName = Utils.newName('NewAction', itemsCurrent.map(item => item.label.value));

                setItemsCurrent(oldCurrentItems => {
                    return [
                        ...oldCurrentItems,
                        new TreeItemComponent({
                            type: EComponentType.routerExpose,
                            id: Utils.getUUID(),
                            properties: [
                                {
                                    value: observe(newName),
                                    id: observe(Utils.getUUID()),
                                    type: observe(TypeOfValues.string),
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
                                            value: observe(100),
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
                                            type: observe(TypeOfValues.binary),
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
                                            type: observe(TypeOfValues.string),
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
                                            value: observe(100),
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
                                            value: observe(IconFlowEnd),
                                            id: observe(Utils.getUUID()),
                                            type: observe(TypeOfValues.binary),
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
                                            value: observe(Math.round(328 / 15) * 15),
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
                                            type: observe(TypeOfValues.string),
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
                        })
                    ];
                });
            }
        }

        if (currentTab.type.value === EComponentType.tabRoutes) {

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

        } else if (currentTab.type.value === EComponentType.tabActions) {

            options.push({
                icon: AssetsService.getIcon(EComponentType.globalAction),
                action: () => addAction(itemId),
                disabled: itemId !== undefined,
                label: 'Add new action'
            });

        } else if (currentTab.type.value === EComponentType.tabDates) {

        }

        itemsCurrent.forEach(item => {
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
    }, [currentTab.type.value, itemsCurrent, project.tabs.value, setItemsCurrent, treeManagerRemoveItem]);

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

        let items: ITreeItem[] = itemsCurrent.map((item): ITreeItem => ({
            isDisabledDoubleClick: observe(cannotPerformDoubleClick(item.type.value)),
            isDisabledDrag: observe(item.type.value === EComponentType.routerExpose),
            canDropList: observe(getCanDropList(item.type.value)),
            nodeExpanded: observe(Boolean(item.isExpanded)),
            icon: observe(item.icon.value.content),
            description: item.description,
            ascendantId: item.ascendantId,
            hasWarning: item.hasWarning,
            isSelected: item.isSelected,
            isEditing: item.isEditing,
            hasError: item.hasError,
            label: item.label,
            type: item.type,
            id: item.id,

            isAllowedToggleNodeExpand: observe(undefined),
            useCustomIconToExpand: observe(undefined),
            isDisabledSelect: observe(undefined),
            isDisabledClick: observe(undefined),
            showExpandIcon: observe(undefined),
            isDisabledDrop: observe(undefined),
            isDisabled: observe(undefined),
            iconSize: observe(undefined),
        }));

        return items;
    })();

    return (
        <TreeManager
            items={treeManagerItems}
            onKeyDown={treeManagerOnKeyDowm}
            onFocus={() => setCurrentFocus(ECurrentFocus.tree)}
            onContextMenu={(treeItemId, e) => {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY, treeManagerContextMenu(treeItemId));
            }}
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
        />
    );
}
