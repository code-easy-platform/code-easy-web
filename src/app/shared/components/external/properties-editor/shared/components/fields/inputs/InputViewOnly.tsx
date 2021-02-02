import React from 'react';
import { useObserverValue } from 'react-observing';

import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

export const InputViewOnly: React.FC<IProperty<string | number>> = ({ ...props }) => {
    const { inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const nameHasWarning = useObserverValue(props.nameHasWarning);
    const valueHasError = useObserverValue(props.valueHasError);
    const nameHasError = useObserverValue(props.nameHasError);
    const information = useObserverValue(props.information);
    const value = useObserverValue(props.value);
    const name = useObserverValue(props.name);
    const id = useObserverValue(props.id);

    return (
        <FieldWrapper
            minWidth={60}
            id={id || ''}
            name={name || ''}
            nameHasError={nameHasError}
            information={information}
            nameHasWarning={nameHasWarning}
        >
            {inputId => (
                <label
                    style={{
                        textDecoration: valueHasError ? inputTextError : valueHasWarning ? inputTextWarning : inputTextDefault,
                        backgroundColor: 'transparent',
                        textOverflow: 'ellipsis',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        textAlign: 'start',
                        overflow: 'hidden',
                    }}
                    children={value}
                    id={inputId}
                />
            )}
        </FieldWrapper>
    );
}
