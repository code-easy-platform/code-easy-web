import React, { useState, useContext } from 'react';

import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import { Tab, ComponentConfigs } from '../../interfaces/Aplication';
import { TabButton, TabGroup } from '../tab-button/TabButton';
import { ComponentType } from '../../enuns/ComponentType';
import { CurrentTab } from '../../enuns/CurrentTab';
import './ToolBar.scss';

export const ToolBar = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabs: Tab[] = [
        new Tab({
            itens: [],
            configs: new ComponentConfigs({
                id: '1',
                name: 'routers',
                isExpanded: true,
                isEditando: true,
                label: 'Routers',
                type: ComponentType.tabRouters,
                description: 'Permite a criação das rotas da aplicação de APIs',
            }),
        }),
        new Tab({
            itens: [],
            configs: new ComponentConfigs({
                id: '1',
                name: 'actions',
                isEditando: true,
                isExpanded: true,
                label: 'Actions',
                type: ComponentType.tabActions,
                description: 'Permite a criação da lógica da aplicação de APIs',
            }),
        }),
        new Tab({
            itens: [],
            configs: new ComponentConfigs({
                id: '1',
                name: 'data',
                label: 'Data',
                isEditando: true,
                isExpanded: true,
                type: ComponentType.tabDates,
                description: 'Permite a criação do banco de dados da aplicação de APIs',
            }),
        }),
    ];

    const [currentTab, setCurrentTab] = useState(CurrentTab.editor);

    function changeCurrentTab(tab: CurrentTab) {
        setCurrentTab(tab);
        props.onChangeTab(tab);
    }

    return (
        <div className="tool-bar">
            <div className="sistem-tabs">
                <TabButton
                    id="tabMenu"
                    onClick={() => { }}
                    className=" btn btn-open-menu-tab"
                    title="Menu"
                />
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
                    // onClick={() => Storage.resetProject()}
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    content={<a style={{ textDecoration: 'none', color: 'white' }} href='https://github.com/code-easy-platform' target='_blank' rel="noopener noreferrer" >Abrir no Git hub</a>}
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
