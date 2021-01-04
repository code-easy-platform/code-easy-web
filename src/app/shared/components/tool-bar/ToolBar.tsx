import React, { useState, memo } from 'react';
import { set, transform, useObserverValue } from 'react-observing';
import { VscHome, VscSymbolProperty } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { useEditorContext, useWindows } from '../../hooks';
import { TabButtonSimple, TabsManager } from '../tabs';
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
                <TabButtonSimple
                    title="Menu"
                    role="tab-menu"
                    className="btn outline-none"
                    onClick={() => history.push('/projects')}
                >
                    <VscHome style={{ height: 25, width: 25 }} />
                </TabButtonSimple>
                <hr className="hr hr-vertical" />
                <TabButtonSimple
                    role="tab-propriedades"
                    title="Project properties"
                    className="btn outline-none"
                    onClick={() => setIsOpenModalProps(true)}
                >
                    <VscSymbolProperty className="padding-horizontal-s" style={{ height: 20, width: 20 }} />
                </TabButtonSimple>
            </div>
            <hr className="hr hr-vertical" />
            <TabsManager
                tabs={windows}
                onCloseWindowTab={windowId => {
                    windows.forEach(window => set(window.isSelected, window.id.value === windowId));
                }}
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabsManager
                    useClose={false}
                    tabs={tabs.map(tab => ({
                        icon: tab.icon,
                        title: tab.label,
                        hasError: tab.hasError,
                        isSelected: tab.isEditing,
                        hasWarning: tab.hasWarning,
                        description: tab.description,
                        id: transform(tab.id, value => String(value), value => String(value)),
                    }))}
                />
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
