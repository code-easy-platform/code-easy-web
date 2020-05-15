import { FlowItem } from "../../models/ItemFluxo";

/** Usado para mapear um quadrado de coordenadas */
export interface Coords { startY: number, startX: number, endY: number, endX: number };

export interface BreadCampButton { label: string; disabled?: boolean; onClick(e: any): void; }

/**
 * Propriedades aceitas pelo editor.
 */
export interface ICodeEditorProps {

    /** Identifier of the component in react and html native elements */
    id: string;

    /** Usado para custumizar o background do painel */
    backgroundType?: 'dotted' | 'checkered' | 'custom';

    /** boolean - Usado para exibir ou não a toolbox com itens de lógica. */
    showToolbar: boolean;

    /** FlowItem[] - Usado para exibir os itens na toolbox do editor. */
    toolItens?: FlowItem[];

    /** FlowItem[] - Usado para exibir os itens na tela do editor */
    itens: FlowItem[];

    /** string[] - Usado para definir quais itens adicionais são permitidos no fluxo */
    allowedsInDrop?: string[];

    /** BreadCampButton[] - Usado para identifica qual o caminho da action que está aberta */
    breadcrumbs?: BreadCampButton[];

    /** Se "true" desabilita a área de seleção na tela. */
    enabledSelection?: boolean;

    /** Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos itens de fluxo. */
    onChangeItens(itens: FlowItem[]): any;

    /** Function - Acionada quando um item for dropado no editor espera o mesmo item, porem o item pode sofrer alterações adicionais */
    onDropItem?(oldItemId: string, newItemId: string, newItem: FlowItem): FlowItem | undefined;

    /** Function - usada para emitir um evento de output para que seja exibido um menu de contexto  */
    onContextMenu?(data?: any, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;

    /** Function - usada para emitir um evento quando o mouse passar sobre o editor */
    onMouseOver?(e?: React.MouseEvent<SVGSVGElement, MouseEvent> | undefined): void;

    /** Function - usada para emitir um evento quando uma tecla é precionada  */
    onKeyDown?(e?: React.KeyboardEvent<SVGSVGElement>): void;

}
