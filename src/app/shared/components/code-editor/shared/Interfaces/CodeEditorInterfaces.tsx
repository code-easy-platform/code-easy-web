import { FlowItem } from "../../models/ItemFluxo";

/**
 * Propriedades aceitas pelo editor.
 */
export interface ICodeEditorProps {

    /** boolean - Usado para exibir ou não a toolbox cons itens de lógica. */
    isShowToolbar: boolean,

    /** FlowItem[] - Usado para exibir os itens na toolbox do editor. */
    toolItens?: FlowItem[],

    /** FlowItem[] - Usado para exibir os itens na tela do editor */
    itens: FlowItem[],

    /** Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos itens de fluxo. */
    onChangeItens(itens: FlowItem[]): any
}

/** É onde está o estado do editor inteira */
export interface ICodeEditorState {
    /** Mantem aqui o estado de todos os componentes contidos no fluxo */
    flowItens: FlowItem[],

    /** Ajuda a manter o estado do item que está selecionado. */
    selectedItem: { itemId: number },

    /** Controla o tamanho do "painel" onde os elementos de fluxo estão */
    svgSize: {

        /** Controla a **height(altura)** do "painel" dos elementos  */
        svgHeight: number,

        /** Controla o **width(largura)** do "painel" dos elementos  */
        svgWidth: number

    },

    /** Controla o svg que faz a seleção de componentes de fluxo na tela. */
    selectionProps: {

        /** Ajuda a identificar se o mouse está clicado ou não */
        isMouseDown: boolean,

        /** Ajuda a controlar a exibição do selection caso algum valor seja negativo */
        runtimeStartLeft: number,

        /** Ajuda a controlar a exibição do selection caso algum valor seja negativo */
        runtimeStartTop: number,

        /** Guarda a posição left de onde foi começado a arrastar o mouse pela tela */
        startLeft: number,

        /** Guarda a posição top de onde foi começado a arrastar o mouse pela tela */
        startTop: number,

        /** Guarda a posição top de onde o mouse está na tela, este numero for negativo é usado o runtimeStartTop */
        endTop: number,

        /** Guarda a posição left de onde o mouse está na tela, este numero for negativo é usado o runtimeStartLeft */
        endLeft: number

    }
}