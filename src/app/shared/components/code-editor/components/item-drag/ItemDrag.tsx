import React, { useEffect } from 'react';
import { IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowForeach, IconFlowIf, IconFlowStart, IconFlowSwitch } from 'code-easy-components';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';

import { ItemType } from '../../models/ItemFluxo';
import { FlowComponent } from './FlowComponent';
import { CustomDragLayer } from './CustomDragLayer';

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

    /** Armazena a posição onde o iten item do fluxo foi clicado. */
    let cliquedLocationFlowItem = {
        top: 0,
        left: 0,
    };

    const {
        isSelected, onContextMenu, hasError, onMouseUp,
        id, onChangePosition, onMouseDown, onMouseOver,
        width = 0, height = 0, top = 0, left = 0,
        allowDrag, itemType, icon,
    } = props;

    let { title } = props;

    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [{ isDragging }, dragRef, preview] = useDrag({
        item: { type: itemType || 'undefined', itemProps: { id, left, top, title, itemType, sucessor: [0] } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    /** Faz com que o item que está sendo arrastado tenha um preview custumizado */
    useEffect(() => { preview(getEmptyImage(), { captureDraggingState: true }) }, [preview]);

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

        const top = e.offsetY - cliquedLocationFlowItem.top;
        const left = e.offsetX - cliquedLocationFlowItem.left;

        if (onChangePosition) {
            onChangePosition(top, left, e as any);
        }

    }

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();
        if (onMouseDown) onMouseDown(e);

        cliquedLocationFlowItem = {
            top: e.nativeEvent.offsetY - top,
            left: e.nativeEvent.offsetX - left,
        };

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

    const getIcon = (type: ItemType | undefined) => {
        switch (type) {
            case ItemType.COMMENT:
                return IconFlowComment;
            case ItemType.FOREACH:
                return IconFlowForeach;
            case ItemType.SWITCH:
                return IconFlowSwitch;
            case ItemType.ASSIGN:
                return IconFlowAssign;
            case ItemType.ACTION:
                return IconFlowAction;
            case ItemType.START:
                return IconFlowStart;
            case ItemType.END:
                return IconFlowEnd;
            case ItemType.IF:
                return IconFlowIf;
            default:
                return;
        }
    };

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
            <img ref={dragRef} id={id} className="toolbar-item" style={style} src={getIcon(itemType as any)} title={title} alt={title} />
            {isDragging && <CustomDragLayer />}
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
                {itemType !== ItemType.COMMENT && <text x={(left || 0) + ((width || 0) / 2)} textAnchor="middle" fill="var(--color-white)" y={(top || 0) - 5} id={id}>{title}</text>}
                <FlowComponent id={id} top={top} left={left} width={width} height={height} isSelected={isSelected} hasError={hasError} icon={icon || getIcon(itemType)} />
            </g>
        );
    }

}
