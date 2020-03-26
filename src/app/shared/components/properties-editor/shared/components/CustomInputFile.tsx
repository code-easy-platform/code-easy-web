import React, { useRef, useState } from 'react';

export const CustomInputFile = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const input: any = useRef(null);
    const [state, setState] = useState({
        fileName: ''
    });

    const css_input_file: React.CSSProperties = {
        ...props.style,
        textOverflow: 'ellipsis',
        display: 'inline-block',
        textAlign: 'start',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e);
    }

    return (<>
        <div {...props} id={undefined} style={css_input_file} onClick={e => { input.current.click() }} onChange={onChange} >{state.fileName || 'Selecione um arquivo...'}</div>
        <input id={props.id} type='file' ref={input} onChange={(e) => { setState({ fileName: e.target.value }); onChange(e) }} style={{ display: 'none' }} />
    </>);
}
