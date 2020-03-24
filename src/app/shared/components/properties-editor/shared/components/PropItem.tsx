import React from 'react';

import { IProperties } from '../interfaces';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    padding: 8,
}

export const PropItem: React.FC<IProperties> = ({ id, label, value }) => {

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
            <label htmlFor={'prop_id_' + id} style={css_prop_item_label}>{label}</label>
            <input value={value} id={'prop_id_' + id} key={'prop_key_' + id} style={css_prop_item_input} />
        </div>
    );
}
