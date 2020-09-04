import React from 'react';

import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';
import { FieldWrapper } from '../..';

export const InputViewOnly: React.FC<IProperty> = (props) => {
    const { valueHasError = false, nameHasError = false, nameHasWarning = false, valueHasWarning = false, id, value, information, name } = props;
    const { inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

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
