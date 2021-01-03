import React, { useState, memo } from 'react';
import { set, useObserverValue } from 'react-observing';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { TabButton, TabGroup, TabsManager } from '../tabs';
import { useEditorContext } from '../../contexts';
import { AssetsService } from '../../services';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);

    return (<>
        <div className="tool-bar background-bars">
            <div style={{ width: "90px" }}>
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    to="/projects"
                    className="btn background-transparent btn-open-menu-tab outline-none"
                />
                <hr className="hr hr-vertical" />
                <TabButton
                    id="tabPropriedades"
                    title="Propriedades do projeto"
                    className="btn-open-properties-tab"
                    onClick={() => setIsOpenModalProps(true)}
                />
            </div>
            <hr className="hr hr-vertical" />
            <TabsManager
                tabs={[]}
            /* tabs={
                project.getWindows().map(tab => ({
                    ...tab,
                    icon: getIconByItemId(tab.id)
                }))
            }
            onChange={windowId => {
                if (project.configurations.id && project.windows.find(windowTab => windowTab.isSelected)?.id !== windowId) {
                    project.selectWindowById(windowId);
                    setProject(project);
                }
            }}
            onCloseWindowTab={windowId => {
                if (project.configurations.id) {

                    project.removeWindowById(windowId);

                    setProject(project);
                }
            }} */
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabGroup>
                    {tabs.map((tab, index) => {
                        return (
                            <TabButton
                                key={tab.name.value}
                                id={String(tab.id.value)}
                                hasError={tab.hasError.value}
                                title={tab.description.value}
                                isSelected={tab.isEditing.value}
                                hasWarning={tab.hasWarning.value}
                                className="btn-open-routers-tab flex1 padding-horizontal-sm"
                                content={<>
                                    <img height="90%" className="padding-right-s no-draggable" src={AssetsService.getIcon(tab.type)} alt={tab.type.value} />
                                    {tab.label.value}
                                </>}
                                onClick={() => {
                                    if (!tabs[index].isEditing) {
                                        tabs.forEach(currentTab => currentTab.isEditing.value = false);
                                        set(tabs[index].isEditing, true);
                                    }
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
