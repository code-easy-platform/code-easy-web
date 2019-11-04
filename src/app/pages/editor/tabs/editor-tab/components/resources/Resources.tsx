import React, { useContext } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { Tab, Component } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { ComponentType } from '../../../../../../shared/enuns/ComponentType';
import { Tree } from '../tree/Tree';
import "./Resources.scss";

export const ResourcesTree = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = codeEditorContext.project.tabs;

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
            {tabs.map((tab: Tab) => {

                const listaComponent: Component[] = tab.itens.filter((comp: Component) => { return(comp.configs.type === ComponentType.localAction) }) || [];

                return (
                    <div className="tree-body" style={{ display: tab.configs.type === codeEditorContext.editingTab ? "block" : "none" }}>
                        {listaComponent.map(
                            (item: any) => <Tree allComponents={listaComponent} component={item} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ResourcesTree;
