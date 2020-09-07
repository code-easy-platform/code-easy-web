import React, { useState, useCallback } from 'react';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputSimpleNumberProps extends IProperty<number> {
    onChange?(data: IProperty<number>): void;
}
export const InputSimpleNumber: React.FC<InputSimpleNumberProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();
    const [value, setValue] = useState(props.value);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.useOnChange && onChange) {
            onChange({ ...props, value: Number(e.currentTarget.value) });
            setValue(Number(e.currentTarget.value));
        } else {
            setValue(Number(e.currentTarget.value));
        }
    }, [onChange, props]);

    const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (props.value !== value && onChange) {
            onChange({ ...props, value });
        }
    }, [onChange, props, value]);

    const hadleOnKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onChange) {
            onChange({ ...props, value: Number(e.currentTarget.value) });
            setValue(Number(e.currentTarget.value));
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
                <input
                    className={"full-width background-bars"}
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    onKeyPress={hadleOnKeyPress}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    autoComplete={'off'}
                    type={"number"}
                    value={value}
                    id={inputId}
                    style={{
                        textDecoration: props.valueHasError ? inputTextError : props.valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: props.valueHasError ? inputBorderError : props.valueHasWarning ? inputBorderWarning : inputBorderDefault,
                    }}
                />
            )}
        </FieldWrapper>
    );
}
