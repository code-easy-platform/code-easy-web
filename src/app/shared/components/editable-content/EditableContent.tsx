import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

import { useEditorContext } from '../../contexts';
import { Modal, ModalElement } from '../modal';

export const EditableContent: React.FC<{ itemId: string, removeModal: Function }> = ({ itemId, removeModal }) => {

    const modalRef = useRef<ModalElement>(null);
    const editorRef = useRef<MonacoEditor>(null);

    const { project, setProject } = useEditorContext();
    let selectedItem: any;

    project.tabs.forEach(tab => {
        tab.items.forEach(treeItem => {

            if (treeItem.id === itemId) {
                selectedItem = treeItem;
            }

            treeItem.properties.forEach(treeItemProp => {
                if (treeItemProp.id === itemId) {
                    selectedItem = treeItemProp;
                }
            });

            treeItem.items.forEach(flowItem => {

                if (flowItem.id === itemId) {
                    selectedItem = flowItem;
                }

                flowItem.properties.forEach(flowItemProp => {

                    if (flowItemProp.id === itemId) {
                        selectedItem = flowItemProp;
                    }

                });

            });

        });
    });

    return (
        <Modal
            isOpen={true}
            ref={modalRef}
            initialWidth={800}
            initialHeight={600}
            allowBackdropClick={true}
            title={selectedItem?.name}
            onClose={() => removeModal()}
            closeWithBackdropClick={false}
        >
            <MonacoEditor
                theme={"vs-dark"}
                ref={editorRef}
                language="javascript"
                value={selectedItem?.value}
                width={modalRef.current?.width}
                height={modalRef.current?.height}
                onChange={value => { selectedItem.value = value; setProject(project) }}
                overrideServices={{

                }}
                options={{
                    autoClosingQuotes: "always",
                    tabCompletion: "on",
                    dragAndDrop: true,
                    links: true,
                    mouseWheelZoom: true,
                    suggest: {
                        showFunctions: true
                    }
                }}
            />
        </Modal>
    );
}
