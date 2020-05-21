import React, { useState, useEffect } from 'react';
import { Utils } from 'code-easy-components';

import { IItem, IProperties, TypeValues } from '../interfaces';
import { PropItem } from './PropItem';

interface ListItemProps extends IItem { onChange(data: IItem): void; inputWidth: number; onChangeInputWidth(width: number): void; }
export const ListItem: React.FC<ListItemProps> = ({ id, name, properties, isHeader, onChange, inputWidth, onChangeInputWidth }) => {

    const [state, setState] = useState<IItem>({ id, name, properties, isHeader });
    useEffect(() => {
        setState({ id, name, properties, isHeader });
    }, [id, name, properties, isHeader]);

    const css_list_item: React.CSSProperties = {
        backgroundColor: isHeader ? 'var(--main-background-bars)' : '',
    }

    const onChangeItemProp = (item: IProperties, propIndex: number) => {
        state.properties[propIndex] = item;
        state.name = state.properties[0].value;

        onChange(state);
    }

    const addProp = () => {

        state.properties.push({
            name: '',
            value: '',
            id: Utils.getUUID(),
            type: TypeValues.assign,
        });

        setState(state);
        onChange(state);
    }

    return (
        <>
            <div className="padding-m padding-left-s" style={css_list_item}>{state.name}</div>
            <hr className="hr" />
            {state.properties.map((prop, index) => (
                <PropItem
                    onChange={item => onChangeItemProp(item, index)}
                    onChangeInputWidth={onChangeInputWidth}
                    inputWidth={inputWidth}
                    key={`${index}`}
                    onclick={addProp}
                    {...prop}
                />
            ))}
        </>
    );
}
