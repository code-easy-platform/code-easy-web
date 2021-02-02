import { IObservable, observe, set, transform } from "react-observing";
import { IconFlowAssign, Utils } from "code-easy-components";
import * as yup from 'yup';

import { EFlowItemType, EItemType, IConnection, IFileContent, IProperty, TypeOfValues } from "./../../../components/external";
import { IFlowItemAssign } from "./../../../interfaces";
import { PropertieTypes } from "./../../../enuns";
import { FlowItemComponent } from "../generic";

interface IConstrutor {
    connections?: IConnection[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full if flow item implementation
 */
export class FlowItemAssign extends FlowItemComponent<EItemType.ASSIGN> implements IFlowItemAssign {
    public get description(): IObservable<undefined> {
        return transform(super.description, () => undefined, () => undefined);
    }
    public get flowItemType(): IObservable<EFlowItemType.acorn> {
        return transform(super.flowItemType, () => EFlowItemType.acorn, () => EFlowItemType.acorn);
    }
    public get icon(): IObservable<IFileContent> {
        return transform(super.icon, () => ({ content: IconFlowAssign }), () => ({ content: IconFlowAssign }));
    }

    public get isEnabledNewConnetion(): IObservable<boolean> {
        return transform(this.connections, connections => connections.length < 1);
    }

    public get connections(): IObservable<IConnection[]> {
        return transform(super.connections, connections => connections, connections => {
            if (connections.length > 1) {
                return [connections[0]];
            }
            return connections;
        });
    }

    public get assigments(): IObservable<IProperty[]> {
        const handleReadAssigns = (properties: IProperty[]): IProperty[] => {
            return properties.filter(prop => prop.propertieType.value === PropertieTypes.assigns);
        };

        const handleSetAssigns = (assigns: IProperty[]): IProperty[] => {
            return [
                ...this.properties.value.filter(prop => prop.propertieType.value === PropertieTypes.assigns),
                ...assigns,
            ];
        }

        return transform(this.properties, handleReadAssigns, handleSetAssigns);
    }

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            connections: props.connections,
            type: EItemType.ASSIGN,
            id: props.id,
        });

        this._valideConnections();
        this._initializeAssigns();
    }

    private _valideConnections() {
        const schema = yup.array().length(2);

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

    private _initializeAssigns() {
        const assigns = this.assigments.value;
        const emptyAssigments = assigns.filter(prop => (prop.name.value === '' && prop.value.value === ''));

        if (emptyAssigments.length === 0) {
            // Adding a new assigm
            set(this.properties, properties => [
                ...properties,
                {
                    name: observe(''),
                    value: observe(''),
                    focusOnRender: observe(true),
                    id: observe(Utils.getUUID()),
                    group: observe('Assigments'),
                    type: observe(TypeOfValues.assign),
                    propertieType: observe(PropertieTypes.assigns),

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
                }
            ]);
        } else if (emptyAssigments.length > 1) {
            set(this.properties, properties => [
                ...properties.filter(prop => !(prop.name.value === '' && prop.value.value === '')),
                emptyAssigments[0],
            ]);
        }
    }

    public static newItem(top: number, left: number, targetId?: string, isSelected: boolean = false) {
        const id = Utils.getUUID();

        return new FlowItemAssign({
            id,
            connections: (
                targetId
                    ? [{ id: observe(Utils.getUUID()), targetId: observe(targetId), originId: observe(id), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }]
                    : []
            ),
            properties: [
                {
                    value: observe('Assign'),
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
                    value: observe(undefined),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.hidden),
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
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.hidden),
                    name: observe(PropertieTypes.icon),
                    value: observe({ content: IconFlowAssign }),
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
                {
                  value: observe(true),
                  id: observe(Utils.getUUID()),
                  type: observe(TypeOfValues.hidden),
                  name: observe(PropertieTypes.isEditableOnDoubleClick),
                  propertieType: observe(PropertieTypes.isEditableOnDoubleClick),
          
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
                  name: observe(PropertieTypes.isEditingTitle),
                  propertieType: observe(PropertieTypes.isEditingTitle),
          
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
            ],
        });
    }
}
