import React, { useEffect, useRef, useState } from 'react';
import { observe, useObserver, useObserverValue } from 'react-observing';
import MonacoEditor from 'react-monaco-editor';

import { useEditorContext } from '../../hooks';
import { Modal, ModalElement } from '../modal';

export const EditableContent: React.FC<{ itemId: string, removeModal: Function }> = ({ itemId, removeModal }) => {
    const editorRef = useRef<MonacoEditor>(null);
    const modalRef = useRef<ModalElement>(null);

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);

    const [selectedItemTitle, setSelectedItemTitle] = useState(observe<string | undefined>(''));
    const [selectedItem, setSelectedItem] = useState(observe(''));
    useEffect(() => {
        tabs.forEach(tab => {
            tab.items.value.forEach(treeItem => {
                if (treeItem.id.value === itemId) {
                    setSelectedItemTitle(treeItem.label);
                    setSelectedItem(treeItem.label);
                }

                treeItem.properties.value?.forEach(treeItemProp => {
                    if (treeItemProp.id.value === itemId) {
                        setSelectedItemTitle(treeItemProp.name);
                        setSelectedItem(treeItemProp.value);
                    }
                });

                treeItem.items.value.forEach(flowItem => {
                    if (flowItem.id.value === itemId) {
                        setSelectedItemTitle(flowItem.label);
                        setSelectedItem(flowItem.label);
                    }

                    flowItem.properties.value?.forEach(flowItemProp => {
                        if (flowItemProp.id.value === itemId) {
                            setSelectedItemTitle(flowItemProp.name);
                            setSelectedItem(flowItemProp.value);
                        }
                    });
                });
            });
        });
    }, [itemId, tabs]);

    const [text, setText] = useObserver(selectedItem);
    const title = useObserverValue(selectedItemTitle);

    return (
        <Modal
            isOpen={true}
            title={title}
            ref={modalRef}
            initialWidth={800}
            initialHeight={600}
            allowBackdropClick={true}
            onClose={() => removeModal()}
            closeWithBackdropClick={false}
        >
            <MonacoEditor
                value={text}
                language="json"
                ref={editorRef}
                theme={"vs-dark"}
                width={modalRef.current?.width}
                height={modalRef.current?.height}
                onChange={value => setText(value)}
                options={{
                    autoClosingQuotes: "always",
                    mouseWheelZoom: true,
                    tabCompletion: "on",
                    dragAndDrop: true,
                    links: true,
                    fontFamily: 'Firacode',
                    comments: {
                        insertSpace: true
                    },
                    suggest: {
                        showFunctions: true,
                        showConstants: true,
                        showVariables: true,
                        showColors: true,
                    },
                    highlightActiveIndentGuide: true,
                }}
            />
        </Modal>
    );
}
