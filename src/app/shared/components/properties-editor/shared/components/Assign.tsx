import React from 'react';

import { ExpressionInput } from './ExpressionInput';
import { IProperties } from '../interfaces';

interface IAssign extends IProperties {
    onChangeValue(text: string): void;
    onChangeName(text: string): void;
    onKeyDown(e: any): void;
    onBlur(e: any): void;
}
export const Assign: React.FC<IAssign> = ({ id, name, value, useOnChange = false, suggestions, valueHasWarning, nameSuggestions, openEditor, focusOnRender, nameHasWarning = false, nameHasError = false, valueHasError = false, onChangeName, onChangeValue, onKeyDown, onBlur, editNameDisabled = false, editValueDisabled = false }) => {

    const css_prop_item_input_name: React.CSSProperties = {
        border: nameHasError ? 'var(--input-border-error)' : nameHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
        textDecoration: nameHasError ? `var(--text-underline-error)` : nameHasWarning ? `var(--text-underline-warning)` : undefined,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    }
    const css_prop_item_input_value: React.CSSProperties = {
        textDecoration: valueHasError ? `var(--text-underline-error)` : valueHasError ? `var(--text-underline-warning)` : undefined,
        border: valueHasError ? 'var(--input-border-error)' : valueHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
        ...((!valueHasError && (!valueHasWarning || nameHasWarning)) ? { borderTop: 0 } : {}),
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        paddingLeft: 30,
    }

    return (
        <div className="flex-column padding-s padding-bottom-none">
            <ExpressionInput
                value={name}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                openEditor={openEditor}
                placeholder={'Propertie'}
                id={'name_prop_id_' + id}
                autoFocus={focusOnRender}
                disabled={editNameDisabled}
                key={'name_prop_key_' + id}
                suggestions={nameSuggestions}
                style={css_prop_item_input_name}
                onSelectSuggest={option => onChangeName(option.value)}
                onChange={e => { onChangeName(e.target.value); useOnChange && onBlur(e) }}
            />
            <div style={{ alignItems: 'center' }}>
                <span children='=' onClick={openEditor} style={{ marginRight: -20, marginLeft: 11, zIndex: 1 }} />
                <ExpressionInput
                    value={value}
                    onBlur={onBlur}
                    placeholder={'Value'}
                    onKeyDown={onKeyDown}
                    openEditor={openEditor}
                    suggestions={suggestions}
                    id={'value_prop_id_' + id}
                    key={'value_prop_key_' + id}
                    disabled={editValueDisabled}
                    style={css_prop_item_input_value}
                    onSelectSuggest={option => onChangeValue(option.value)}
                    onChange={e => {onChangeValue(e.target.value); useOnChange && onBlur(e)}}
                />
            </div>
        </div>
    );

}
