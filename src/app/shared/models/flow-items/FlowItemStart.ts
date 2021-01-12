import { IObservable, observe, transform } from "react-observing";
import { IconFlowStart, Utils } from "code-easy-components";

import { EFlowItemType, EItemType, IConnection, IFileContent, IProperty, TypeOfValues } from "../../components/external";
import { IFlowItemStart } from "../../interfaces";
import { FlowItemComponent } from "../generic";
import { PropertieTypes } from "../../enuns";

interface IConstrutor {
    connections?: IConnection[];
    properties?: IProperty[];
    id?: string;
}

/**
 * Represents a full start flow item implementation
 */
export class FlowItemStart extends FlowItemComponent<EItemType.START> implements IFlowItemStart {
    public get label(): IObservable<'Start'> {
        return transform(super.label, () => 'Start', () => 'Start');
    }
    public get description(): IObservable<undefined> {
        return transform(super.description, () => undefined, () => undefined);
    }
    public get flowItemType(): IObservable<EFlowItemType.acorn> {
        return transform(super.flowItemType, () => EFlowItemType.acorn, () => EFlowItemType.acorn);
    }
    public get icon(): IObservable<IFileContent> {
        return transform(super.icon, () => ({ content: IconFlowStart }), () => ({ content: IconFlowStart }));
    }

    public get isEnabledNewConnetion(): IObservable<boolean> {
        return transform(this.connections, connections => connections.length < 1);
    }

    public get connections(): IObservable<IConnection[]> {
        return transform(this.connections, connections => connections, connections => {
            if (connections.length > 0) {
                return [connections[connections.length - 1]];
            }
            return [];
        });
    }

    constructor(props: IConstrutor) {
        super({
            properties: props.properties || [],
            connections: props.connections,
            type: EItemType.START,
            id: props.id,
        });
    }

    public static newItem(top: number, left: number, targetId?: string) {
        const id = Utils.getUUID();

        return new FlowItemStart({
            id,
            connections: (
                targetId
                    ? [{ id: observe(Utils.getUUID()), targetId: observe(targetId), originId: observe(id), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }]
                    : []
            ),
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
