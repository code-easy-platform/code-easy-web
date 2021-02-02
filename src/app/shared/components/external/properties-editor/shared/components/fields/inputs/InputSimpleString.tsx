import React, { useEffect, useRef } from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

interface SimpleStringProps extends IProperty<string> { }
export const SimpleString: React.FC<SimpleStringProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const editValueDisabled = useObserverValue(props.editValueDisabled);
    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const nameHasWarning = useObserverValue(props.nameHasWarning);
    const focusOnRender = useObserverValue(props.focusOnRender);
    const valueHasError = useObserverValue(props.valueHasError);
    const nameHasError = useObserverValue(props.nameHasError);
    const information = useObserverValue(props.information);
    const [value, setValue] = useObserver(props.value);
    const name = useObserverValue(props.name);
    const id = useObserverValue(props.id);

    const inputRef = useRef<HTMLInputElement>(null);
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
                <input
                    onChange={e => setValue(e.currentTarget.value)}
                    className={"full-width background-bars"}
                    disabled={editValueDisabled}
                    autoFocus={focusOnRender}
                    autoComplete={'off'}
                    ref={inputRef}
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
