import React, { useRef, useEffect } from 'react';
import './Switch.css';

interface SwitchProps {
    checked: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
    id?: string | undefined;
    border?: string | undefined;
    disabled?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onChange(value: boolean): void;
    borderError?: string | undefined;
    borderWarning?: string | undefined;
    backgroundColor?: string | undefined;
    onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
}
export const Switch: React.FC<SwitchProps> = ({ id, checked = false, autoFocus, onChange, onBlur, hasError = false, disabled = false, border, borderError, backgroundColor, borderWarning, hasWarning }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current && autoFocus) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    return (
        <label className="switch">
            <input id={id} type="checkbox" ref={inputRef} style={{ opacity: 0 }} autoFocus={autoFocus} onBlur={onBlur} onChange={e => onChange(!checked)} disabled={disabled} checked={checked} />
            <span
                className="slider round"
                style={{ backgroundColor: backgroundColor, opacity: disabled ? 0.7 : undefined, border: (hasError ? borderError : (hasWarning ? borderWarning : border)) }}
            />
        </label>
    );
}
