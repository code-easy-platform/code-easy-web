import { IObservable, observe, transform } from "react-observing";
import { Utils } from "code-easy-components";

import { EFlowItemType, EItemType, IConnection, IProperty, TypeOfValues } from "../../components/external";
import { IFlowItemComment } from "../../interfaces";
import { FlowItemComponent } from "../generic";
import { PropertieTypes } from "../../enuns";

interface IConstrutor {
    connections?: IConnection[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full comment flow item implementation
 */
export class FlowItemComment extends FlowItemComponent<EItemType.COMMENT> implements IFlowItemComment {
    public get flowItemType(): IObservable<EFlowItemType.comment> {
        return transform(super.flowItemType, () => EFlowItemType.comment, () => EFlowItemType.comment);
    }
    public get icon(): IObservable<undefined> {
        return transform(super.icon, () => undefined, () => undefined);
    }
    public get isEnabledNewConnetion(): IObservable<true> {
        return transform(super.isEnabledNewConnetion, () => true, () => true);
    }
    public get hasError(): IObservable<false> {
        return transform(super.hasError, () => false, () => false);
    }
    public get hasWarning(): IObservable<false> {
        return transform(super.hasWarning, () => false, () => false);
    }
    public get isDisabled(): IObservable<false> {
        return transform(super.isDisabled, () => false, () => false);
    }

    public get description(): IObservable<string | undefined> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.comment)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                name: observe(PropertieTypes.comment),
                type: observe(TypeOfValues.fullBigString),
                propertieType: observe(PropertieTypes.comment),

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
            connections: props.connections,
            type: EItemType.COMMENT,
            id: props.id,
        });
    }

    public static newItem(top: number, left: number, isSelected: boolean = false) {
        return new FlowItemComment({
            id: Utils.getUUID(),
            properties: [
                {
                    value: observe('Comment'),
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
                    value: observe(undefined),
                    id: observe(Utils.getUUID()),
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
}
