import React, { useEffect, useRef } from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty, ISuggestion } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface InputSelectionProps extends IProperty<string> { }
export const InputSelection: React.FC<InputSelectionProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const editValueDisabled = useObserverValue(props.editValueDisabled);
    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const nameHasWarning = useObserverValue(props.nameHasWarning);
    const focusOnRender = useObserverValue(props.focusOnRender);
    const valueHasError = useObserverValue(props.valueHasError);
    const nameHasError = useObserverValue(props.nameHasError);
    const suggestions = useObserverValue(props.suggestions);
    const information = useObserverValue(props.information);
    const [value, setValue] = useObserver(props.value);
    const name = useObserverValue(props.name);
    const id = useObserverValue(props.id);

    const inputRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        if (inputRef.current && focusOnRender) {
            inputRef.current.focus();
        }
    }, [focusOnRender]);

    return (
        <FieldWrapper
            minWidth={60}
            id={id || ''}
            name={name || ''}
            information={information}
            nameHasError={nameHasError}
            nameHasWarning={nameHasWarning}
        >
            {inputId => (
                <select
                    onChange={e => setValue(e.currentTarget.value)}
                    className={"background-bars"}
                    disabled={editValueDisabled}
                    autoFocus={focusOnRender}
                    ref={inputRef}
                    value={value}
                    id={inputId}
                    style={{
                        textDecoration: valueHasError ? inputTextError : valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: valueHasError ? inputBorderError : valueHasWarning ? inputBorderWarning : inputBorderDefault,
                        width: '100%',
                    }}
                >
                    <option value={""}>Select</option>
                    {suggestions?.map((item, index) => {
                        return <Option key={index} {...item} />;
                    })}
                </select>
            )}
        </FieldWrapper>
    );
}

/**
 * Option used in a select in the component input select
 */
const Option: React.FC<ISuggestion> = ({ ...props }) => {
    const description = useObserverValue(props.description);
    const disabled = useObserverValue(props.disabled);
    const label = useObserverValue(props.label);
    const value = useObserverValue(props.value);

    return (
        <option
            title={description}
            disabled={disabled}
            children={label}
            value={value}
        />
    );
}
