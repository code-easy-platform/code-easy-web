import React, { useState, useEffect } from 'react';

import { IProperties, TypeValues } from '../interfaces';
import { CustomInputFile } from './CustomInputFile';
import { ExpressionInput } from './ExpressionInput';
import { DefaultSwitch } from './DefaultSwitch';
import { Resizer } from './Resizer';
import { Assign } from './Assign';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    padding: 6,
    paddingBottom: 0,
}
interface PropItemProps extends IProperties {
    onChangeInputWidth(width: number): void;
    onChange(data: IProperties): void;
    inputWidth: number;
    paiRef: any;
}
export const PropItem: React.FC<PropItemProps> = ({ id, name, type, value, inputWidth, onChange, paiRef, nameHasError = false, valueHasError = false, onChangeInputWidth, editValueDisabled = false, editNameDisabled = false }) => { // Extende outra interface

    const [state, setState] = useState<IProperties>({ id, name, type, value, valueHasError, nameHasError, editNameDisabled, editValueDisabled });
    useEffect(() => {
        setState({ id, name, type, value, valueHasError, nameHasError, editNameDisabled, editValueDisabled })
    }, [id, name, type, value, valueHasError, nameHasError, editNameDisabled, editValueDisabled]);

    //const [inputWidth, setInputWidth] = useState(0);
    const changeInputWidth = (width: number) => {
        // setInputWidth(width);
        onChangeInputWidth(width);
    }

    const css_prop_item_label: React.CSSProperties = {
        textDecoration: nameHasError ? `var(--text-underline-error)` : undefined,
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
        flex: '1',
    }

    const minWidth = 80;
    const css_prop_item_input: React.CSSProperties = {
        textDecoration: valueHasError ? `var(--text-underline-error)` : undefined,
        border: valueHasError ? 'var(--input-border-error)' : 'var(--input-border)',
        width: inputWidth ? `${inputWidth}px` : '70%',
        backgroundColor: 'var(--main-background-bars)',
        minWidth: minWidth,
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

    switch (state.type) {
        case TypeValues.viewOnly:
            return (
                <div ref={paiRef} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <label
                        style={{ ...css_prop_item_input, backgroundColor: 'transparent', border: 'none', textAlign: 'start' }}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        children={state.value}
                    />
                </div>
            );

        case TypeValues.string:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <input
                        onChange={e => setState({ ...state, value: e.target.value })}
                        disabled={state.editValueDisabled}
                        onKeyDown={(e) => onkeyPress(e)}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                        value={state.value}
                        autoComplete='off'
                    />
                </div>
            );

        case TypeValues.expression:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <ExpressionInput
                        style={{ ...css_prop_item_input, minWidth: minWidth - 33, width: inputWidth ? `${inputWidth + 8}px` : '70%' }}
                        onChange={e => setState({ ...state, value: e.target.value })}
                        onDoubleClick={e => alert('Abre o editor...')}
                        disabled={state.editValueDisabled}
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
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <textarea
                        style={{ ...css_prop_item_input, height: '50px', resize: 'vertical' }}
                        onChange={e => setState({ ...state, value: e.target.value })}
                        disabled={state.editValueDisabled}
                        onKeyDown={(e) => onkeyPress(e)}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                        autoComplete='off'
                    />
                </div>
            );

        case TypeValues.number:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <input
                        onChange={e => setState({ ...state, value: e.target.value })}
                        disabled={state.editValueDisabled}
                        onKeyDown={(e) => onkeyPress(e)}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                        value={state.value}
                        autoComplete='off'
                        type='number'
                    />
                </div>
            );


        case TypeValues.binary:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <Resizer paiRef={paiRef} left={inputWidth} onChange={newLeft => changeInputWidth(newLeft)} />
                    <CustomInputFile
                        onChange={e => setState({ ...state, value: e.target.value })}
                        disabled={state.editValueDisabled}
                        key={'prop_key_' + state.id}
                        style={css_prop_item_input}
                        id={'prop_id_' + state.id}
                    />
                </div>
            );

        case TypeValues.boolean:
            return (
                <div style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} style={css_prop_item_label}>{state.name}</label>
                    <DefaultSwitch
                        checked={state.value}
                        hasError={valueHasError}
                        id={'prop_id_' + state.id}
                        desabled={state.editValueDisabled}
                        onChange={value => setState({ ...state, value })}
                    />
                </div>
            );

        case TypeValues.assign:
            return (
                <Assign
                    id={state.id}
                    name={state.name}
                    type={state.type}
                    value={state.value}
                    nameHasError={nameHasError}
                    valueHasError={valueHasError}
                    onBlur={_ => onChange(state)}
                    key={'assign_key_' + state.id}
                    onKeyDown={(e) => onkeyPress(e)}
                    editNameDisabled={state.editNameDisabled}
                    editValueDisabled={state.editValueDisabled}
                    onChangeName={name => setState({ ...state, name })}
                    onChangeValue={value => setState({ ...state, value })}
                />
            );

        default:
            return <></>;
    }

}
