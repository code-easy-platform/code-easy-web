import React, { useCallback, useEffect, useRef } from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { IProperty, IFileContent } from '../../../interfaces';
import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { InputFile } from '../../input-file/InputFile';
import { useConfigs } from '../../../contexts';

interface InputImportFileProps extends IProperty<IFileContent> { }
export const InputImportFile: React.FC<InputImportFileProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const editValueDisabled = useObserverValue(props.editValueDisabled);
    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const nameHasWarning = useObserverValue(props.nameHasWarning);
    const focusOnRender = useObserverValue(props.focusOnRender);
    const valueHasError = useObserverValue(props.valueHasError);
    const nameHasError = useObserverValue(props.nameHasError);
    const fileMaxSize = useObserverValue(props.fileMaxSize);
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
                if (event.target) {
                    file.content = event.target.result;
                    setValue(file);
                }
            });

            fileReader.readAsDataURL(e.target.files[0]);
        }
    }, [setValue]);

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
                <InputFile
                    className={`full-width background-bars border-radius outline-none`}
                    fileContent={value?.content || null}
                    disabled={editValueDisabled}
                    autoFocus={focusOnRender}
                    fileMaxSize={fileMaxSize}
                    onChange={handleOnChange}
                    fileName={value?.name}
                    title={value?.name}
                    ref={inputRef}
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
