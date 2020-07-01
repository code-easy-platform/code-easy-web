import React, { useRef, useState } from 'react';
import { Utils } from 'code-easy-components';

import './InputFile.css';


type InputFileProps = Omit<{
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
export const InputFile = React.forwardRef(({ fileName, fileMaxSize = 1048576, ...props }: InputFileProps, ref: any) => {

    const input: any = useRef(null);
    const [state, setState] = useState({ fileName });

    const css_input_file: React.CSSProperties = {
        ...props.style,
        padding: 'var(--size-2)',
        paddingRight: 'var(--size-1)',
        paddingLeft: 'var(--size-1)',
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
        <div
            {...props}
            style={css_input_file}
            id={Utils.getUUID() + "_" + props.id}
            key={Utils.getUUID() + "_" + props.id}
            onClick={e => { input.current.click() }}
            onKeyPress={e => { input.current.click() }}
        >{state.fileName || 'Select a file...'}</div>
        <input
            ref={input}
            tabIndex={0}
            type={'file'}
            id={props.id}
            key={props.id}
            disabled={props.disabled}
            style={{ display: 'none' }}
            onChange={(e: any) => {
                console.log(e.target.files[0])
                if (e.target.files[0]?.size < fileMaxSize) {
                    setState({ fileName: e.target.files[0]?.name });
                    onChange(e)
                }
            }}
        />
    </>);

});
