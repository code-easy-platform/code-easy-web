import React, { useState, useCallback, useEffect, useRef } from 'react';

import { IProperty, IFileContent } from '../../../interfaces';
import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { InputFile } from '../../input-file/InputFile';
import { useConfigs } from '../../../contexts';

interface InputImportFileProps extends IProperty<IFileContent> {
    onChange?(data: IProperty<IFileContent>): void;
}
export const InputImportFile: React.FC<InputImportFileProps> = ({ onChange, ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current && props.focusOnRender) {
            inputRef.current.focus();
        }
    }, [props]);

    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();

            let file: IFileContent = {
                content: undefined,
                name: e.target.files ? e.target.files.item(0)?.name : undefined,
                size: e.target.files ? e.target.files.item(0)?.size : undefined,
                type: e.target.files ? e.target.files.item(0)?.type : undefined,
                lastModified: e.target.files ? e.target.files.item(0)?.lastModified : undefined,
            }

            fileReader.addEventListener("load", (event) => {
                if (event.target && onChange) {
                    file.content = event.target.result;
                    setValue(file);
                    onChange({ ...props, value: file });
                }
            });

            fileReader.readAsDataURL(e.target.files[0]);
        }
    }, [onChange, props]);

    const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (props.value !== value && onChange) {
            onChange({ ...props, value });
        }
    }, [onChange, props, value]);

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
                <InputFile
                    className={`full-width background-bars border-radius outline-none`}
                    fileContent={value?.content || null}
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    fileMaxSize={props.fileMaxSize}
                    fileName={props.value?.name}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    ref={inputRef}
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
