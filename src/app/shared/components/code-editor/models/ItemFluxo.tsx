export interface ItemFluxo {
    id: string | undefined;
    isSelected: boolean;
    sucessor: string[];
    itemType: ItemType;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
    select(startTop: number, startLeft: number, endTop: number, endLeft: number): any;
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
    public sucessor: string[] = [];
    public height: number = 0;
    public width: number = 0;
    public name: string = "";
    public left: number = 0;
    public top: number = 0;

    /** Valida se o elemento está ou não na área que está sendo selecionada pelo mouse. */
    public select = (startTop: number, startLeft: number, endTop: number, endLeft: number) => {
        const top2 = this.top + this.height;
        const left2 = this.left + this.width;
        this.isSelected = (
            (
                ((endTop - startTop) > 0)
                    ? ((this.top >= startTop) || (top2 >= startTop)) && ((this.top <= endTop) || (top2 <= endTop))
                    : ((this.top <= startTop) || (top2 <= startTop)) && ((this.top >= endTop) || (top2 >= endTop))
            )
            &&
            (
                ((endLeft - startLeft) > 0)
                    ? ((this.left >= startLeft) || (left2 >= startLeft)) && ((this.left <= endLeft) || (left2 <= endLeft))
                    : ((this.left <= startLeft) || (left2 <= startLeft)) && ((this.left >= endLeft) || (left2 >= endLeft))
            )
        );
    };

    constructor(
        private props: {
            id: string | undefined,
            isSelected?: boolean,
            sucessor?: string[],
            itemType: ItemType,
            height?: number,
            width?: number,
            name: string,
            left?: number,
            top?: number,
        }
    ) {
        this.isSelected = this.props.isSelected || false;
        this.sucessor = this.props.sucessor || [];
        this.height = this.props.height || 0;
        this.itemType = this.props.itemType;
        this.width = this.props.width || 0;
        this.left = this.props.left || 0;
        this.top = this.props.top || 0;
        this.name = this.props.name;
        this.id = this.props.id;
    }

}
