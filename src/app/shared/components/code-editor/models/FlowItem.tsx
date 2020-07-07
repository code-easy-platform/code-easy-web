import { IConnections, ICoords, IFlowItem } from "../shared/Interfaces";
import { ItemType } from "../shared/enums/ItemType";

/** Elemento que é reinderizado na para cada item de fluxo. */
export class FlowItem implements IFlowItem {

    public connections: IConnections[];
    public id: string | undefined;
    public isDisabled: boolean;
    public hasWarning: boolean;
    public isSelected: boolean;
    public itemType: ItemType;
    public hasError: boolean;
    public height: number;
    public width: number;
    public name: string;
    public left: number;
    public top: number;
    public icon: any;

    constructor(
        private props: {
            connections?: IConnections[],
            id: string | undefined,
            isSelected?: boolean,
            isDisabled?: boolean,
            hasWarning?: boolean,
            hasError?: boolean,
            itemType: ItemType,
            height?: number,
            width?: number,
            left?: number,
            name: string,
            top?: number,
            icon?: any,
        }
    ) {
        this.isSelected = this.props.isSelected || false;
        this.isDisabled = this.props.isDisabled || false;
        this.hasWarning = this.props.hasWarning || false;
        this.connections = this.props.connections || [];
        this.hasError = this.props.hasError || false;
        this.height = this.props.height || 50;
        this.itemType = this.props.itemType;
        this.width = this.props.width || 50;
        this.left = this.props.left || 0;
        this.top = this.props.top || 0;
        this.name = this.props.name;
        this.icon = this.props.icon;
        this.id = this.props.id;
    }

    /** Valida se o elemento está ou não na área que está sendo selecionada pelo mouse. */
    public select = (coords: ICoords) => {
        const top2 = this.top + this.height;
        const left2 = this.left + this.width;

        const yGreaterThan0 = ((coords.endY - coords.startY) > 0);
        const xGreaterThan0 = ((coords.endX - coords.startX) > 0);

        const lessThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 <= _coordStart) || (_param2 <= _coordStart)
                ) && (
                    (_param1 >= _coordEnd) || (_param2 >= _coordEnd)
                )
            );
        }

        const greaterThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
            return (
                (
                    (_param1 >= _coordStart) || (_param2 >= _coordStart)
                ) && (
                    (_param1 <= _coordEnd) || (_param2 <= _coordEnd)
                )
            );
        }

        this.isSelected = (
            (
                yGreaterThan0
                    ? greaterThan0Selected(this.top, top2, coords.startY, coords.endY)
                    : lessThan0Selected(this.top, top2, coords.startY, coords.endY)
            )
            &&
            (
                xGreaterThan0
                    ? greaterThan0Selected(this.left, left2, coords.startX, coords.endX)
                    : lessThan0Selected(this.left, left2, coords.startX, coords.endX)
            )
        );
    };

    public connectionSelect(connectionId: string | undefined) {

        if (!connectionId) return;

        this.connections.forEach(connection => {
            if (connection.connectionId === connectionId) {
                connection.isSelected = true;
            }
        });

    }

}
