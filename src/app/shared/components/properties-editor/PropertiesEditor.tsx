import React, { useState } from 'react';

import { IItem } from './shared/interfaces';
import { ListItem } from './shared/components/ListItem';

const css_base: React.CSSProperties = {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
};

interface PropertiesEditorProps {
    itens: IItem[],
    onChange?(itens: IItem[]): void,
}
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ itens, onChange = (_: any) => { } }) => {

    const [state, setState] = useState<{ itens: IItem[] }>({ itens });

    const onChangeListItem = (data: IItem, listItemIndex: number) => {

        state.itens[listItemIndex] = data;

        setState({ ...state })

        onChange(state.itens);

    }

    return (
        <div style={css_base}>
            {state.itens.map((item, index) => <ListItem {...item} onChange={data => onChangeListItem(data, index)} />)}
        </div>
    );
}
