import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../models/ItemFluxo';
import { Action } from '../flow-componets/Action';
import { Switch } from '../flow-componets/Switch';
import { Assign } from '../flow-componets/Assign';
import { Start } from '../flow-componets/Start';
import { End } from '../flow-componets/End';
import { If } from '../flow-componets/IF';

import icons_foreach from './../../shared/images/foreach.png';
import icons_switch from './../../shared/images/switch.png';
import icons_assign from './../../shared/images/assign.png';
import icons_action from './../../shared/images/action.png';
import icons_start from './../../shared/images/start.png';
import icons_end from './../../shared/images/end.png';
import icons_if from './../../shared/images/if.png';

/** Usado para definir o tipo de input de parâmetros no item drag. */
export interface ItemDragProps {
    id?: any
    title: string
    children?: any
    refItemPai?: any
    style: CustomStyle
    allowDrag?: boolean
    isSelecionado: boolean
    hideSourceOnDrag?: boolean
    itemType?: any/* ComponentType */

    /** Devolve 'itemId, top, left'. */
    outputPosition?: Function
    onChangeSelecionado?: Function
}

/** Auxilia na hora de passar configurações para o editor de fluxo. */
interface CustomStyle {
    top?: number
    left?: number
    width?: number
    height?: number
    border?: number
}

/** Usado para representar os itens de lógica no fluxo do editor e na toolbar. */
export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const {
        isSelecionado, onChangeSelecionado = () => { },
        allowDrag, refItemPai, itemType,
        id, outputPosition, title,
    } = props;

    const { width, height, top, left } = props.style;

    /** Usado para manter e gerenciar o stado deste componente. */
    const [state, setState] = useState({
        isMenuOpen: false,
        /** Usado para não bugar o onchangesucessor da linha que estou trocando.  */
        isMouseDown: false,
    });

    const sucessores: number[] = [0];

    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [, dragRef] = useDrag({
        item: { type: itemType, itemProps: { id, left, top, title, itemType, sucessor: sucessores } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    window.onmouseup = () => mouseUp;

    /** Serve para fechar o menu de contexto, caso ele esteja aberto. */
    window.onmousedown = () => {
        if (state.isMenuOpen) {
            setState({ ...state, isMenuOpen: false });
        }
    };

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = () => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = mouseMove;

        setState({ ...state, isMouseDown: true });
    }

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     * 
     * Também serve para fechar o menu de contexto.
     */
    const mouseUp = () => {
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;

        if (state.isMouseDown) {
            onChangeSelecionado(id);
            setState({ ...state, isMouseDown: false });
        }
    }

    /** Quando um item estiver selecionado e for arrastado na tale esta fun vai fazer isso acontecer. */
    const mouseMove = (event: any) => {
        outputPosition &&
            outputPosition(
                id,
                event.offsetY - ((height || 0) / 2),
                event.offsetX - ((width || 0) / 2),
            );
    }

    // Assim que configurado exibirá o menu de contexto deste item corrente.
    const contextMenu = (event: any) => {
        setState({ ...state, isMenuOpen: true });
        event.preventDefault();
    }

    /** Com base se é permitido ou não usar o "drag and drop" ele reinderiza o item na tela. */
    if (allowDrag) {
        const style: React.CSSProperties = {
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            cursor: 'move',
            fontSize: 10,
            width: 30,
        };

        return <div className="toolbar-item">
            {itemType === ItemType.FOREACH && <img id={id} title="FOREACH" style={style} ref={dragRef} src={icons_foreach} alt="FOREACH" />}
            {itemType === ItemType.SWITCH && <img id={id} title="SWITCH" style={style} ref={dragRef} src={icons_switch} alt="SWITCH" />}
            {itemType === ItemType.ASSIGN && <img id={id} title="ASSIGN" style={style} ref={dragRef} src={icons_assign} alt="ASSIGN" />}
            {itemType === ItemType.ACTION && <img id={id} title="ACTION" style={style} ref={dragRef} src={icons_action} alt="ACTION" />}
            {itemType === ItemType.START && <img id={id} title="START" style={style} ref={dragRef} src={icons_start} alt="START" />}
            {itemType === ItemType.END && <img id={id} title="END" style={style} ref={dragRef} src={icons_end} alt="END" />}
            {itemType === ItemType.IF && <img id={id} title="IF" style={style} ref={dragRef} src={icons_if} alt="IF" />}
        </div>;
    } else {
        /** Reinderiza um tipo de tag svg na tela, somente dentro do editor de fluxo. */
        return (
            <g
                onContextMenu={contextMenu}
                style={{ cursor: 'move' }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                key={id}
                id={id}
            >
                <text id={id} x={left} y={(top || 0) - 5} fill="#fff" >{title}</text>
                {itemType === ItemType.FOREACH && <Assign id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.ASSIGN && <Assign id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.SWITCH && <Switch id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.ACTION && <Action id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.START && <Start id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.END && <End id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
                {itemType === ItemType.IF && <If id={id} top={top} left={left} width={width} height={height} isSelecionado={isSelecionado} />}
            </g>
        );
    }
}
