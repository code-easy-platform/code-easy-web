import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { ItemType } from '../../models/ItemFluxo';


type EditorPanelProps = Omit<{
    allowedsInDrop?: string[];
    backgroundType?: 'dotted' | 'checkered' | 'custom';
    onDropItem?(item: any, monitor: DropTargetMonitor): void;
}, keyof React.SVGProps<SVGSVGElement>> & React.SVGProps<SVGSVGElement>;

/**
 * Base para os itens de fluxo.
 * È composto de um svg normal com o hook de drop do dnd.
 *
 * @param allowedsInDrop - **string[]** - Usado para adicionar mais itens suportados no drop
 * @param onDropItem - **Function** - Função executada quando um elemento for dropado no painel
 * @param backgroundType - **'dotted'** | **'checkered'** | **'custom'** - Parâmetro que controla o estilo do background do painel
 */
export const EditorPanel = React.forwardRef(({ allowedsInDrop, onDropItem, backgroundType = 'dotted', ...props }: EditorPanelProps, ref: any) => {

    /*
        const [scale, setScale] = React.useState(0);
        const wheel = (e: React.WheelEvent<SVGSVGElement>) => {
            e.preventDefault();

            if (e.altKey) {
                if (e.deltaY > 0) {
                    console.log('Subindo');
                    setScale(scale - 2);
                } else {
                    console.log('Descendo');
                    setScale(scale + 2);
                }
            }

        }
    */

    // Este bloco serve para configurar o estilo do background do painel
    let background;
    if (backgroundType === 'dotted') {
        background = 'radial-gradient(var(--main-background-highlighted) 5%, var(--color-transparent) 5%)';
    } else if (backgroundType === 'checkered') {
        background = 'linear-gradient(0deg, var(--main-background-highlighted) 1px, transparent 0px), linear-gradient(90deg, var(--main-background-highlighted) 1px, transparent 0px)'
    } else {
        background = props.style?.backgroundImage;
    }

    /** Define quais itens são aceitos no drop do start. */
    const acceptedInDrop: ItemType[] = [ItemType.START, ItemType.ACTION, ItemType.IF, ItemType.FOREACH, ItemType.SWITCH, ItemType.ASSIGN, ItemType.END, ItemType.COMMENT];

    /** Usado para que seja possível o drop de itens no editor. */
    const [, dropRef] = useDrop({
        accept: [...acceptedInDrop, ...allowedsInDrop || []], // Especifica quem pode ser dropado na editor
        drop: onDropItem,
    });
    /** Agrupa as referências do drop com as da ref. */
    dropRef(ref);

    return (
        <svg
            {...props}
            ref={ref}
            tabIndex={0}
            //onWheel={wheel}
            preserveAspectRatio="none"
            style={{
                outline: 'none',
                minWidth: '100%',
                minHeight: '100%',
                backgroundSize: '15px 15px',
                backgroundImage: background,
                // transform: scale === 0 ? undefined : `scale(${scale / 100},${scale / 100})`,
            }}
        />
    );
});
