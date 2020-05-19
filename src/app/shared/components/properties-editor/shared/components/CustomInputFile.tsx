import React, { useRef, useState } from 'react';
import { Utils } from 'code-easy-components';

export const CustomInputFile = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const input: any = useRef(null);
    const [state, setState] = useState({
        fileName: ''
    });

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
            tabIndex={1}
            style={css_input_file}
            id={Utils.getUUID() + "_" + props.id}
            key={Utils.getUUID() + "_" + props.id}
            onClick={e => { input.current.click() }}
            onKeyPress={e => { input.current.click() }}
        >{state.fileName || 'Select a file...'}</div>
        <input key={props.id} id={props.id} type='file' disabled={props.disabled} autoComplete='off' ref={input} onChange={(e: any) => { setState({ fileName: e.target.files[0].name }); onChange(e) }} style={{ display: 'none' }} />
    </>);
}
