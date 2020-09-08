import React, { useState, useCallback, useEffect, useRef } from 'react';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputBigStringProps extends IProperty<string> {
    onChange?(data: IProperty<string>): void;
}
export const InputBigString: React.FC<InputBigStringProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const inputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (inputRef.current && props.focusOnRender) {
            inputRef.current.focus();
        }
    }, [props]);

    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.useOnChange && onChange) {
            onChange({ ...props, value: e.currentTarget.value });
            setValue(e.currentTarget.value);
        } else {
            setValue(e.currentTarget.value);
        }
    }, [onChange, props]);

    const handleOnBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (props.value !== value && onChange) {
            onChange({ ...props, value });
        }
    }, [onChange, props, value]);

    const hadleOnKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === 'Enter' && onChange) {
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
                <textarea
                    className={"full-width background-bars"}
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    onKeyPress={hadleOnKeyPress}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    autoComplete={"off"}
                    ref={inputRef}
                    value={value}
                    id={inputId}
                    style={{
                        textDecoration: props.valueHasError ? inputTextError : props.valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: props.valueHasError ? inputBorderError : props.valueHasWarning ? inputBorderWarning : inputBorderDefault,
                        resize: 'vertical',
                        height: '50px',
                    }}
                />
            )}
        </FieldWrapper>
    );
}
