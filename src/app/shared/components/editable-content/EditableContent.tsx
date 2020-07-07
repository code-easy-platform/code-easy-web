import React from 'react';

import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import MonacoEditor from 'react-monaco-editor';
import { Modal } from '../modal/Modal';

export const EditableContent: React.FC<{ itemId: string, removeModal: Function }> = ({ itemId, removeModal }) => {
    const context = React.useContext(CodeEditorContext);
    let selectedItem: any;

    context.project.tabs.forEach(tab => {
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
            maxWidth={820}
            maxHeight={620}
            allowBackdropClick={true}
            primaryButtomText={"Done"}
            title={selectedItem?.name}
            secondaryButtomText={"Close"}
            closeWithBackdropClick={false}
            onClickPrimary={_ => removeModal()}
            onClickSecondary={_ => removeModal()}
            onClose={value => { removeModal(); return value; }}
        >
            <MonacoEditor
                options={{
                    autoClosingQuotes: "always",
                    tabCompletion: "on",
                    dragAndDrop: true,
                    links:true,
                    mouseWheelZoom: true,
                    suggest: {
                        showFunctions: true
                    }
                }}
                theme={"vs-dark"}
                language="typescript"
                value={selectedItem?.value}
                onChange={value => { selectedItem.value = value; context.updateProjectState(context.project) }}
            />
        </Modal>
    );
}