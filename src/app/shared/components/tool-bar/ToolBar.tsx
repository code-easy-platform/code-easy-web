import React, { useState, memo } from 'react';
import { VscHome, VscSymbolProperty } from 'react-icons/vsc';
import { set, useObserverValue } from 'react-observing';
import { useHistory } from 'react-router-dom';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { TabButton, TabGroup, TabsManager } from '../tabs';
import { useEditorContext, useWindows } from '../../hooks';
import { AssetsService } from '../../services';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const history = useHistory();

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);
    const windows = useWindows();

    return (<>
        <div className="tool-bar background-bars">
            <div>
                <TabButton
                    title="Menu"
                    role="tab-menu"
                    className="btn outline-none"
                    onClick={() => history.push('/projects')}
                >
                    <VscHome style={{ height: 25, width: 25 }} />
                </TabButton>
                <hr className="hr hr-vertical" />
                <TabButton
                    role="tab-propriedades"
                    title="Project properties"
                    className="btn outline-none"
                    onClick={() => setIsOpenModalProps(true)}
                >
                    <VscSymbolProperty className="padding-horizontal-s" style={{ height: 20, width: 20 }} />
                </TabButton>
            </div>
            <hr className="hr hr-vertical" />
            <TabsManager
                tabs={windows}
                /*onChange={windowId => {
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
                                onClick={() => {
                                    if (!tabs[index].isEditing.value) {
                                        tabs.forEach(currentTab => currentTab.isEditing.value = false);
                                        set(tabs[index].isEditing, true);
                                    }
                                }}
                            >
                                <img height="90%" className="padding-right-s no-draggable" src={AssetsService.getIcon(tab.type)} alt={tab.type.value} />
                                {tab.label.value}
                            </TabButton>
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
