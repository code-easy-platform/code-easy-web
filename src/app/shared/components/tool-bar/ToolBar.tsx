import React, { useState, useContext } from 'react';

import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import { TabButton, TabGroup } from '../tab-button/TabButton';
import { Storage } from '../../services/LocalStorage';
import { CurrentTab } from '../../enuns/CurrentTab';
import { Tab } from '../../interfaces/Aplication';
import './ToolBar.css';

export const ToolBar = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = (codeEditorContext.project?.tabs || []);

    const [currentTab, setCurrentTab] = useState(CurrentTab.editor);

    function changeCurrentTab(tab: CurrentTab) {
        setCurrentTab(tab);
        props.onChangeTab(tab);
    }

    return (
        <div className="tool-bar background-bars">
            <div>
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    onClick={() => { }}
                    className=" btn btn-open-menu-tab"
                />
                <TabGroup className="width-auto">
                    <TabButton
                        id="tabEditor"
                        title="Editor"
                        className=" btn-open-editor-tab"
                        isSelected={currentTab === CurrentTab.editor}
                        onClick={() => changeCurrentTab(CurrentTab.editor)}
                        onFocus={() => changeCurrentTab(CurrentTab.editor)}
                    />
                    <TabButton
                        id="tabPropriedades"
                        title="Propriedades do projeto"
                        className=" btn-open-properties-tab"
                        isSelected={currentTab === CurrentTab.properties}
                        onClick={() => changeCurrentTab(CurrentTab.properties)}
                        onFocus={() => changeCurrentTab(CurrentTab.properties)}
                    />
                    <TabButton
                        id="tabDependencias"
                        className=" btn-open-plugins-tab"
                        isSelected={currentTab === CurrentTab.plugins}
                        title="Adicione e remova dependências do projeto"
                        onClick={() => changeCurrentTab(CurrentTab.plugins)}
                        onFocus={() => changeCurrentTab(CurrentTab.plugins)}
                    />
                </TabGroup>
                <TabButton
                    id="tabResetApplication"
                    onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm('Deseja realmente resetaro projeto?')) {
                            codeEditorContext.updateProjectState(Storage.resetProject());
                            window.location.reload();
                        }
                    }}
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    content='Reset project'
                />
                <hr style={{ margin: 10 }} />
                <TabButton
                    id="openGithubApplication"
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    content={<a style={{ textDecoration: 'none', color: 'white' }} href='https://github.com/code-easy-platform' target='_blank' rel="noopener noreferrer" >Abrir no Github</a>}
                />
            </div>
            <div style={{ width: 300, justifyContent: "flex-end" }}>
                {currentTab === CurrentTab.editor &&
                    <TabGroup>
                        {tabs.map((tab: Tab) => {
                            return (
                                <TabButton
                                    id={tab.configs.name}
                                    key={tab.configs.name}
                                    content={tab.configs.label}
                                    title={tab.configs.description}
                                    isSelected={tab.configs.isEditing}
                                    className="btn-open-routers-tab flex1"
                                    onClick={() => codeEditorContext.toggleResourcesTab(tab.configs.type)}
                                    onFocus={() => codeEditorContext.toggleResourcesTab(tab.configs.type)}
                                />
                            );
                        })}
                    </TabGroup>
                }
                <TabButton
                    id="tabMenu"
                    onClick={() => { }}
                    className=" btn-open-menu-user-tab"
                    title="Menu do usuário"
                />
            </div>
        </div>
    );
}
