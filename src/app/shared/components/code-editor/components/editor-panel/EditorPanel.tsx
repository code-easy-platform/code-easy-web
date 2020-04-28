import React from 'react';

/**
 * Base para os itens de fluxo.
 * 
 * Elemento svg normal
 * 
 * @param backgroundType - 'dotted' | 'checkered' | 'custom' Usado para definir o tipo de background.
 */
export const EditorPanel = React.forwardRef((props: any, ref: any) => {

    let background;
    if (props.backgroundType === 'dotted') {
        background = 'radial-gradient(var(--main-background-highlighted) 5%, var(--color-transparent) 5%)';
    } else if (props.backgroundType === 'checkered') {
        background = 'linear-gradient(0deg, var(--main-background-highlighted) 1px, transparent 0px), linear-gradient(90deg, var(--main-background-highlighted) 1px, transparent 0px)'
    } else {
        background = props.style?.backgroundImage;
    }

    return (
        <svg
            {...props}
            ref={ref}
            preserveaspectratio="none"
            tabIndex={0}
            style={{
                outline: 'none',
                minWidth: '100%',
                minHeight: '100%',
                backgroundSize: '15px 15px',
                backgroundImage: background,
            }}
        />
    );
});
