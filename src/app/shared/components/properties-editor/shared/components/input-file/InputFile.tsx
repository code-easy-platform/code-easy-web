import React, { useRef, useState } from 'react';
import { Utils } from 'code-easy-components';

import './InputFile.css';

type InputFileProps = Omit<{
    /**
     * File content, if a image show a preview. 
     */
    fileContent: string | ArrayBuffer | null;
    /**
     * File name, used to show in the input.
     */
    fileName?: string;
    /**
     * Max size in bytes
     * Default value 1MB(1048576)
     */
    fileMaxSize?: number;
}, keyof React.InputHTMLAttributes<HTMLInputElement>> & React.InputHTMLAttributes<HTMLInputElement>;
/**
 * Input use to upload files
 */
export const InputFile = React.forwardRef(({ fileName, fileMaxSize = 1048576, fileContent, ...props }: InputFileProps, ref: any) => {

    const [state, setState] = useState({ fileName });
    const input: any = useRef(null);

    const css_input_file: React.CSSProperties = {
        ...props.style,
        opacity: props.disabled ? 0.7 : undefined,
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e);
    }

    return (<>
        <input
            ref={input}
            type={'file'}
            id={props.id}
            key={props.id}
            disabled={props.disabled}
            style={{ display: 'none' }}
            onChange={(e: any) => {
                if (e.target.files[0]?.size < fileMaxSize) {
                    setState({ fileName: e.target.files[0]?.name });
                    onChange(e)
                }
            }}
        />
        <div
            {...props}
            style={css_input_file}
            id={Utils.getUUID() + "_" + props.id}
            key={Utils.getUUID() + "_" + props.id}
            onClick={e => { input.current.click() }}
            tabIndex={!props.disabled ? 0 : undefined}
            onKeyPress={e => { input.current.click() }}
            className={props.className + " input-file-view padding-s padding-horizontal-xs"}
        >
            <div>
                {fileContent && <img src={String(fileContent)} height={16} alt="" className="padding-right-xs" />}
                {state.fileName || 'Select a file...'}
            </div>
        </div>
    </>);

});
