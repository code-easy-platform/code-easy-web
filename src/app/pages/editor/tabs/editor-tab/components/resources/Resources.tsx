import React, { useContext, useState, Component } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { Project, Tab } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { Tree } from '../tree/Tree';

import "./Resources.scss";
import ComponentType from '../../../../../../shared/enuns/ComponentType';

export const ResourcesTree = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const project: Project = codeEditorContext.project;

    const [currentResTreeTab, setCurrentResTreeTab] = useState(ComponentType.tabRouters);

    return (
        <div style={{ flex: 1, flexDirection: "column" }}>
            <TabGroup>
                {project.tabs.map((tab: Tab) => {
                    return (
                        <TabButton
                            onClick={() => setCurrentResTreeTab(tab.configs.type)}
                            isSelected={tab.configs.type === currentResTreeTab}
                            className="btn-open-routers-tab"
                            title={tab.configs.name}
                            content={tab.configs.name}
                            style={{ flex: 1 }}
                        />
                    );
                })}
            </TabGroup>
            {project.tabs.map((tab: Tab) => {
                return (
                    <div className="tree-body" style={{ display: tab.configs.type === currentResTreeTab ? "block" : "none" }}>
                        {tab.itens.map(
                            (item: any) => <Tree allComponents={tab.itens} component={item} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ResourcesTree;
