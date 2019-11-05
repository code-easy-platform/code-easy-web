import React, { useContext } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { Tree } from '../tree/Tree';
import { Tab, Component } from '../../../../../../shared/interfaces/Aplication';
import "./Resources.scss";
import ComponentType from '../../../../../../shared/enuns/ComponentType';

export const ResourcesTree = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = codeEditorContext.project.tabs;

    const currentTab: Tab = codeEditorContext.getCurrentTabSelected();
    const currentTabActionsAndVariables: Component[] = codeEditorContext.getComponents({ typeComponent: [ComponentType.localAction] });

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
            {
                <div className="tree-body" style={{ display: currentTab.configs.type === codeEditorContext.editingTab ? "block" : "none" }}>
                    {currentTabActionsAndVariables.map(
                        (item: any) => <Tree allComponents={currentTab.itens} component={item} />
                    )}
                </div>
            }
        </div>
    );
}

export default ResourcesTree;
