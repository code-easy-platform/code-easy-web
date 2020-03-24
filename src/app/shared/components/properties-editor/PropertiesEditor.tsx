import React from 'react';

import { IItem } from './shared/interfaces';
import { ListItem } from './shared/components/ListItem';

const css_base: React.CSSProperties = {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
};

export const PropertiesEditor: React.FC<{ itens: IItem[] }> = ({ itens }) => {
    return (
        <div style={css_base}>
            {itens.map(item => {
                return <ListItem {...item} />;
            })}
        </div>
    );
}
