import React, { useState } from 'react';
import './ToolBar.scss';
import { CurrentTab } from '../../../../../shared/enuns/CurrentTab';
import { TabButton } from '../../../../../shared/components/tab-button/TabButton';
import { Storage } from '../../../../../shared/services/LocalStorage';

export const ToolBar = (props: any) => {

    const [currentTab, setCurrentTab] = useState(CurrentTab.editor);

    function changeCurrentTab(tab: CurrentTab) {
        setCurrentTab(tab);
        props.changeCurrentTab(tab);
    } 

    return (
        <div className="tool-bar">
            <div className="sistem-tabs">
                <TabButton
                    onClick={() => changeCurrentTab(CurrentTab.editor)}
                    className=" btn-open-editor-tab"
                    isSelected={currentTab === CurrentTab.editor}
                    title="Editor"
                />
                <TabButton
                    onClick={() => changeCurrentTab(CurrentTab.properties)}
                    className=" btn-open-properties-tab"
                    isSelected={currentTab === CurrentTab.properties}
                    title="Propriedades do projeto"
                />
                <TabButton
                    onClick={() => changeCurrentTab(CurrentTab.plugins)}
                    className=" btn-open-plugins-tab"
                    isSelected={currentTab === CurrentTab.plugins}
                    title="Adicione e remova dependências do projeto"
                />
                <TabButton
                    onClick={() => Storage.resetProject()}
                    style={{ justifyContent: "center", alignSelf: "center" }}                  
                    content="Reset application"
                />
            </div>
        </div>
    );
}

export default ToolBar;
