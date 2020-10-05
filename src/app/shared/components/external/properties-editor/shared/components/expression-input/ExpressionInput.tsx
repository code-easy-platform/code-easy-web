import React, { useState, useRef, useEffect } from 'react';
import { IconCollapsedFolder } from 'code-easy-components';

import { SearchAutocomplete } from '../auto-complete/SearchAutocomplete';
import { ISuggestion } from '../../interfaces';
import './ExpressionInput.css';

interface ExpressionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onPickerClick?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    onSelectSuggest(option: ISuggestion): void;
    suggestions?: ISuggestion[];
}
export const ExpressionInput: React.FC<ExpressionInputProps> = ({ onPickerClick, suggestions, onSelectSuggest, ...props }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current && props.autoFocus) {
            inputRef.current.focus();
        }
    }, [props]);

    const [showAutoComplete, setAutoComplete] = useState(false);

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

    const dismissSuggestion = () => {
        window.onmouseup = null;
        setAutoComplete(false);
    }

    const openSuggestions = () => {
        window.onmouseup = dismissSuggestion;
        setAutoComplete(true);
    }

    return (
        <div className="flex1" style={{ alignItems: 'center', justifyContent: 'flex-end', position: "relative" }}>
            <input
                {...props}
                ref={inputRef}
                autoComplete='off'
                style={{ ...props.style, width: '100%' }}
                className={`${(suggestions || []).length > 0 && "padding-right-g"}`}
            />
            {(!props.disabled && (suggestions || []).length > 0) && (
                <img
                    alt={"open-suggestions"}
                    onClick={openSuggestions}
                    src={IconCollapsedFolder}
                    className={`btn background-transparent border-radius open-suggestions`}
                    style={{ paddingLeft: 6, paddingRight: 6, paddingBottom: 0, paddingTop: 0, minHeight: 32, zIndex: 1, outline: 'none' }}
                    onKeyDown={e => {
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            openSuggestions();
                        }
                    }}
                />
            )}
            <SearchAutocomplete
                options={suggestions}
                show={showAutoComplete}
                onSelect={opt => {
                    dismissSuggestion();
                    !props.disabled && onSelectSuggest(opt);
                }}
            />
            {!props.disabled && <input type="button" tabIndex={-1} className="full-height background-bars" style={css_picker_editor} onClick={!props.disabled && onPickerClick} />}
        </div>
    );
}
