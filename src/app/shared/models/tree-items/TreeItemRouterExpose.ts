import { IconFlowEnd, IconFlowStart, IconRouterExpose, Utils } from "code-easy-components";
import { observe, set } from "react-observing";
import * as yup from 'yup';

import { EItemType, IProperty, ISuggestion, TypeOfValues } from "../../components/external";
import { ApiMethods, ApiMethodsList, EComponentType, PropertieTypes } from "../../enuns";
import { IFlowItemComponent, ITreeItemRouterExpose } from "../../interfaces";
import { FlowItemComponent } from "../generic/FlowItemComponent";
import { TreeItemComponent } from "../generic";

interface IConstrutor {
    items?: IFlowItemComponent[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full router expose implementation
 */
export class TreeItemRouterExpose extends TreeItemComponent<EComponentType.routeExpose> implements ITreeItemRouterExpose {

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            type: EComponentType.routeExpose,
            items: props.items,
            id: props.id,
        });

        this._valide();
    }

    public static newRoute(label: string, ascendantId?: string) {
        return new TreeItemRouterExpose({
            properties: [
                {
                    value: observe(label),
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
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    name: observe(PropertieTypes.path),
                    type: observe(TypeOfValues.string),
                    propertieType: observe(PropertieTypes.path),

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
                    value: observe(ApiMethods.get),
                    type: observe(TypeOfValues.selection),
                    name: observe(PropertieTypes.httpMethod),
                    propertieType: observe(PropertieTypes.httpMethod),
                    suggestions: observe<ISuggestion<string | number>[]>(ApiMethodsList.map(method => ({
                        description: observe(method),
                        disabled: observe(false),
                        label: observe(method),
                        value: observe(method),
                        name: observe(method),
                    }))),

                    group: observe(undefined),
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
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.bigstring),
                    name: observe(PropertieTypes.description),
                    propertieType: observe(PropertieTypes.description),

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
                    value: observe(ascendantId),
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
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.hidden),
                    name: observe(PropertieTypes.icon),
                    propertieType: observe(PropertieTypes.icon),
                    value: observe({ content: IconRouterExpose }),

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
                            type: observe(TypeOfValues.binary),
                            name: observe(PropertieTypes.icon),
                            value: observe({ content: IconFlowStart }),
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
                    ],
                }),
                new FlowItemComponent({
                    id: '2',
                    connections: [],
                    type: EItemType.END,
                    properties: [
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
                        {
                            id: observe(Utils.getUUID()),
                            type: observe(TypeOfValues.binary),
                            name: observe(PropertieTypes.icon),
                            value: observe({ content: IconFlowEnd }),
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
                    ],
                })
            ]
        });
    }

    private _valide() {
        this._valideHttpMethod();
    }

    private _valideHttpMethod() {
        const httpMethodSchema = yup.string().min(2);

        const prop = this.properties.value.find(propertie => propertie.propertieType.value === PropertieTypes.httpMethod);
        if (!prop) return;

        httpMethodSchema.validate(prop.value.value)
            .then(() => {
                set(this.errosIds, oldErros => {
                    if (oldErros.includes(prop.id.id)) {
                        return oldErros.filter(oldErroId => oldErroId !== prop.id.value);
                    } else {
                        return oldErros;
                    }
                });
            })
            .catch(() => {
                set(this.errosIds, oldErroId => {
                    if (!oldErroId.includes(prop.id.id)) {
                        return [
                            ...oldErroId,
                            prop.id.id,
                        ];
                    } else {
                        return oldErroId;
                    }
                });
            });

        // Subscribe to all changes
        prop.value.subscribe(value => {
            httpMethodSchema.validate(value)
                .then(() => {
                    set(this.errosIds, oldErros => {
                        if (oldErros.includes(prop.id.id)) {
                            return oldErros.filter(oldErroId => oldErroId !== prop.id.value);
                        } else {
                            return oldErros;
                        }
                    });
                })
                .catch(() => {
                    set(this.errosIds, oldErroId => {
                        if (!oldErroId.includes(prop.id.id)) {
                            return [
                                ...oldErroId,
                                prop.id.id,
                            ];
                        } else {
                            return oldErroId;
                        }
                    });
                });
        });
    }
}
