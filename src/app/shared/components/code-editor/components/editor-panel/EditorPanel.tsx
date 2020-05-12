import React from 'react';

/**
 * Base para os itens de fluxo.
 * 
 * Elemento svg normal
 * 
 */
export const EditorPanel = React.forwardRef((props: React.SVGProps<SVGSVGElement>, ref: any) => {
    return (
        <svg
            {...props}
            ref={ref}
            tabIndex={0}
            preserveAspectRatio="none"
            style={{
                outline: 'none',
                minWidth: '100%',
                minHeight: '100%',
                backgroundSize: '15px 15px',
                backgroundImage: 'radial-gradient(var(--main-background-highlighted) 5%, var(--color-transparent) 5%)',
            }}
        />
    );
});
