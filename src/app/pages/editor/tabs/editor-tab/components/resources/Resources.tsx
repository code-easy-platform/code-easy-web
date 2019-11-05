import React, { useContext } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { TreeInterface } from '../../../../../../shared/components/tree/TreeInterface';
import { Tree } from '../../../../../../shared/components/tree/Tree';
import { Tab } from '../../../../../../shared/interfaces/Aplication';
import "./Resources.scss";

export const ResourcesTree = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = codeEditorContext.project.tabs;

    const currentTab: Tab = codeEditorContext.getCurrentTabSelected();
    const currentTabTree: TreeInterface = codeEditorContext.getCurrentTabTree();

    return (
        <div style={{ flex: 1, flexDirection: "column" }}>
            <TabGroup>
                {tabs.map((tab: Tab) => {
                    return (
                        <TabButton
                            onClick={() => codeEditorContext.toggleResourcesTab(tab)}
                            isSelected={tab.configs.type === codeEditorContext.editingTab}
                            className="btn-open-routers-tab"
                            title={tab.configs.name}
                            content={tab.configs.name}
                            style={{ flex: 1 }}
                        />
                    );
                })}
            </TabGroup>
            <div className="tree-body" style={{ display: currentTab.configs.type === codeEditorContext.editingTab ? "block" : "none" }}>
                <Tree treeItem={currentTabTree} />
            </div>
        </div>
    );
}

export default ResourcesTree;
