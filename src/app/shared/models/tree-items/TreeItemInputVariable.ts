import { IObservable, observe, set, transform } from "react-observing";

import { ITreeItemInputVariable } from "../../interfaces";
import { IProperty, ISuggestion, TypeOfValues } from "../../components/external";
import { TreeItemComponent } from "../generic";
import { EDataTypes, DataTypesList, EComponentType, PropertieTypes } from "../../enuns";
import { IconInputParam, Utils } from "code-easy-components";

interface IConstrutor {
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full input variable implementation
 */
export class TreeItemInputVariable extends TreeItemComponent<EComponentType.inputVariable> implements ITreeItemInputVariable {
    items: IObservable<[]> = observe([]);
    public get isEditing(): IObservable<false> {
        if (super.isEditing.value) {
            set(super.isEditing, false);
        }
        return transform(super.isEditing, () => false, () => false);
    }

    public get isRequired(): IObservable<false> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.required)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(true);

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.required),
                propertieType: observe(PropertieTypes.required),

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
            type: EComponentType.inputVariable,
            id: props.id,
            items: [],
        });

        this.isRequired.subscribe(value => {
            this.properties.value.forEach(propertie => {
                if (propertie.propertieType.value === PropertieTypes.defaultValue) {
                    set(propertie.type, value ? TypeOfValues.hidden : TypeOfValues.string);
                }
            });
        });
    }

    public static newVariable(label: string, ascendantId?: string) {
        return new TreeItemInputVariable({
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
                    type: observe(TypeOfValues.boolean),
                    name: observe(PropertieTypes.required),
                    propertieType: observe(PropertieTypes.required),

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
                    value: observe(EDataTypes.string),
                    type: observe(TypeOfValues.selection),
                    name: observe(PropertieTypes.dataType),
                    propertieType: observe(PropertieTypes.dataType),
                    suggestions: observe<ISuggestion<EDataTypes>[]>(DataTypesList.map(dataType => ({
                        description: observe(dataType),
                        disabled: observe(false),
                        value: observe(dataType),
                        label: observe(dataType),
                        name: observe(dataType),
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
                    type: observe(TypeOfValues.hidden),
                    name: observe(PropertieTypes.defaultValue),
                    propertieType: observe(PropertieTypes.defaultValue),

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
                    value: observe({ content: IconInputParam }),

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
            ]
        });
    }
}
