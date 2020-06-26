import React from 'react';

/** Input usada para axiliar a cópia e a colagem de items no fluxo */
export const InputCopy = React.forwardRef((props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ref: any) => (
    <input ref={ref} style={{ height: '1px', width: '1px', top: '-1000px', position: "fixed" }} />
));
