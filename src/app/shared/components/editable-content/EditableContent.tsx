import React, { useRef } from 'react';
import { useObserverValue } from 'react-observing';
import MonacoEditor from 'react-monaco-editor';

import { useEditorContext } from '../../hooks';
import { Modal, ModalElement } from '../modal';

export const EditableContent: React.FC<{ itemId: string, removeModal: Function }> = ({ itemId, removeModal }) => {

    const modalRef = useRef<ModalElement>(null);
    const editorRef = useRef<MonacoEditor>(null);

    const { project, setProject } = useEditorContext();
    const tabs = useObserverValue(project.tabs);
    let selectedItem: any;

    tabs.forEach(tab => {
        tab.items.value.forEach(treeItem => {

            if (treeItem.id.value === itemId) {
                selectedItem = treeItem;
            }

            treeItem.properties.value?.forEach(treeItemProp => {
                if (treeItemProp.id.value === itemId) {
                    selectedItem = treeItemProp;
                }
            });

            treeItem.items.value.forEach(flowItem => {

                if (flowItem.id.value === itemId) {
                    selectedItem = flowItem;
                }

                flowItem.properties.value?.forEach(flowItemProp => {

                    if (flowItemProp.id.value === itemId) {
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
                language="json"
                ref={editorRef}
                theme={"vs-dark"}
                value={selectedItem?.value}
                width={modalRef.current?.width}
                height={modalRef.current?.height}
                onChange={value => { selectedItem.value = value; setProject(project) }}
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
