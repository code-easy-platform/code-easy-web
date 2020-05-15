import React from 'react';

interface ExpressionInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    openEditor?(e: any): void;
}
export const ExpressionInput: React.FC<ExpressionInputProps> = ({ openEditor, ...props }) => {

    const css_picker_editor: React.CSSProperties = {
        border: 'var(--input-border)',
        cursor: 'pointer',
        borderRadius: 50,
        color: 'white',
        marginLeft: 4,
        height: 20,
        paddingRight: 4,
        paddingLeft: 4,
    }

    return (
        <div className="flex1" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <input {...props} autoComplete='off' style={{ ...props.style, width: '100%' }} />
            <button className="full-height background-bars" style={css_picker_editor} disabled={props.disabled} onClick={openEditor} />
        </div>
    );
}
