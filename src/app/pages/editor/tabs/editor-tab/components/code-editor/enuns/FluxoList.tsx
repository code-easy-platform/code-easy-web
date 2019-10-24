export enum FluxoItemTypes {
    flowItem="flowItem",
    poligon="poligon"
}

export interface ItemFluxo {
    top: number;
    left: number;
    width: number;
    height: number;
    title: string;
    fluxoItemTypes: FluxoItemTypes;
    isHaveAntecessor:boolean;
    isHaveSucessor:boolean;
    antecessorKey: string | number;
    sucessorKey: string | number;
}

export interface FluxoList {
    [key: string]: ItemFluxo
}

export default FluxoList;
