import React, { useState, memo } from 'react';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { ProjectsStorage } from '../../services/storage/ProjectsStorage';
import { TabButton, TabGroup } from '../tab-button/TabButton';
import { TabsManager } from '../tab-manager/TabsManager';
import { Tab } from '../../interfaces/Tabs';
import { Modal } from '../modal/Modal';
import './ToolBar.css';
import { useCodeEditorContext } from '../../services/contexts/CodeEditorContext';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const { project, updateProjectState } = useCodeEditorContext();
    const tabs: Tab[] = (project?.tabs || []);

    return (<>
        <div className="tool-bar background-bars">
            <div style={{ width: "90px" }}>
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    to="/projects"
                    className=" btn btn-open-menu-tab outline-none"
                />
                <hr className="hr hr-vertical" />
                <TabButton
                    id="tabPropriedades"
                    title="Propriedades do projeto"
                    className=" btn-open-properties-tab"
                    onClick={() => setIsOpenModalProps(true)}
                />
            </div>
            <hr className="hr hr-vertical" />
            <TabsManager
                tabs={project.openWindows || []}
                onChange={windowId => {
                    if (project.projectConfigs.id) {
                        updateProjectState(ProjectsStorage.selectWindowById(project, windowId));
                    }
                }}
                onCloseWindowTab={windowId => {
                    if (project.projectConfigs.id) {
                        updateProjectState(ProjectsStorage.removeWindowById(project, windowId));
                    }
                }}
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabGroup>
                    {tabs.map((tab: Tab, index) => {
                        return (
                            <TabButton
                                id={tab.configs.name}
                                key={tab.configs.name}
                                content={tab.configs.label}
                                title={tab.configs.description}
                                isSelected={tab.configs.isEditing}
                                className="btn-open-routers-tab flex1"
                                onClick={() => {
                                    project.tabs.forEach(currentTab => currentTab.configs.isEditing = false);
                                    project.tabs[index].configs.isEditing = true;
                                    updateProjectState(project)
                                }}
                                onFocus={() => {
                                    project.tabs.forEach(currentTab => currentTab.configs.isEditing = false);
                                    project.tabs[index].configs.isEditing = true;
                                    updateProjectState(project)
                                }}
                            />
                        );
                    })}
                </TabGroup>
            </div>
        </div>
        <Modal
            initialHeight={500}
            title={"Properties"}
            isOpen={isOpenModalProps}
            primaryButtomText={"Done"}
            children={<PropertiesTab />}
            secondaryButtomText={"Close"}
            onClickPrimary={() => setIsOpenModalProps(false)}
            onClickSecondary={() => setIsOpenModalProps(false)}
            onClose={(value) => { setIsOpenModalProps(false); return true; }}
        />
    </>);
});
