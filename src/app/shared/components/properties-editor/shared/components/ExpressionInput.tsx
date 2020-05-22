import React, { useRef, useState } from 'react';
import { SearchAutocomplete } from './SearchAutocomplete';
import { ISuggestion } from '../interfaces';

interface ExpressionInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    openEditor?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    onSelectSuggest(option: ISuggestion): void;
    suggestions?: ISuggestion[];
}
export const ExpressionInput: React.FC<ExpressionInputProps> = ({ openEditor, suggestions, onSelectSuggest, ...props }) => {

    const [showAutoComplete, setAutoComplete] = useState(false);
    const ref = useRef<any>(props.ref || null);

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

    const dismissAutoComplete = () => {
        window.onmouseup = null;
        setAutoComplete(false);
    }

    const mouseDown = () => {
        window.onmouseup = dismissAutoComplete;
        setAutoComplete(true);
    }

    return (
        <div className="flex1" style={{ alignItems: 'center', justifyContent: 'flex-end', position: "relative" }}>
            <input {...props} ref={ref} onKeyDown={mouseDown} onDoubleClick={mouseDown} autoComplete='off' style={{ ...props.style, width: '100%' }} />
            <SearchAutocomplete
                show={showAutoComplete}
                options={suggestions}
                onSelect={opt => {
                    dismissAutoComplete();
                    onSelectSuggest(opt);
                }}
            />
            <input type="button" className="full-height background-bars" style={css_picker_editor} disabled={props.disabled} onClick={openEditor} />
        </div>
    );
}
