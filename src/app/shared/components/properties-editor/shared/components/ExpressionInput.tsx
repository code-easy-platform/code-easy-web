import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

export const ExpressionInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    // const onDoubleClick = props.onDoubleClick ? props.onDoubleClick : () => { };

    const [state, setState] = useState({ isOpenEditor: false, code: '' })

    return (
        <div style={{
            justifyContent: 'flex-end',
            width: props.style?.width,
            maxWidth: props.style?.maxWidth,
            alignItems: 'center',
        }}>
            <input {...props} onDoubleClick={e => setState({ ...state, isOpenEditor: true })} style={{ ...props.style, width: '100%', maxWidth: '100%', paddingRight: '24px' }} />
            <div
                style={{ ...props.style, minWidth: 0, width: 0, marginLeft: 4, cursor: 'pointer', height: '100%' }}
                onClick={(e: any) => setState({ ...state, isOpenEditor: true })}
            />

            {state.isOpenEditor && <div style={{ position: 'fixed', left: '0px', top: '0px', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>

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

        </div >
    );
}
