import React from 'react';
import { useDrag } from 'react-dnd';
import { IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowForeach, IconFlowIf, IconFlowStart, IconFlowSwitch } from 'code-easy-components';

import { ItemType } from '../../models/ItemFluxo';
import { FlowComponent } from './FlowComponent';
import { FlowComment } from './FlowComment';

/** Usado para definir o tipo de input de parâmetros no item drag. */
export interface ItemDragProps {
    id?: any;
    icon?: any;
    top?: number;
    left?: number;
    title: string;
    children?: any;
    width?: number;
    height?: number;
    border?: number;
    hasError?: boolean;
    allowDrag?: boolean;
    isSelected: boolean;
    itemType?: ItemType;
    parentElementRef?: any;
    hideSourceOnDrag?: boolean;

    onNameChange?(text: string): void;
    onMouseUp?(e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onMouseOver?(e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onMouseDown?(e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onContextMenu?(data?: any, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
    onChangePosition?(top: number, left: number, e?: React.MouseEvent<SVGGElement, MouseEvent>): void;
}

/** Usado para representar os itens de lógica no fluxo do editor e na toolbar. */
export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const {
        isSelected, onContextMenu, hasError, onMouseUp,
        id, onChangePosition, onMouseDown, onMouseOver,
        width = 0, height = 0, top = 0, left = 0,
        allowDrag, itemType, icon, onNameChange
    } = props;

    let { title } = props;


    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [, dragRef] = useDrag({
        item: { type: itemType || 'undefined', itemProps: { id, left, top, title, itemType, sucessor: [0] } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     *
     * Também serve para fechar o menu de contexto.
     */
    const mouseUp = (e: MouseEvent) => {
        e.stopPropagation();
        window.onmousemove = null;
        window.onmouseup = null;
    }

    /** Quando um item estiver selecionado e for arrastado na tale esta fun vai fazer isso acontecer. */
    const mouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        const top = e.offsetY - ((height || 0) / 2);
        const left = e.offsetX - ((width || 0) / 2);

        if (onChangePosition) {
            onChangePosition(top, left, e as any);
        }
    }

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        if (onMouseDown) onMouseDown(e);

        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }

    // Assim que configurado exibirá o menu de contexto deste item corrente.
    const contextMenu = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (onContextMenu) {
            event.preventDefault();
            onContextMenu({ itemId: id, itemType: itemType }, event);
        }
    }

    /** Com base se é permitido ou não usar o "drag and drop" ele reinderiza o item na tela. */
    if (allowDrag) {
        const style: React.CSSProperties = {
            justifyContent: "center",
            alignItems: "center",
            cursor: "move",
            margin: "5px",
            fontSize: 10,
            width: 30,
        };

        return <>
            {itemType === ItemType.COMMENT && <img id={id} className="toolbar-item" title="COMMENT" style={style} ref={dragRef} src={IconFlowComment} alt="COMMENT" />}
            {itemType === ItemType.FOREACH && <img id={id} className="toolbar-item" title="FOREACH" style={style} ref={dragRef} src={IconFlowForeach} alt="FOREACH" />}
            {itemType === ItemType.SWITCH && <img id={id} className="toolbar-item" title="SWITCH" style={style} ref={dragRef} src={IconFlowSwitch} alt="SWITCH" />}
            {itemType === ItemType.ASSIGN && <img id={id} className="toolbar-item" title="ASSIGN" style={style} ref={dragRef} src={IconFlowAssign} alt="ASSIGN" />}
            {itemType === ItemType.ACTION && <img id={id} className="toolbar-item" title="ACTION" style={style} ref={dragRef} src={IconFlowAction} alt="ACTION" />}
            {itemType === ItemType.START && <img id={id} className="toolbar-item" title="START" style={style} ref={dragRef} src={IconFlowStart} alt="START" />}
            {itemType === ItemType.END && <img id={id} className="toolbar-item" title="END" style={style} ref={dragRef} src={IconFlowEnd} alt="END" />}
            {itemType === ItemType.IF && <img id={id} className="toolbar-item" title="IF" style={style} ref={dragRef} src={IconFlowIf} alt="IF" />}
        </>;
    } else {

        // Ajusta o tamanho do titulo para não ficar muito grande
        title = title.length < 10 ? title : title.slice(0, 15);

        /** Reinderiza um tipo de tag svg na tela, somente dentro do editor de fluxo. */
        return (
            <g
                id={id}
                key={id}
                onMouseUp={onMouseUp}
                onMouseDown={mouseDown}
                onMouseOver={onMouseOver}
                onContextMenu={contextMenu}
            >
                <text x={(left || 0) + ((width || 0) / 2)} textAnchor="middle" fill="var(--color-white)" y={(top || 0) - 5} id={id}>{title}</text>
                {itemType === ItemType.COMMENT && <FlowComment id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} childImage={IconFlowComment} onNameChange={onNameChange} />}
                {itemType === ItemType.ACTION && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={icon || IconFlowAction} />}
                {itemType === ItemType.FOREACH && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowForeach} />}
                {itemType === ItemType.ASSIGN && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowAssign} />}
                {itemType === ItemType.SWITCH && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowSwitch} />}
                {itemType === ItemType.START && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowStart} />}
                {itemType === ItemType.END && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowEnd} />}
                {itemType === ItemType.IF && <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={IconFlowIf} />}
            </g>
        );
    }

}
