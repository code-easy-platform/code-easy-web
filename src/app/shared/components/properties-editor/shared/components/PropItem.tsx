import React, { useState } from 'react';

import { IProperties } from '../interfaces';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 0,
}
interface PropItemProps extends IProperties {
    onChange(data: IProperties): void;
}
export const PropItem: React.FC<PropItemProps> = ({ id, label, typeValue, value, onChange  }) => {

    const [state, setState] = useState<IProperties>({ id, label, typeValue, value});

    const css_prop_item_label: React.CSSProperties = {
        wordBreak: 'break-all',
        textAlign: 'start',
        width: '20%',
    }
    const css_prop_item_input: React.CSSProperties = {
        padding: 10,
        backgroundColor: '#ffffff10',
        border: '0.5px solid #ffffff15',
        borderRadius: 4,
        paddingRight: 4,
        paddingLeft: 4,
        color: 'white',
        width: '70%',
    }

    return (
        <div style={css_prop_item}>
            <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
            <input
                onChange={e => setState({ ...state, value: e.target.value })}
                onBlur={_ => onChange(state)}
                value={state.value} id={'prop_id_' + state.id}
                key={'prop_key_' + state.id}
                style={css_prop_item_input}
            />
        </div>
    );
}
