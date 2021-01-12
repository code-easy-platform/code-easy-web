import { IObservable, observe, set, transform } from "react-observing";
import { IconFlowForeach, Utils } from "code-easy-components";
import * as yup from 'yup';

import { EFlowItemType, EItemType, IConnection, IFileContent, IProperty, TypeOfValues } from "../../components/external";
import { IFlowItemForeach } from "../../interfaces";
import { FlowItemComponent } from "../generic";
import { PropertieTypes } from "../../enuns";

interface IConstrutor {
    connections?: IConnection[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full foreach flow item implementation
 */
export class FlowItemForeach extends FlowItemComponent<EItemType.FOREACH> implements IFlowItemForeach {
    public get description(): IObservable<string> {
        return this.sourceList;
    }
    public get flowItemType(): IObservable<EFlowItemType.acorn> {
        return transform(super.flowItemType, () => EFlowItemType.acorn, () => EFlowItemType.acorn);
    }
    public get icon(): IObservable<IFileContent> {
        return transform(super.icon, () => ({ content: IconFlowForeach }), () => ({ content: IconFlowForeach }));
    }

    public get isEnabledNewConnetion(): IObservable<boolean> {
        return transform(this.connections, connections => connections.length < 2);
    }

    public get connections(): IObservable<IConnection[]> {
        return transform(super.connections, connections => connections, connections => {
            if (connections.length > 2) {
                return [connections[0], connections[1]];
            }
            return connections;
        });
    }

    public get sourceList(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.sourceList)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.expression),
                name: observe(PropertieTypes.sourceList),
                propertieType: observe(PropertieTypes.sourceList),
                nameHasError: transform(this.errosIds, values => values.includes(prop?.id || '')),
                valueHasError: transform(this.errosIds, values => values.includes(prop?.id || '')),
                nameHasWarning: transform(this.warningIds, values => values.includes(prop?.id || '')),
                valueHasWarning: transform(this.warningIds, values => values.includes(prop?.id || '')),

                group: observe(undefined),
                suggestions: observe(undefined),
                information: observe(undefined),
                fileMaxSize: observe(undefined),
                focusOnRender: observe(undefined),
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
            connections: props.connections,
            type: EItemType.FOREACH,
            id: props.id,
        });

        this._valide();
    }

    public static newItem(top: number, left: number, targetId?: string, isSelected: boolean = false) {
        const id = Utils.getUUID();

        return new FlowItemForeach({
            id,
            connections: (
                targetId
                    ? [{ id: observe(Utils.getUUID()), targetId: observe(targetId), originId: observe(id), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }]
                    : []
            ),
            properties: [
                {
                    value: observe('Foreach'),
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
                    propertieType: observe(PropertieTypes.icon),
                    value: observe({ content: IconFlowForeach }),

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
        this._valideSourceList();
        this._valideConnections();
    }

    private _valideSourceList() {
        const schema = yup.string().min(1).trim();

        schema.validate(this.sourceList.value)
            .then(() => {
                set(this.errosIds, oldErros => {
                    if (oldErros.includes(this.sourceList.id)) {
                        return oldErros.filter(oldErros => oldErros !== this.sourceList.id);
                    } else {
                        return oldErros;
                    }
                });
            })
            .catch(() => {
                set(this.errosIds, oldErros => {
                    if (!oldErros.includes(this.sourceList.id)) {
                        return [
                            ...oldErros,
                            this.sourceList.id,
                        ];
                    } else {
                        return oldErros;
                    }
                });
            });

        // Subscribe to all changes
        this.sourceList.subscribe(connections => {
            schema.validate(connections)
                .then(() => {
                    set(this.errosIds, oldErros => {
                        if (oldErros.includes(this.sourceList.id)) {
                            return oldErros.filter(oldErros => oldErros !== this.sourceList.id);
                        } else {
                            return oldErros;
                        }
                    });
                })
                .catch(() => {
                    set(this.errosIds, oldErros => {
                        if (!oldErros.includes(this.sourceList.id)) {
                            return [
                                ...oldErros,
                                this.sourceList.id,
                            ];
                        } else {
                            return oldErros;
                        }
                    });
                });
        });
    }

    private _valideConnections() {
        const schema = yup.array().min(2).max(2);

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
