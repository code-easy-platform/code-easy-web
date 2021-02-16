import { IObservable, observe, transform } from "react-observing";
import { IconFlowEnd, Utils } from "code-easy-components";

import { EFlowItemType, EItemType, IFileContent, IProperty, TypeOfValues } from "./../../../components/external";
import { IFlowItemEnd } from "./../../../interfaces";
import { PropertieTypes } from "./../../../enuns";
import { FlowItemComponent, TreeItemComponent } from "../generic";

interface IConstrutor {
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full end flow item implementation
 */
export class FlowItemEnd extends FlowItemComponent<EItemType.END> implements IFlowItemEnd {
    public get label(): IObservable<'End'> {
        return transform(super.label, () => 'End', () => 'End');
    }
    public get description(): IObservable<undefined> {
        return transform(super.description, () => undefined, () => undefined);
    }
    public get flowItemType(): IObservable<EFlowItemType.acorn> {
        return transform(super.flowItemType, () => EFlowItemType.acorn, () => EFlowItemType.acorn);
    }
    public get icon(): IObservable<IFileContent> {
        return transform(super.icon, () => ({ content: IconFlowEnd }), () => ({ content: IconFlowEnd }));
    }
    public get isEnabledNewConnetion(): IObservable<false> {
        return transform(super.isEnabledNewConnetion, () => false, () => false);
    }
    public get connections(): IObservable<[]> {
        return transform(super.connections, () => [], () => []);
    }
    public get isAcceptingConnections() {
        return super.isAcceptingConnections;
    }
    public get isEditingTitle() {
        return transform(super.isEditingTitle, () => false, () => false);
    }
    public get isEditableOnDoubleClick() {
        return transform(super.isEditableOnDoubleClick, () => false, () => false);
    }
    constructor(parent: TreeItemComponent, props: IConstrutor) {
        super(parent, {
            properties: props.properties || [],
            type: EItemType.END,
            id: props.id,
        });
    }

    public static newItem(parent: TreeItemComponent, top: number, left: number, isSelected: boolean = false) {
        return new FlowItemEnd(parent, {
            id: Utils.getUUID(),
            properties: [
                {
                    value: observe('End'),
                    id: observe(Utils.getUUID()),
                    name: observe(PropertieTypes.label),
                    type: observe(TypeOfValues.hidden),
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
                    value: observe({content: IconFlowEnd}),
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
}
