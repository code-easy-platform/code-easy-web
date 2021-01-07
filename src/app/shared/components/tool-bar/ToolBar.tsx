import React, { useState, memo } from 'react';
import { observe, set, transform, useObserver } from 'react-observing';
import { VscHome, VscSymbolProperty } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { FlowItemsStore, WindowsStore } from '../../stores';
import { TabButtonSimple, TabsManager } from '../tabs';
import { useEditorContext } from '../../hooks';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const [windows, setWindows] = useObserver(WindowsStore);
    const { tabs } = useEditorContext();
    const history = useHistory();

    return (<>
        <div className="tool-bar background-bars">
            <div>
                <TabButtonSimple
                    title="Menu"
                    role="tab-menu"
                    className="btn outline-none"
                    onClick={() => history.push('/projects')}
                >
                    <VscHome className="padding-horizontal-s" style={{ height: 20, width: 20 }} />
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
                    windows.forEach((window, index, array) => {
                        if (window.id.value === windowId) {
                            set(window.isSelected, false);

                            if (array.length > 1) {
                                if (index === 0) {
                                    set(array[index + 1].isSelected, true);
                                } else {
                                    set(array[index - 1].isSelected, true);
                                }
                            }
                        }
                    });

                    setWindows(oldWindws => {
                        const newWindows = oldWindws.filter(window => window.id.value !== windowId);

                        if (newWindows.length === 0) {
                            set(FlowItemsStore, { items: observe([]) });
                        }

                        return newWindows;
                    });
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
