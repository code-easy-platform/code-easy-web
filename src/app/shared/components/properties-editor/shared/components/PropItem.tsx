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
}
export const PropItem: React.FC<PropItemProps> = (props) => { // Extende outra interface

    const { inputWidth, onChange, onChangeInputWidth, valueHasError = false, nameHasError = false } = props;

    const [state, setState] = useState<IProperties>({
        editValueDisabled: props.editValueDisabled,
        editNameDisabled: props.editNameDisabled,
        valueHasError: props.valueHasError,
        nameHasError: props.nameHasError,
        value: props.value,
        type: props.type,
        name: props.name,
        id: props.id,
    });

    useEffect(() => {
        setState({
            editValueDisabled: props.editValueDisabled,
            editNameDisabled: props.editNameDisabled,
            valueHasError: props.valueHasError,
            nameHasError: props.nameHasError,
            value: props.value,
            type: props.type,
            name: props.name,
            id: props.id,
        });
    }, [props]);

    const css_prop_item_label: React.CSSProperties = {
        textDecoration: nameHasError ? `var(--text-underline-error)` : undefined,
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
    }

    const minWidth = 60;
    const css_prop_item_input: React.CSSProperties = {
        textDecoration: valueHasError ? `var(--text-underline-error)` : undefined,
        border: valueHasError ? 'var(--input-border-error)' : 'var(--input-border)',
    }

    const onkeyPress = (e: any) => {
        if (e.keyCode === 13) {
            onChange(state);
        }
    }

    switch (state.type) {
        case TypeValues.viewOnly:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <label
                            style={{
                                ...css_prop_item_input,
                                backgroundColor: 'transparent',
                                textOverflow: 'ellipsis',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                textAlign: 'start',
                                overflow: 'hidden',
                                border: 'none',
                            }}
                            key={'prop_key_' + state.id}
                            id={'prop_id_' + state.id}
                            children={state.value}
                        />
                    </div>
                </div>
            );

        case TypeValues.string:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            className="full-width background-bars"
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
                </div>
            );

        case TypeValues.expression:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <ExpressionInput
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            openEditor={e => alert('Abre o editor...')}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            value={state.value}
                        />
                    </div>
                </div>
            );

        case TypeValues.bigstring:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <textarea
                            className="full-width background-bars"
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
                </div>
            );

        case TypeValues.number:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            className="full-width background-bars"
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
                </div>
            );


        case TypeValues.binary:
            return (
                <div key={'prop_item_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <CustomInputFile
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                        />
                    </div>
                </div>
            );

        case TypeValues.boolean:
            return (
                <div key={'prop_key_' + state.id} style={css_prop_item}>
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>{state.name}</label>
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
