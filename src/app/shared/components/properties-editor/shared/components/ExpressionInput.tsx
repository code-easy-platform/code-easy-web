import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

export const ExpressionInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {

    const [state, setState] = useState({ isOpenEditor: false, code: '' })

    const css_picker_editor: React.CSSProperties = {
        backgroundColor: 'var(--main-background-bars)',
        border: 'var(--input-border)',
        cursor: 'pointer',
        borderRadius: 50,
        color: 'white',
        height: '100%',
        marginLeft: 4,
        padding: 8,
        paddingRight: 4,
        paddingLeft: 4,
    }

    const openEditor = (e: any) => {

        if (props.onDoubleClick) {
            props.onDoubleClick(e);
        }

        setState({ ...state, isOpenEditor: true });
    }

    return (
        <div style={{
            alignItems: 'center',
            width: props.style?.width,
            justifyContent: 'flex-end',
            maxWidth: props.style?.maxWidth,
        }}>
            <input {...props} autoComplete='off' onDoubleClick={openEditor} style={{ ...props.style, width: '100%', maxWidth: '100%', paddingRight: '24px' }} />
            <button style={css_picker_editor} disabled={props.disabled} onClick={openEditor} />

            {
                ( // Valida se ostra  editor ou não
                    props.disabled === undefined
                        ? state.isOpenEditor
                        : (state.isOpenEditor && !props.disabled)
                ) &&
                <div style={{ position: 'fixed', left: '0px', top: '0px', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>

                    <div style={{
                        backgroundColor: '#2c2c2c',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        padding: '8px',
                        height: '70%',
                        width: '70%',
                    }}>

                        <div style={{ padding: '8px' }}>
                            <button onClick={e => setState({ ...state, isOpenEditor: false })}>Fechar</button>
                        </div>

                        <MonacoEditor
                            language="json"
                            theme="vs-dark"
                            value={state.code}
                            onChange={(newValue, e) => { setState({ ...state, code: newValue }) }}
                            options={{
                                selectOnLineNumbers: true,
                                autoSurround: "brackets"
                            }}
                            editorDidMount={(editor, monaco) => {
                                console.log('editorDidMount', editor);
                                editor.focus();
                            }}
                        />
                    </div>

                </div>}

        </div>
    );
}
