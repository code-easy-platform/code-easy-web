import React, { useState, useEffect } from 'react';

import { IProperties, TypeValues } from '../interfaces';
import { DefaultSwitch } from './DefaultSwitch';
import { CustomInputFile } from './CustomInputFile';
import { ExpressionInput } from './ExpressionInput';

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
export const PropItem: React.FC<PropItemProps> = ({ id, label, typeValue, value, onChange }) => {

    const [state, setState] = useState<IProperties>({ id, label, typeValue, value });
    useEffect(() => {
        setState({ id, label, typeValue, value })
    }, [id, label, typeValue, value ]);

    const css_prop_item_label: React.CSSProperties = {
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
        flex: '1',
    }

    const css_prop_item_input: React.CSSProperties = {
        padding: 10,
        border: '0.5px solid #ffffff15',
        backgroundColor: '#ffffff10',
        borderRadius: 4,
        paddingRight: 4,
        maxWidth: '70%',
        minWidth: '70%',
        paddingLeft: 4,
        color: 'white',
        width: '70%',
    }

    switch (state.typeValue) {
        case TypeValues.string:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <input
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    />
                </div>
            );

        case TypeValues.expression:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <ExpressionInput
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                        value={state.value}
                        onDoubleClick={e => alert('Abre o editor...')}
                    />
                </div>
            );

        case TypeValues.bigstring:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <textarea
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={{ ...css_prop_item_input, height: '50px' }}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    />
                </div>
            );

        case TypeValues.number:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <input
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                        value={state.value}
                        type='number'
                    />
                </div>
            );


        case TypeValues.binary:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <CustomInputFile
                        onChange={e => setState({ ...state, value: e.target.value })}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                    />
                </div>
            );

        case TypeValues.boolean:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <DefaultSwitch
                        id={'prop_id_' + state.id}
                        onChange={value => setState({ ...state, value })}
                        checked={state.value}
                    />
                </div>
            );

        default:
            return <></>;
    }
}
