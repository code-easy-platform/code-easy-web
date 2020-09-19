import { IconError, IconWarning } from "code-easy-components";

import { IProperty } from "./../components/properties-editor";
import { BasicConfigurations } from "./BasicConfigurations";
import { ITreeItem } from "./../components/tree-manager";
import { EItemType } from "./../components/flow-editor";
import { FlowItemComponent } from "./FlowItemComponent";
import { DefaultPropsHelper } from "./../services";
import { ITreeItemComponent } from "../interfaces";
import { EComponentType } from "./../enuns";


type OmitInConstructor = 'name' | 'problems';

export class TreeItemComponent extends BasicConfigurations<EComponentType> implements ITreeItemComponent {
    public items: FlowItemComponent[];
    public ascendantId?: string;

    public get properties(): IProperty[] { return super.properties; }
    public set properties(props: IProperty[]) {

        // Ensures that the original properties are present, and add to the list if any are not
        const originalProperties = DefaultPropsHelper.getNewProps(this.type, this.name);
        originalProperties.forEach(originalProp => {
            if (!props.some(prop => prop.propertieType === originalProp.propertieType)) {
                props.push(originalProp);
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
                numStarts.forEach(start => start.hasError = true);
            } else {
                numStarts.forEach(start => start.hasError = false);
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
                unusedEnd.hasError = true;
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
                    flowItem.hasError = true;
                    this.hasError = true;
                }
            }

        });

        return problems;
    }

    constructor(fields: Omit<ITreeItemComponent, OmitInConstructor>) {
        super(fields);

        this.properties = fields.properties || this.properties;
        this.items = fields.items.map(item => new FlowItemComponent(item));
    }
}
