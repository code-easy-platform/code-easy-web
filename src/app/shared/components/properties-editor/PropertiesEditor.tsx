import React, { useState } from 'react';

import { IItem } from './shared/interfaces';
import { ListItem } from './shared/components/ListItem';

const css_base: React.CSSProperties = {
    flexDirection: 'column',
    marginBottom: '100px',
    overflow: 'auto',
    flex: '1',
};

interface PropertiesEditorProps {
    itens: IItem[],
    onChange?(itens: IItem[]): void,
}
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ itens, onChange = (_: any) => { } }) => {

    const [state, setState] = useState<{ itens: IItem[] }>({ itens });
    state.itens = itens;

    const onChangeListItem = (data: IItem, listItemIndex: number) => {

        state.itens[listItemIndex] = data;

        setState({ ...state });

        onChange(state.itens);

    }

    return (
        <div style={css_base}>
            {state.itens.map((item, index) => {
                return (<>
                    <ListItem {...item} onChange={data => onChangeListItem(data, index)} />
                    <div style={{ minHeight: '30px' }} />
                </>);
            })}
        </div>
    );
}
