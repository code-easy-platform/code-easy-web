import React from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { ExpressionInput } from '../../expression-input/ExpressionInput';
import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface SimpleStringProps extends IProperty<string> { }
export const InputExpression: React.FC<SimpleStringProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const onPickerValueClick = useObserverValue(props.onPickerValueClick);
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
                <ExpressionInput
                    onSelectSuggest={option => setValue(option.value.value.toString())}
                    onChange={e => setValue(e.currentTarget.value)}
                    className="full-width background-bars"
                    onPickerClick={onPickerValueClick}
                    disabled={editValueDisabled}
                    autoFocus={focusOnRender}
                    suggestions={suggestions}
                    value={value}
                    id={inputId}
                    style={{
                        textDecoration: valueHasError ? inputTextError : valueHasWarning ? inputTextWarning : inputTextDefault,
                        border: valueHasError ? inputBorderError : valueHasWarning ? inputBorderWarning : inputBorderDefault,
                    }}
                />
            )}
        </FieldWrapper>
    );
}
