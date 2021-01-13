import { IconRouterExpose, Utils } from "code-easy-components";
import { IObservable, observe, set } from "react-observing";
import * as yup from 'yup';

import { IProperty, ISuggestion, TypeOfValues } from "../../components/external";
import { ApiMethods, ApiMethodsList, EComponentType, PropertieTypes } from "../../enuns";
import { IFlowItemComponent, ITreeItemRouterExpose } from "../../interfaces";
import { FlowItemEnd, FlowItemStart } from "../flow-items";
import { TreeItemComponent } from "../generic";
import { toKebabCase } from './../../services';

interface IConstrutor {
    items?: IFlowItemComponent[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full router expose implementation
 */
export class TreeItemRouterExpose extends TreeItemComponent<EComponentType.routeExpose> implements ITreeItemRouterExpose {
    
    public get path(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.path)?.value;
        if (prop) {
          return prop;
        }
    
        prop = observe('');
    
        this.properties.value = [
          ...this.properties.value,
          {
            value: prop,
            id: observe(Utils.getUUID()),
            type: observe(TypeOfValues.hidden),
            name: observe(PropertieTypes.path),
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
          }
        ];
    
        return prop;
    }
    
    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            type: EComponentType.routeExpose,
            items: props.items,
            id: props.id,
        });

        this._Initialize();
        this._valide();
    }

    public static newRoute(label: string, ascendantId?: string) {
        const end = FlowItemEnd.newItem(328, 100);
        const start = FlowItemStart.newItem(128, 100, end.id.value);

        return new TreeItemRouterExpose({
            items: [start, end],
            properties: [
                {
                    value: observe(label),
                    focusOnRender: observe(true),
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
                    editValueDisabled: observe(true),
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
        });
    }

    private _Initialize() {
        set(this.path, toKebabCase(this.label.value));
        this.label.subscribe(label => {
            set(this.path, toKebabCase(label));
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
