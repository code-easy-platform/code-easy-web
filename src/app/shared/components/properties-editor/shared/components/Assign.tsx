import React from 'react';
import { ExpressionInput } from './ExpressionInput';
import { IProperties } from '../interfaces';

interface IAssign extends IProperties {
    onChangeValue(text: string): void;
    onChangeName(text: string): void;
    onKeyDown(e: any): void;
    onBlur(e: any): void;
}
export const Assign: React.FC<IAssign> = ({ id, name, value, type, nameHasError = false, valueHasError = false, onChangeName, onChangeValue, onKeyDown, onBlur, editNameDisabled = false, editValueDisabled = false }) => {

    const css_prop_item_input: React.CSSProperties = {
        border: `0.5px solid ${valueHasError ? 'red' : '#ffffff15'}`,
        backgroundColor: '#ffffff10',
        borderRadius: 4,
        color: 'white',
        width: '100%',
        padding: 8,
        paddingRight: 4,
        paddingLeft: 4,
    }

    const css_prop_item_wrapper: React.CSSProperties = {
        flexDirection: 'column',
        padding: 6
    }

    return (<div style={css_prop_item_wrapper}>
        <ExpressionInput
            value={name}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder='Propertie'
            id={'name_prop_id_' + id}
            disabled={editNameDisabled}
            key={'name_prop_key_' + id}
            style={{ ...css_prop_item_input, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: nameHasError ? 'red' : '#ffffff15' }}
            onChange={e => onChangeName(e.target.value)}
            onDoubleClick={e => alert('Abre o editor...')}
        />
        <div style={{ alignItems: 'center' }}>
            <span children='=' style={{ marginRight: -20, marginLeft: 10.5 }} />
            <ExpressionInput
                value={value}
                onBlur={onBlur}
                placeholder={'Value'}
                onKeyDown={onKeyDown}
                id={'value_prop_id_' + id}
                key={'value_prop_key_' + id}
                disabled={editValueDisabled}
                onChange={e => onChangeValue(e.target.value)}
                onDoubleClick={e => alert('Abre o editor...')}
                style={{ ...css_prop_item_input, borderTopLeftRadius: 0, borderTopRightRadius: 0, paddingLeft: 30 }}
            />
        </div>
    </div >);

}
