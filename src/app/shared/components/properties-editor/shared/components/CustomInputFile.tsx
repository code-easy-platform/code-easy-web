import React, { useRef, useState } from 'react';
import { Utils } from '../Utils';

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
        <div {...props} id={Utils.getRandomId() + "_" + props.id} style={css_input_file} onClick={e => { input.current.click() }} onChange={onChange} >{state.fileName || 'Selecione um arquivo...'}</div>
        <input id={props.id} type='file' autoComplete='off' ref={input} onChange={(e) => { setState({ fileName: e.target.value }); onChange(e) }} style={{ display: 'none' }} />
    </>);
}
