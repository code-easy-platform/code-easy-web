import { IProperty } from "./../../components/properties-editor/shared/interfaces";
import { EComponentType } from "./../../enuns/ComponentType";
import { IFlowItemComponent } from "./../../interfaces";
import { IBasicFields } from "./IBasicFields";

export interface ITreeItemComponent extends IBasicFields {
    /** Usado para poder indicar ao fluxo de items qual items de uma árvore está sendo editado no momento */
    isEditing: boolean;
    /** Indica onde o item está selecionado na árvore. */
    isSelected: boolean;
    /** Usado para arvore ajuda a sabe se o item é uma pasta ou um arquivo */
    type: EComponentType;
    /** Indica se um node(nó) de uma arvore está aberto ou fechado. */
    nodeExpanded: boolean;
    /**Usado para lista todas as propriedades de um item */
    properties: IProperty[];
    /** Usado para conter os items de um fluxo */
    items: IFlowItemComponent[];
    /** Usado para fazer auto referência usado para construir árvores */
    itemPaiId: string | undefined;
}
