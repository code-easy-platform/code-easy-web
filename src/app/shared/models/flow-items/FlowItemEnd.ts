import { IObservable, observe, transform } from "react-observing";
import { IconFlowEnd, Utils } from "code-easy-components";

import { EFlowItemType, EItemType, IFileContent, IProperty, TypeOfValues } from "../../components/external";
import { IFlowItemEnd } from "../../interfaces";
import { FlowItemComponent } from "../generic";
import { PropertieTypes } from "../../enuns";

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
        return transform(this.connections, () => [], () => []);
    }

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            type: EItemType.END,
            id: props.id,
        });
    }

    public static newItem(top: number, left: number) {
        return new FlowItemEnd({
            id: Utils.getUUID(),
            properties: [
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
            ],
        });
    }
}
