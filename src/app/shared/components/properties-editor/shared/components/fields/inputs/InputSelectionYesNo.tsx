import React, { useState, useCallback, useEffect, useRef } from 'react';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputSelectionYesNoProps extends IProperty<boolean> {
    onChange?(data: IProperty<boolean>): void;
}
export const InputSelectionYesNo: React.FC<InputSelectionYesNoProps> = ({ onChange, ...props }) => {
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
            onChange({ ...props, value: Boolean(e.currentTarget.value) });
            setValue(Boolean(e.currentTarget.value));
        }
    }, [onChange, props]);

    const handleOnDoubleClick = useCallback(() => {
        if (onChange) {
            onChange({ ...props, value: !value });
            setValue(!value);
        }
    }, [onChange, props, value]);

    return (
        <FieldWrapper
            minWidth={60}
            id={props.id || ''}
            name={props.name || ''}
            information={props.information}
            nameHasError={props.nameHasError}
            onDoubleClick={handleOnDoubleClick}
            nameHasWarning={props.nameHasWarning}
        >
            {inputId => (
                <select
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    className={"background-bars"}
                    onChange={handleOnChange}
                    value={String(value)}
                    ref={inputRef}
                    id={inputId}
                    style={{
                        textDecoration: props.valueHasError ? inputTextError : props.valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: props.valueHasError ? inputBorderError : props.valueHasWarning ? inputBorderWarning : inputBorderDefault,
                        width: '100%',
                    }}
                >
                    <option children={"Yes"} value={"true"} />
                    <option children={"No"} value={"false"} />
                </select>
            )}
        </FieldWrapper>
    );
}
