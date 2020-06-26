import React from 'react';

import { ItemType } from '../../shared/enums/ItemType';
import { FlowItem } from '../../models/ItemFluxo';
import { Line } from './Line';

interface ILinesProps {
    item: FlowItem;
    disableOpacity: number;
    isUseNewBranch: boolean;
    itemsConnections: FlowItem[];
    onSucessorChange(itemId: string | undefined, sucessorId: string, branchIndex: number | undefined): void;
};
export const Lines: React.FC<ILinesProps> = ({ itemsConnections, item, onSucessorChange, isUseNewBranch, disableOpacity }) => {
    return <>
        {itemsConnections.map((itemConnection: FlowItem, index: number) => {

            /** Para o item final do fluxo não deve criar uma linha */
            if (item.itemType === ItemType.END) return null;

            /** Se for undefined não cria a linha */
            if (item.id === undefined) return null;

            /** Tem a posição do item de destino da seta */
            const left2 = itemConnection ? itemConnection.left + (itemConnection.width / 2) : item.left + (item.width / 2);
            const top2 = itemConnection ? itemConnection.top + (itemConnection.height / 2) : item.top + (item.height / 2);

            /** Valida se a linha deve estar curvada para facilitar a visualização */
            const isCurved = itemConnection.connections.some(connection => connection.connectionId === item.id);

            /** Busca a connection que está criando esta linha */
            const connection = item.connections.find(connection => connection.connectionId === itemConnection.id);

            return <Line
                lineOnMouseDown={() => itemConnection.connectionSelect(itemConnection.id)}
                lineType={item.itemType === ItemType.COMMENT ? 'dotted' : 'normal'}
                color={connection?.isSelected ? "var(--color-botton-bar)" : "gray"}
                left1={(item.left || 0) + ((item.width || 0) / 2)}
                top1={(item.top || 0) + (item.height || 0) / 2}
                key={item.id + "_" + itemConnection.id}
                lineText={connection?.connectionLabel}
                onSucessorChange={onSucessorChange}
                disableOpacity={disableOpacity}
                isDisabled={item.isDisabled}
                sucessorIndex={index}
                isCurved={isCurved}
                left2={left2}
                id={item.id}
                top2={top2}
            />;

        })}

        {/* Usado para adicionar uma branch caso o item não tenha sucessores ainda, ou tenha bugado */}
        {(isUseNewBranch && item.id !== undefined) &&
            <Line
                left1={(item.left || 0) + ((item.width || 0) / 2)}
                top1={(item.top || 0) + (item.height || 0) / 2}
                left2={item.left + (item.width / 2)}
                top2={item.top + (item.height + 20)}
                onSucessorChange={onSucessorChange}
                disableOpacity={disableOpacity}
                color={"gray"}
                key={item.id}
                id={item.id}
            />
        }

    </>
};
