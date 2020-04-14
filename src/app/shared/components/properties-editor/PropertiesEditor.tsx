import React, { useState, useEffect, useRef } from 'react';

import { IItem } from './shared/interfaces';
import { ListItem } from './shared/components/ListItem';
import { Resizer } from './shared/components/Resizer';

const css_base: React.CSSProperties = {
    flexDirection: 'column',
    overflow: 'auto',
    flex: '1',
};

interface PropertiesEditorProps {
    itens: IItem[],
    onChange?(itens: IItem[]): void,
}
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ itens, onChange = (_: any) => { } }) => {

    const [state, setState] = useState<{ itens: IItem[], hrLeft: number }>({ itens, hrLeft: 100 });
    const hrLeft = state.hrLeft;
    useEffect(() => {
        setState({ hrLeft, itens });
    }, [hrLeft, itens]);

    const ref = useRef(null);

    const onChangeListItem = (data: IItem, listItemIndex: number) => {

        state.itens[listItemIndex] = data;

        setState({ ...state });

        onChange(state.itens || itens);

    }

    return (
        <div ref={ref} style={css_base}>
            {state.itens.map((item, index) => {
                return (<>
                    <Resizer paiRef={ref} left={state.hrLeft} onChange={newLeft => setState({ ...state, hrLeft: newLeft })} />
                    <ListItem inputWidth={state.hrLeft} {...item} onChange={data => onChangeListItem(data, index)} />
                    <div style={{ minHeight: '30px' }} />
                </>);
            })}
        </div>
    );
}
