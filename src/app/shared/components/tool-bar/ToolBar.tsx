import React, { useState, memo } from 'react';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { TabButton, TabGroup, TabsManager } from '../tabs';
import { useEditorContext } from '../../contexts';
import { AssetsService } from '../../services';
import { Tab } from '../../models';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const { project, setProject, getIconByItemId } = useEditorContext();
    const tabs: Tab[] = (project?.tabs || []);

    return (<>
        <div className="tool-bar background-bars">
            <div style={{ width: "90px" }}>
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    to="/projects"
                    className=" btn background-transparent btn-open-menu-tab outline-none"
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
                tabs={
                    project.getWindows().map(tab => ({
                        ...tab,
                        icon: getIconByItemId(tab.id)
                    }))
                }
                onChange={windowId => {
                    if (project.configurations.id) {

                        project.selectWindowById(windowId);

                        setProject(project);
                    }
                }}
                onCloseWindowTab={windowId => {
                    if (project.configurations.id) {

                        project.removeWindowById(windowId);

                        setProject(project);
                    }
                }}
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabGroup>
                    {tabs.map((tab: Tab, index) => {
                        return (
                            <TabButton
                                id={tab.name}
                                key={tab.name}
                                content={<>
                                    <img height="90%" className="padding-right-s" src={AssetsService.getIcon(tab.type)} alt={tab.type} />
                                    {tab.label}
                                </>}
                                title={tab.description}
                                isSelected={tab.isEditing}
                                className="btn-open-routers-tab flex1 padding-horizontal-sm"
                                onClick={() => {
                                    project.tabs.forEach(currentTab => currentTab.isEditing = false);
                                    project.tabs[index].isEditing = true;
                                    setProject(project)
                                }}
                                onFocus={() => {
                                    project.tabs.forEach(currentTab => currentTab.isEditing = false);
                                    project.tabs[index].isEditing = true;
                                    setProject(project)
                                }}
                            />
                        );
                    })}
                </TabGroup>
            </div>
        </div>
        <Modal
            initialWidth={850}
            initialHeight={640}
            title={"Properties"}
            allowMaximize={false}
            isOpen={isOpenModalProps}
            children={<PropertiesTab />}
            onClose={() => { setIsOpenModalProps(false); }}
        />
    </>);
});
