import { IconError, IconWarning } from "code-easy-components";

import { IProperty, ITreeItem, EItemType } from "./../components/external";
import { BasicConfigurations } from "./BasicConfigurations";
import { FlowItemComponent } from "./FlowItemComponent";
import { DefaultPropsHelper } from "./../services";
import { ITreeItemComponent } from "../interfaces";
import { EComponentType, PropertieTypes } from "./../enuns";


type OmitInConstructor = Omit<ITreeItemComponent, 'name' | 'problems' | 'hasError' | 'hasWarning' | 'addProblem'>;

export class TreeItemComponent extends BasicConfigurations<EComponentType> implements ITreeItemComponent {
    public items: FlowItemComponent[];
    public ascendantId?: string;

    public get properties(): IProperty[] { return super.properties; }
    public set properties(props: IProperty[]) {

        // Ensures that the original properties are present, and add to the list if any are not
        const originalProperties = DefaultPropsHelper.getNewProps(this.type, this.name, this.type === EComponentType.routerExpose);
        originalProperties.forEach(originalProp => {
            if (!props.some(prop => prop.propertieType === originalProp.propertieType)) {
                props.push(originalProp);
            }
        });

        props.forEach(prop => {
            switch (prop.propertieType) {
                case PropertieTypes.url:
                    prop = this._propertieFromUrl(prop);
                    break;

                default:
                    break;
            }
        });

        super.properties = props;
    }

    public get problems(): ITreeItem[] {
        let problems = super.problems;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        }

        if (this.type !== EComponentType.routerConsume) {

            // Valida o numero de starts na tela
            let numStarts = this.items.filter(itemFlow => itemFlow.type === EItemType.START);
            if (numStarts.length > 1) {
                addProblem(`In ${this.label} must have only start flow item`, 'error');
            }

            // Valida se encontra um start e um end na tela
            if (this.type === EComponentType.globalAction || this.type === EComponentType.localAction || this.type === EComponentType.routerExpose) {
                if (!(this.items.some(comp => comp.type === EItemType.START) && this.items.some(comp => comp.type === EItemType.END))) {
                    addProblem(`A "${this.type}" must be have a "Start" and an "End" item in "${this.label}"`, 'error');
                }
            }

            // Valida os ends
            let unusedEnd = this.items.find(itemFlow => (itemFlow.type === EItemType.END) && !this.items.some(flowItem => flowItem.connections.some(connection => connection.targetId === itemFlow.id)));
            if (unusedEnd) {
                addProblem(`In "${this.label}" a "${unusedEnd.name}" flow item is not used`, 'error');
            }
        }

        this.items.forEach(flowItem => {
            problems = [
                ...problems,
                ...flowItem.problems,
            ];

            // Validates if the item has another item connected to itself
            if (!this.items.some(flowItemToValidate => flowItemToValidate.connections.some(connection => connection.targetId === flowItem.id))) {
                if (flowItem.type !== EItemType.START && flowItem.type !== EItemType.COMMENT) {
                    addProblem(`The flow item "${flowItem.label}" must be connected to the flow.`, 'error');
                }
            }
        });

        return problems;
    }

    constructor(fields: OmitInConstructor) {
        super(fields);

        this.properties = fields.properties || this.properties;
        this.ascendantId = fields.ascendantId || this.ascendantId;
        this.items = fields.items.map(item => new FlowItemComponent(item));
    }

    private _propertieFromUrl(prop: IProperty): IProperty {
        prop.value = String(prop.value).replaceAll('_', '-');
        return prop;
    }
}
