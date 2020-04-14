import React, { useState, useEffect } from 'react';

import { IProperties, TypeValues } from '../interfaces';
import { DefaultSwitch } from './DefaultSwitch';
import { CustomInputFile } from './CustomInputFile';
import { ExpressionInput } from './ExpressionInput';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    padding: 6,
    paddingBottom: 0,
}
interface PropItemProps extends IProperties {
    onChange(data: IProperties): void;
    inputWidth: number;
}
export const PropItem: React.FC<PropItemProps> = ({ id, label, typeValue, value, onChange, inputWidth }) => { // Extende outra interface

    inputWidth = inputWidth - 4;

    const [state, setState] = useState<IProperties>({ id, label, typeValue, value });
    useEffect(() => {
        setState({ id, label, typeValue, value })
    }, [id, label, typeValue, value]);

    const css_prop_item_label: React.CSSProperties = {
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
        flex: '1',
    }

    const css_prop_item_input: React.CSSProperties = {
        width: inputWidth ? `${inputWidth}px` : '70%',
        border: '0.5px solid #ffffff15',
        backgroundColor: '#ffffff10',
        borderRadius: 4,
        color: 'white',
        padding: 8,
        paddingRight: 4,
        paddingLeft: 4,
    }

    const onkeyPress = (e: any) => {
        if (e.keyCode === 13) {
            onChange(state);
        }
    }

    switch (state.typeValue) {
        case TypeValues.string:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <input
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onKeyDown={(e) => onkeyPress(e)}
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
                        style={{ ...css_prop_item_input, width: inputWidth ? `${inputWidth + 8}px` : '70%' }}
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onDoubleClick={e => alert('Abre o editor...')}
                        onKeyDown={(e) => onkeyPress(e)}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    />
                </div>
            );

        case TypeValues.bigstring:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.label}</label>
                    <textarea
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onKeyDown={(e) => onkeyPress(e)}
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
                        onKeyDown={(e) => onkeyPress(e)}
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
