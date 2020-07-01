import React from 'react';
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
}
export const Switch: React.FC<SwitchProps> = ({ id, checked = false, autoFocus, onChange, hasError = false, disabled = false, border, borderError, backgroundColor, borderWarning, hasWarning }) => {
    return (
        <label className="switch">
            <input id={id} type="checkbox" style={{ opacity: 0 }} autoFocus={autoFocus} onChange={e => onChange(!checked)} disabled={disabled} checked={checked} />
            <span
                className="slider round"
                style={{ backgroundColor: backgroundColor, border: (hasError ? borderError : (hasWarning ? borderWarning : border)) }}
            />
        </label>
    );
}
