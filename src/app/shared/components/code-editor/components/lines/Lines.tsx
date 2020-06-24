import React from 'react';

import { FlowItem, ItemType } from '../../models/ItemFluxo';
import { Line } from './Line';

interface LinesProps {
    item: FlowItem;
    isUseNewBranch: boolean;
    itensSucessores: FlowItem[];
    onSucessorChange(itemId: string | undefined, sucessorId: string, branchIndex: number | undefined): void;
};
export const Lines: React.FC<LinesProps> = ({ itensSucessores, item, onSucessorChange, isUseNewBranch }) => {
    return <>
        {itensSucessores.map((sucessorItem: FlowItem, index: number) => {

            /** Para o item final do fluxo não deve criar uma linha */
            if (item.itemType === ItemType.END) return null;

            /** Se for undefined não cria a linha */
            if (item.id === undefined) return null;

            /** Tem a posição do item de destino da seta */
            const left2 = sucessorItem ? sucessorItem.left + (sucessorItem.width / 2) : item.left + (item.width / 2);
            const top2 = sucessorItem ? sucessorItem.top + (sucessorItem.height / 2) : item.top + (item.height / 2);

            /** Valida se a linha deve estar curvada para facilitar a visualização */
            const isCurved = sucessorItem.sucessor.some(id => id === item.id);

            return <Line
                lineType={item.itemType === ItemType.COMMENT ? 'dotted' : 'normal'}
                left1={(item.left || 0) + ((item.width || 0) / 2)}
                top1={(item.top || 0) + (item.height || 0) / 2}
                key={item.id + "_" + sucessorItem.id}
                onSucessorChange={onSucessorChange}
                sucessorIndex={index}
                isCurved={isCurved}
                color={"gray"}
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
                color={"gray"}
                left2={item.left + (item.width / 2)}
                top2={item.top + (item.height + 20)}
                onSucessorChange={onSucessorChange}
                key={item.id}
                id={item.id}
            />
        }

    </>
};
