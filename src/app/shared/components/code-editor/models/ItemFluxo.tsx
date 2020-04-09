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
            isSelected: boolean,
            sucessor: string[],
            itemType: ItemType,
            height: number,
            width: number,
            name: string,
            left: number,
            top: number,
            id: string | undefined,
        }
    ) {
        this.isSelected = this.props.isSelected;
        this.sucessor = this.props.sucessor;
        this.itemType = this.props.itemType;
        this.height = this.props.height;
        this.width = this.props.width;
        this.name = this.props.name;
        this.left = this.props.left;
        this.top = this.props.top;
        this.id = this.props.id;
    }

}
