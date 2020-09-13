import { IProperty } from "./../../components/properties-editor/shared/interfaces";
import { IFlowItemComponent, IItemComponentConfigs } from "./../../interfaces";

export interface ITreeItemComponent extends IItemComponentConfigs {
    /**Usado para lista todas as propriedades de um item */
    properties?: IProperty[];
    /** Usado para conter os items de um fluxo */
    items: IFlowItemComponent[];
    /** Usado para fazer auto referência usado para construir árvores */
    itemPaiId: string | undefined;
}
