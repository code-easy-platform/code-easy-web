import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { IconMoreInfo } from 'code-easy-components';

import { IProperties, TypeValues } from '../interfaces';
import { ExpressionInput } from './ExpressionInput';
import { InputFile } from './input-file/InputFile';
import { Switch } from './toggle-swicth/Switch';
import { Tooltip } from './tooltip/Tooltip';
import { Resizer } from './Resizer';
import { Assign } from './Assign';


const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    position: 'relative',
}
interface PropItemProps extends IProperties {
    onChangeInputWidth(width: number): void;
    onChange?(data: IProperties): void;
    inputWidth: number;
}
export const PropItem: React.FC<PropItemProps> = memo((props) => { // Extende outra interface

    const { inputWidth, onChange = () => { }, onChangeInputWidth, valueHasError = false, nameHasError = false, nameHasWarning = false, valueHasWarning = false } = props;
    const containerWidth = useRef<any>(null);
    const infoIconRef = useRef<any>(null);

    const [container, setContainer] = useState<{ width: number }>({ width: 200 });
    useEffect(() => {
        if (containerWidth.current) {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        }
    }, []);

    if (containerWidth.current) {
        containerWidth.current.addEventListener('resizer', () => {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        });
    }

    const [state, setState] = useState<IProperties>({
        editValueDisabled: props.editValueDisabled,
        editNameDisabled: props.editNameDisabled,
        nameSuggestions: props.nameSuggestions,
        valueHasWarning: props.valueHasWarning,
        nameHasWarning: props.nameHasWarning,
        propertieType: props.propertieType,
        valueHasError: props.valueHasError,
        focusOnRender: props.focusOnRender,
        nameHasError: props.nameHasError,
        information: props.information,
        suggestions: props.suggestions,
        useOnChange: props.useOnChange,
        fileMaxSize: props.fileMaxSize,
        openEditor: props.openEditor,
        group: props.group,
        value: props.value,
        type: props.type,
        name: props.name,
        id: props.id,
    });

    useEffect(() => {
        setState({
            editValueDisabled: props.editValueDisabled,
            editNameDisabled: props.editNameDisabled,
            nameSuggestions: props.nameSuggestions,
            valueHasWarning: props.valueHasWarning,
            nameHasWarning: props.nameHasWarning,
            propertieType: props.propertieType,
            focusOnRender: props.focusOnRender,
            valueHasError: props.valueHasError,
            nameHasError: props.nameHasError,
            information: props.information,
            useOnChange: props.useOnChange,
            suggestions: props.suggestions,
            fileMaxSize: props.fileMaxSize,
            openEditor: props.openEditor,
            group: props.group,
            value: props.value,
            type: props.type,
            name: props.name,
            id: props.id,
        });
    }, [props]);

    const css_prop_item_label: React.CSSProperties = {
        textDecoration: nameHasError ? `var(--text-underline-error)` : nameHasWarning ? `var(--text-underline-warning)` : undefined,
        width: (container.width - inputWidth),
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontSize: 'smaller',
        textAlign: 'start',
        overflow: 'hidden',
    }

    const minWidth = 60;
    const css_prop_item_input: React.CSSProperties = {
        textDecoration: valueHasError ? `var(--text-underline-error)` : valueHasWarning ? `var(--text-underline-warning)` : undefined,
        border: valueHasError ? 'var(--input-border-error)' : valueHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
    }

    const onkeyPress = useCallback((e: any) => {
        if (e.keyCode === 13 || state.useOnChange) {
            onChange(state);
        }
    }, [onChange, state]);

    switch (state.type) {

        case TypeValues.viewOnly:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
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
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            onChange={e => setState({ ...state, value: e.target.value })}
                            className={"full-width background-bars"}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            autoFocus={state.focusOnRender}
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
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <ExpressionInput
                            onChange={e => { setState({ ...state, value: e.target.value }); state.useOnChange && onChange(state) }}
                            onSelectSuggest={option => setState({ ...state, value: option.value })}
                            className="full-width background-bars"
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            autoFocus={state.focusOnRender}
                            suggestions={state.suggestions}
                            openEditor={state.openEditor}
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
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <textarea
                            style={{ ...css_prop_item_input, height: '50px', resize: 'vertical' }}
                            onChange={e => setState({ ...state, value: e.target.value })}
                            className={"full-width background-bars"}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            autoFocus={state.focusOnRender}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            id={'prop_id_' + state.id}
                            value={state.value}
                            autoComplete='off'
                        />
                    </div>
                </div>
            );

        case TypeValues.fullBigString:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <textarea
                        style={{ ...css_prop_item_input, height: '100px', resize: 'vertical' }}
                        onChange={e => setState({ ...state, value: e.target.value })}
                        className={"full-width background-bars"}
                        disabled={state.editValueDisabled}
                        onKeyDown={(e) => onkeyPress(e)}
                        autoFocus={state.focusOnRender}
                        onBlur={_ => onChange(state)}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        placeholder={state.name}
                        autoComplete={'off'}
                        value={state.value}
                    />
                </div>
            );

        case TypeValues.number:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            autoFocus={state.focusOnRender}
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
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <InputFile
                            className="full-width background-bars border-radius outline-none"
                            disabled={state.editValueDisabled}
                            autoFocus={state.focusOnRender}
                            fileMaxSize={state.fileMaxSize}
                            key={'prop_key_' + state.id}
                            fileName={state.value?.name}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            tabIndex={0}
                            onChange={(e) => {

                                if (e.target.files && e.target.files[0]) {
                                    var fileReader = new FileReader();

                                    let file: any = {
                                        content: undefined,
                                        name: e.target.files ? e.target.files.item(0)?.name : undefined,
                                        size: e.target.files ? e.target.files.item(0)?.size : undefined,
                                        type: e.target.files ? e.target.files.item(0)?.type : undefined,
                                        lastModified: e.target.files ? e.target.files.item(0)?.lastModified : undefined,
                                    }

                                    fileReader.addEventListener("load", (event) => {
                                        if (event.target) {
                                            file.content = `${event.target.result}`;
                                            state.value = file;
                                            setState(state);
                                            onChange(state);
                                        }
                                    });

                                    fileReader.readAsDataURL(e.target.files[0]);

                                }
                            }}
                        />
                    </div>
                </div>
            );

        case TypeValues.boolean:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Switch
                        checked={state.value}
                        hasError={valueHasError}
                        id={'prop_id_' + state.id}
                        hasWarning={valueHasWarning}
                        border={'var(--input-border)'}
                        autoFocus={state.focusOnRender}
                        disabled={state.editValueDisabled}
                        borderError={'var(--input-border-error)'}
                        borderWarning={'var(--input-border-warning)'}
                        backgroundColor={'var(--main-background-bars)'}
                        onChange={value => {
                            state.value = value;
                            setState({ ...state, value: value });
                            onChange(state);
                        }}
                    />
                </div>
            );

        case TypeValues.assign:
            return (
                <Assign
                    id={state.id}
                    name={state.name}
                    type={state.type}
                    group={state.group}
                    value={state.value}
                    nameHasError={nameHasError}
                    openEditor={state.openEditor}
                    valueHasError={valueHasError}
                    onBlur={_ => onChange(state)}
                    key={'assign_key_' + state.id}
                    fileMaxSize={state.fileMaxSize}
                    information={state.information}
                    useOnChange={state.useOnChange}
                    suggestions={state.suggestions}
                    onKeyDown={(e) => onkeyPress(e)}
                    propertieType={state.propertieType}
                    focusOnRender={state.focusOnRender}
                    nameHasWarning={state.nameHasWarning}
                    valueHasWarning={state.valueHasWarning}
                    nameSuggestions={state.nameSuggestions}
                    editNameDisabled={state.editNameDisabled}
                    editValueDisabled={state.editValueDisabled}
                    onChangeName={name => { setState({ ...state, name }); state.useOnChange && onChange(state); }}
                    onChangeValue={value => { setState({ ...state, value }); state.useOnChange && onChange(state); }}
                />
            );

        case TypeValues.selection:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <select
                        style={{ ...css_prop_item_input, width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}
                        onChange={e => {
                            setState({ ...state, value: e.target.value });
                            onChange({ ...state, value: e.target.value });
                        }}
                        disabled={state.editValueDisabled}
                        autoFocus={state.focusOnRender}
                        className={"background-bars"}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    >
                        <option value={"undefined"}>Selecione</option>
                        {state.suggestions?.map((item, index) => {
                            return (
                                <option
                                    disabled={item.disabled}
                                    children={item.label}
                                    value={item.value}
                                    key={index}
                                />
                            );
                        })}
                    </select>
                </div>
            );

        case TypeValues.yesNoSelection:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label
                        htmlFor={'prop_id_' + state.id}
                        className="flex1 "
                        style={css_prop_item_label}

                    >
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Tooltip elementRef={infoIconRef} description={state.information} />
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <select
                        style={{ ...css_prop_item_input, width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}
                        onChange={e => {
                            setState({ ...state, value: e.target.value });
                            onChange({ ...state, value: e.target.value });
                        }}
                        disabled={state.editValueDisabled}
                        autoFocus={state.focusOnRender}
                        className={"background-bars"}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </select>
                </div >
            );

        default:
            return <></>;

    }

});
