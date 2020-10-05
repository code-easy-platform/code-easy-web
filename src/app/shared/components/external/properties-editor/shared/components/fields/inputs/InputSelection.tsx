import React, { useState, useCallback, useEffect, useRef } from 'react';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputSelectionProps extends IProperty<string> {
    onChange?(data: IProperty<string>): void;
}
export const InputSelection: React.FC<InputSelectionProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const inputRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        if (inputRef.current && props.focusOnRender) {
            inputRef.current.focus();
        }
    }, [props]);
    
    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange({ ...props, value: e.currentTarget.value });
            setValue(e.currentTarget.value);
        }
    }, [onChange, props]);

    return (
        <FieldWrapper
            minWidth={60}
            id={props.id || ''}
            name={props.name || ''}
            information={props.information}
            nameHasError={props.nameHasError}
            nameHasWarning={props.nameHasWarning}
        >
            {inputId => (
                <select
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    className={"background-bars"}
                    onChange={handleOnChange}
                    ref={inputRef}
                    value={value}
                    id={inputId}
                    style={{
                        textDecoration: props.valueHasError ? inputTextError : props.valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: props.valueHasError ? inputBorderError : props.valueHasWarning ? inputBorderWarning : inputBorderDefault,
                        width: '100%',
                    }}
                >
                    <option value={""}>Select</option>
                    {props.suggestions?.map((item, index) => {
                        return (
                            <option
                                title={item.description}
                                disabled={item.disabled}
                                children={item.label}
                                value={item.value}
                                key={index}
                            />
                        );
                    })}
                </select>
            )}
        </FieldWrapper>
    );
}
