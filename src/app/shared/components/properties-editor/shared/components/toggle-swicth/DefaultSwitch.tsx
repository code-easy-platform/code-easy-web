import React from 'react';

import './DefaultSwitch.css';

export const DefaultSwitch = ({ id, checked = false, onChange, hasError = false, disabled = false }: { id?: any, checked: boolean, onChange(value: boolean): void, hasError: boolean, disabled: boolean | undefined }) => {
    return (
        <label className="switch">
            <input id={id} type="checkbox" onChange={e => onChange(!checked)} disabled={disabled} checked={checked} />
            <span
                className="slider round"
                style={{
                    backgroundColor: 'var(--main-background-bars)',
                    border: hasError ? 'var(--input-border-error)' : 'var(--input-border)',
                }}
            />
        </label>
    );
}
