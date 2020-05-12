import { Coords } from "../shared/Interfaces/CodeEditorInterfaces";

export interface ItemFluxo {
    id: string | undefined;
    isSelected: boolean;
    hasError?: boolean;
    sucessor: string[];
    itemType: ItemType;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
    icon: any;
    select(coords: Coords): any;
}

/** Tipos de itens existentes na toolbar. */
export enum ItemType {
    COMMENT = "COMMENT",
    FOREACH = "FOREACH",
    SWITCH = "SWITCH",
    ASSIGN = "ASSIGN",
    ACTION = "ACTION",
    START = "START",
    END = "END",
    IF = "IF",
}

/** Elemento que é reinderizado na para cada item de fluxo. */
export class FlowItem implements ItemFluxo {

    public itemType: ItemType = ItemType.START;
    public id: string | undefined = undefined;
    public isSelected: boolean = false;
    public hasError?: boolean = false;
    public sucessor: string[] = [];
    public height: number = 0;
    public width: number = 0;
    public name: string = "";
    public left: number = 0;
    public top: number = 0;
    public icon: any;

    /** Valida se o elemento está ou não na área que está sendo selecionada pelo mouse. */
    public select = (coords: Coords) => {
        const top2 = this.top + this.height;
        const left2 = this.left + this.width;
        this.isSelected = (
            (
                ((coords.endY - coords.startY) > 0)
                    ? ((this.top >= coords.startY) || (top2 >= coords.startY)) && ((this.top <= coords.endY) || (top2 <= coords.endY))
                    : ((this.top <= coords.startY) || (top2 <= coords.startY)) && ((this.top >= coords.endY) || (top2 >= coords.endY))
            )
            &&
            (
                ((coords.endX - coords.startX) > 0)
                    ? ((this.left >= coords.startX) || (left2 >= coords.startX)) && ((this.left <= coords.endX) || (left2 <= coords.endX))
                    : ((this.left <= coords.startX) || (left2 <= coords.startX)) && ((this.left >= coords.endX) || (left2 >= coords.endX))
            )
        );
    };

    constructor(
        private props: {
            id: string | undefined,
            isSelected?: boolean,
            sucessor?: string[],
            hasError?: boolean,
            itemType: ItemType,
            height?: number,
            width?: number,
            name: string,
            left?: number,
            top?: number,
            icon?: any,
        }
    ) {
        this.isSelected = this.props.isSelected || false;
        this.sucessor = this.props.sucessor || [];
        this.height = this.props.height || 0;
        this.itemType = this.props.itemType;
        this.hasError = this.props.hasError;
        this.width = this.props.width || 0;
        this.left = this.props.left || 0;
        this.top = this.props.top || 0;
        this.name = this.props.name;
        this.icon = this.props.icon;
        this.id = this.props.id;
    }

}
