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

    const onChangeItemProp = (item: IProperties) => {

        // O item pelo id para poder editá-lo
        const propIndex = state.properties.findIndex(prop => prop.id === item.id);
        if (propIndex === -1) return;

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

    let grups: string[] = [];
    state.properties.forEach(prop => {
        if (prop.group && (!grups.some(grup => grup === prop.group))) {
            grups.push(prop.group);
        }
    });

    return (
        <>
            <div className="padding-m padding-left-s" style={{ backgroundColor: isHeader ? 'var(--main-background-bars)' : 'unset' }}>{state.name}</div>
            <div className="flex-column overflow-auto full-height list-items">
                {state.properties.filter(prop => prop.group === undefined).map((prop, index) => (
                    <PropItem
                        onChange={item => onChangeItemProp(item)}
                        onChangeInputWidth={onChangeInputWidth}
                        inputWidth={inputWidth}
                        onclick={addProp}
                        key={`${index}`}
                        {...prop}
                    />
                ))}
                {grups.map(group => {
                    return <div key={group} className="flex-column">
                        <hr className="hr hr-white margin-top-m " />
                        <div className="padding-m padding-left-s"><b>{group}</b></div>
                        <div className="flex-column">
                            {state.properties.filter(prop => prop.group === group).map((prop, index) => (
                                <PropItem
                                    onChange={item => onChangeItemProp(item)}
                                    onChangeInputWidth={onChangeInputWidth}
                                    inputWidth={inputWidth}
                                    onclick={addProp}
                                    key={`${index}`}
                                    {...prop}
                                />
                            ))}
                        </div>
                    </div>
                })}
                <div style={{ minHeight: '60px' }} />
            </div>
        </>
    );
}
