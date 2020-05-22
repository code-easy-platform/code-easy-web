import React from 'react';

import { ExpressionInput } from './ExpressionInput';
import { IProperties } from '../interfaces';

interface IAssign extends IProperties {
    onChangeValue(text: string): void;
    onChangeName(text: string): void;
    onKeyDown(e: any): void;
    onBlur(e: any): void;
}
export const Assign: React.FC<IAssign> = ({ id, name, value, suggestions, nameSuggestions, openEditor, nameHasError = false, valueHasError = false, onChangeName, onChangeValue, onKeyDown, onBlur, editNameDisabled = false, editValueDisabled = false }) => {

    const css_prop_item_input_name: React.CSSProperties = {
        border: nameHasError ? 'var(--input-border-error)' : 'var(--input-border)',
        textDecoration: nameHasError ? `var(--text-underline-error)` : undefined,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    }
    const css_prop_item_input_value: React.CSSProperties = {
        border: valueHasError ? 'var(--input-border-error)' : 'var(--input-border)',
        textDecoration: valueHasError ? `var(--text-underline-error)` : undefined,
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
                suggestions={nameSuggestions}
                disabled={editNameDisabled}
                key={'name_prop_key_' + id}
                style={css_prop_item_input_name}
                onChange={e => onChangeName(e.target.value)}
                onSelectSuggest={option => onChangeName(option.value)}
            />
            <div style={{ alignItems: 'center' }}>
                <span children='=' style={{ marginRight: -20, marginLeft: 10.5, zIndex: 1 }} />
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
                    onChange={e => onChangeValue(e.target.value)}
                    onSelectSuggest={option => onChangeValue(option.value)}
                />
            </div>
        </div>
    );

}
