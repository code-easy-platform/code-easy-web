import React, { useContext, useState } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { CurrentResTreeTab } from '../../../../../../shared/enuns/CurrentTab';
import { Application, ListComponent } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { Tree } from '../tree/Tree';

import "./Resources.scss";

export const ResourcesTree = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const application: Application = codeEditorContext.application;

    const [currentResTreeTab, setCurrentResTreeTab] = useState(CurrentResTreeTab.router);

    return (
        <div style={{ flex: 1, flexDirection: "column" }}>
            <TabGroup>
                <TabButton
                    onClick={() => setCurrentResTreeTab(CurrentResTreeTab.router)}
                    isSelected={currentResTreeTab === CurrentResTreeTab.router}
                    className="btn-open-routers-tab"
                    title="Routers"
                    content="Routers"
                    style={{ flex: 1 }}
                />
                <TabButton
                    onClick={() => setCurrentResTreeTab(CurrentResTreeTab.action)}
                    isSelected={currentResTreeTab === CurrentResTreeTab.action}
                    className="btn-open-actions-tab"
                    title="Actions"
                    content="Actions"
                    style={{ flex: 1 }}
                />
                <TabButton
                    onClick={() => setCurrentResTreeTab(CurrentResTreeTab.data)}
                    isSelected={currentResTreeTab === CurrentResTreeTab.data}
                    className="btn-open-data-tab"
                    title="Data"
                    content="Data"
                    style={{ flex: 1 }}
                />
            </TabGroup>
            <div className="tree-body" style={{ display: currentResTreeTab === CurrentResTreeTab.router ? "block" : "none" }}>
                {application.routers.listComponent.map(
                    (listComponent: ListComponent) => <Tree listComponent={listComponent} />
                )}
            </div>
            <div className="tree-body" style={{ display: currentResTreeTab === CurrentResTreeTab.action ? "block" : "none" }}>
                {application.actions.listComponent.map(
                    (listComponent: ListComponent) => <Tree listComponent={listComponent} />
                )}
            </div>
            <div className="tree-body" style={{ display: currentResTreeTab === CurrentResTreeTab.data ? "block" : "none" }}>
                {application.data.listComponent.map(
                    (listComponent: ListComponent) => <Tree listComponent={listComponent} />
                )}
            </div>
        </div>
    );
}

export default ResourcesTree;
