import React, { useState, useCallback, useEffect } from 'react';

import { FieldWrapper } from './../field-wrapper/FieldWrapper';
import { Switch } from '../../toggle-swicth/Switch';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputSwitchProps extends IProperty<boolean> {
    onChange?(data: IProperty<boolean>): void;
}
export const InputSwitch: React.FC<InputSwitchProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault } = useConfigs();
    
    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    const handleOnChange = useCallback((value: boolean) => {
        if (onChange) {
            onChange({ ...props, value });
        }
        setValue(value);
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
            {inputId => (<>
                <div className="flex1" />
                <Switch
                    id={inputId}
                    checked={value}
                    onChange={handleOnChange}
                    border={inputBorderDefault}
                    hasError={props.valueHasError}
                    borderError={inputBorderError}
                    autoFocus={props.focusOnRender}
                    hasWarning={props.valueHasWarning}
                    disabled={props.editValueDisabled}
                    borderWarning={inputBorderWarning}
                    backgroundColor={'var(--main-background-bars)'}
                />
            </>)}
        </FieldWrapper>
    );
}
