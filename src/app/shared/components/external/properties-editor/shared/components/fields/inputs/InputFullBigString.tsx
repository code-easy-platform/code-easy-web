import React, { useState, useCallback, useEffect } from 'react';

import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    position: 'relative',
}
interface InputFullBigStringProps extends IProperty<string> {
    onChange?(data: IProperty<string>): void;
}
export const InputFullBigString: React.FC<InputFullBigStringProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

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
        <div style={css_prop_item} className="padding-s padding-bottom-none">
            <textarea
                className={"full-width background-bars"}
                disabled={props.editValueDisabled}
                autoFocus={props.focusOnRender}
                onKeyPress={hadleOnKeyPress}
                id={'prop_id_' + props.id}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                autoComplete={"off"}
                value={value}
                style={{
                    textDecoration: props.valueHasError ? inputTextError : props.valueHasWarning ? inputTextWarning : inputTextDefault,
                    border: props.valueHasError ? inputBorderError : props.valueHasWarning ? inputBorderWarning : inputBorderDefault,
                    resize: 'vertical',
                    height: '100px',
                }}
            />
        </div>
    );
}
