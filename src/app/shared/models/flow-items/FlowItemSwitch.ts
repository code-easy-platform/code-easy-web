import { IObservable, observe, set, transform } from "react-observing";
import { IconFlowSwitch, Utils } from "code-easy-components";
import * as yup from 'yup';

import { EFlowItemType, EItemType, IConnection, IFileContent, IProperty, TypeOfValues } from "../../components/external";
import { IFlowItemSwitch } from "../../interfaces";
import { FlowItemComponent } from "../generic";
import { PropertieTypes } from "../../enuns";

interface IConstrutor {
    connections?: IConnection[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full if flow item implementation
 */
export class FlowItemSwitch extends FlowItemComponent<EItemType.SWITCH> implements IFlowItemSwitch {
    public get description(): IObservable<string> {
        return this.label;
    }
    public get flowItemType(): IObservable<EFlowItemType.acorn> {
        return transform(super.flowItemType, () => EFlowItemType.acorn, () => EFlowItemType.acorn);
    }
    public get icon(): IObservable<IFileContent> {
        return transform(super.icon, () => ({ content: IconFlowSwitch }), () => ({ content: IconFlowSwitch }));
    }

    public get isEnabledNewConnetion(): IObservable<true> {
        return transform(super.isEnabledNewConnetion, () => true, () => true);
    }

    public get conditions(): IObservable<IObservable<string>[]> {
        return transform(this.properties, properties => {
            return properties.filter(prop => prop.propertieType.value === PropertieTypes.condition).map(prop => prop.value);
        });
    }

    public get connections() {
        const updateCondiction = (connections: IConnection[]): IConnection[] => {

            // Adding a missing condiction
            connections.forEach(connection => {
                if (!this.properties.value.some(propertie => propertie.id.value === connection.id.value)) {
                    this.properties.value = [
                        ...this.properties.value,
                        {
                            id: connection.id,
                            value: observe(''),
                            type: observe(TypeOfValues.expression),
                            propertieType: observe(PropertieTypes.condition),
                            name: observe(PropertieTypes.condition + ' ' + this.conditions.value.length),

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
                }
            });

            // Remvoing a condition
            set(this.properties, properties => {
                const others = properties.filter(prop => prop.propertieType.value !== PropertieTypes.condition);
                return [
                    ...others,
                    ...properties.filter(prop => connections.some(connection => connection.id.value === prop.id.value))
                ];
            });

            return connections;
        }
        return transform(super.connections, updateCondiction, updateCondiction);
    }

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            connections: props.connections,
            type: EItemType.SWITCH,
            id: props.id,
        });

        this._valide();
    }

    public static newItem(top: number, left: number, targetId?: string, isSelected: boolean = false) {
        const id = Utils.getUUID();

        return new FlowItemSwitch({
            id,
            connections: (
                targetId
                    ? [{ id: observe(Utils.getUUID()), targetId: observe(targetId), originId: observe(id), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }]
                    : []
            ),
            properties: [
                {
                    value: observe('Switch'),
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
                    id: observe(Utils.getUUID()),
                    name: observe(PropertieTypes.top),
                    type: observe(TypeOfValues.hidden),
                    value: observe(Math.round(top / 15) * 15),
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
                    type: observe(TypeOfValues.hidden),
                    name: observe(PropertieTypes.left),
                    value: observe(Math.round(left / 15) * 15),
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
                    type: observe(TypeOfValues.hidden),
                    name: observe(PropertieTypes.icon),
                    value: observe({ content: IconFlowSwitch }),
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
                    value: observe(isSelected),
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
            ],
        });
    }

    private _valide() {
        this._valideConnections();
    }

    private _valideConnections() {
        const schema = yup.array().min(1);

        schema.validate(this.connections.value)
            .then(() => {
                set(this.errosIds, oldErros => {
                    if (oldErros.includes(this.connections.id)) {
                        return oldErros.filter(oldErros => oldErros !== this.connections.id);
                    } else {
                        return oldErros;
                    }
                });
            })
            .catch(() => {
                set(this.errosIds, oldErros => {
                    if (!oldErros.includes(this.connections.id)) {
                        return [
                            ...oldErros,
                            this.connections.id,
                        ];
                    } else {
                        return oldErros;
                    }
                });
            });

        // Subscribe to all changes
        this.connections.subscribe(connections => {
            schema.validate(connections)
                .then(() => {
                    set(this.errosIds, oldErros => {
                        if (oldErros.includes(this.connections.id)) {
                            return oldErros.filter(oldErros => oldErros !== this.connections.id);
                        } else {
                            return oldErros;
                        }
                    });
                })
                .catch(() => {
                    set(this.errosIds, oldErros => {
                        if (!oldErros.includes(this.connections.id)) {
                            return [
                                ...oldErros,
                                this.connections.id,
                            ];
                        } else {
                            return oldErros;
                        }
                    });
                });
        });
    }
}
