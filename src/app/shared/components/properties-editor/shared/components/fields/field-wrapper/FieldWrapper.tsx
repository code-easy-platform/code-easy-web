import React, { useRef, useEffect, useState } from 'react';
import { IconMoreInfo } from 'code-easy-components';
import { useRecoilState } from 'recoil';

import { LocalStorageService } from '../../../local-storage/LocalStorage';
import { InputWidthStore } from './../../../stores/InputWidth';
import { useConfigs } from '../../../contexts';
import { Resizer, Tooltip } from './../../';
import './FieldWrapper.css';

interface FieldWrapperProps {
    id: string;
    name: string;
    minWidth?: number;
    information?: string;
    nameHasError?: boolean;
    nameHasWarning?: boolean;
    /**
     * Used to render a child with a specific id 
     * @param id Id used in the label htmlFor
     */
    children(id: string): React.ReactNode;
    onDoubleClick?(e: React.MouseEvent<HTMLLabelElement, MouseEvent>): void;
}
export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children, id, name, information, minWidth, nameHasError, nameHasWarning, onDoubleClick }) => {
    const { inputTextError, inputTextWarning, inputTextDefault } = useConfigs();
    const [inputWidth, setInputWidth] = useRecoilState(InputWidthStore);
    const containerWidth = useRef<any>(null);
    const infoIconRef = useRef<any>(null);

    const [container, setContainer] = useState<{ width: number }>({ width: 200 });
    useEffect(() => {
        if (containerWidth.current) {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        }
    }, []);
    if (containerWidth.current) {
        containerWidth.current.addEventListener('resizer', () => {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        });
    }

    return (
        <div ref={containerWidth} className={"padding-s padding-bottom-none container-field-wrapper"} >
            <label
                htmlFor={'prop_id_' + id}
                onDoubleClick={onDoubleClick}
                className={"flex1 label-field-wrapper"}
                style={{
                    textDecoration: nameHasError ? inputTextError : nameHasWarning ? inputTextWarning : inputTextDefault,
                    width: (container.width - inputWidth),
                }}
            >
                {name}
                {(information !== "" && information !== undefined) && <img ref={infoIconRef} className="margin-left-xs" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
            </label>
            <Tooltip elementRef={infoIconRef} description={information} />
            <Resizer
                oldWidth={inputWidth}
                onChange={setInputWidth}
                onRisizeEnd={newWidth => LocalStorageService.setInputsWidth(newWidth)}
            />
            <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth, maxWidth: '90%' }}>
                {children('prop_id_' + id)}
            </div>
        </div>
    );
}
