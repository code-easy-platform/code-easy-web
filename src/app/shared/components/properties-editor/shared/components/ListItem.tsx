import React from 'react';

import { IItem } from '../interfaces';
import { PropItem } from './PropItem';

export const ListItem: React.FC<IItem> = ({ id, name, properties, isHeader }) => {

    const css_list_item: React.CSSProperties = {
        backgroundColor: isHeader ? '#ffffff10' : '',
        justifyContent: 'space-between',
        height: 'min-content',
        alignItems: 'center',
        padding: 12,
        paddingRight: 8,
        paddingLeft: 8,
    }

    return (
        <>
            <div style={css_list_item}>{name}</div>
            {properties.map(prop => <PropItem {...prop} />)}
        </>
    );
}
