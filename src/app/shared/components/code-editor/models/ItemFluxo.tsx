export interface ItemFluxo {
    isSelecionado: boolean
    sucessor: string[],
    itemType: ItemType,
    height: number,
    width: number,
    nome: string,
    left: number,
    top: number,
    id: string | undefined,
    select(startTop: number, startLeft: number, endTop: number, endLeft: number): any,
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
    public isSelecionado: boolean = false;
    public sucessor: string[] = [];
    public height: number = 0;
    public width: number = 0;
    public nome: string = "";
    public left: number = 0;
    public top: number = 0;
    public id: string | undefined = undefined;

    /** Valida se o elemento está ou não na área que está sendo selecionada pelo mouse. */
    public select = (startTop: number, startLeft: number, endTop: number, endLeft: number) => {
        const top2 = this.top + this.height;
        const left2 = this.left + this.width;
        this.isSelecionado = (
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
            isSelecionado: boolean,
            sucessor: string[],
            itemType: ItemType,
            height: number,
            width: number,
            nome: string,
            left: number,
            top: number,
            id: string | undefined,
        }
    ) {
        this.isSelecionado = this.props.isSelecionado;
        this.sucessor = this.props.sucessor;
        this.itemType = this.props.itemType;
        this.height = this.props.height;
        this.width = this.props.width;
        this.nome = this.props.nome;
        this.left = this.props.left;
        this.top = this.props.top;
        this.id = this.props.id;
    }

}
