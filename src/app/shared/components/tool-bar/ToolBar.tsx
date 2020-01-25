import React, { useState, useContext } from 'react';

import CodeEditorContext from '../../services/contexts/CodeEditorContext';
import { TabButton, TabGroup } from '../tab-button/TabButton';
import { Storage } from '../../services/LocalStorage';
import { CurrentTab } from '../../enuns/CurrentTab';
import { Tab } from '../../interfaces/Aplication';
import './ToolBar.scss';

export const ToolBar = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = codeEditorContext.project.tabs;

    const [currentTab, setCurrentTab] = useState(CurrentTab.editor);

    function changeCurrentTab(tab: CurrentTab) {
        setCurrentTab(tab);
        props.changeCurrentTab(tab);
    }

    return (
        <div className="tool-bar">
            <div className="sistem-tabs">
                <TabButton
                    id="tabEditor"
                    onClick={() => changeCurrentTab(CurrentTab.editor)}
                    className=" btn-open-editor-tab"
                    isSelected={currentTab === CurrentTab.editor}
                    title="Editor"
                />
                <TabButton
                    id="tabPropriedades"
                    onClick={() => changeCurrentTab(CurrentTab.properties)}
                    className=" btn-open-properties-tab"
                    isSelected={currentTab === CurrentTab.properties}
                    title="Propriedades do projeto"
                />
                <TabButton
                    id="tabDependencias"
                    onClick={() => changeCurrentTab(CurrentTab.plugins)}
                    className=" btn-open-plugins-tab"
                    isSelected={currentTab === CurrentTab.plugins}
                    title="Adicione e remova dependências do projeto"
                />
                <TabButton
                    id="tabResetApplication"
                    onClick={() => Storage.resetProject()}
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    content="Reset application"
                />
            </div>
            <div style={{ width: 250 }}>
                {currentTab === CurrentTab.editor &&
                    <TabGroup>
                        {tabs.map((tab: Tab) => {
                            return (
                                <TabButton
                                    id={tab.configs.name}
                                    key={tab.configs.name}
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
                }
            </div>
        </div>
    );
}

export default ToolBar;
