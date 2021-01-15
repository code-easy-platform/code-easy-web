import React, { useState, memo, useEffect, useCallback } from 'react';
import { transform, useObserverValue } from 'react-observing';
import { VscHome, VscSymbolProperty } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { flowItemsStore, tabListStore } from '../../stores';
import { openContextMenu } from '../../services';
import { useEditorContext } from '../../hooks';
import { TabButtonSimple } from '../tabs';
import { TabList } from '../tab-list';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const tabList = useObserverValue(tabListStore.tabs);
    const { tabs } = useEditorContext();
    const history = useHistory();

    useEffect(() => {
        if (tabList.length === 0) {
            flowItemsStore.clear();
        }
    }, [tabList]);

    const handleContextMenu = useCallback((tabId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        openContextMenu(e.clientX, 35, [
            {
                label: 'Close tab',
                action: () => tabListStore.closeTab(tabId)
            },
            {
                label: 'Close all',
                action: () => tabListStore.closeAll()
            },
        ]);
    }, []);

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
            <TabList
                tabs={tabList}
                isHighlighted={true}
                onContextTab={handleContextMenu}
                onCloseTab={id => tabListStore.closeTab(id)}
            />
            <hr className="hr hr-vertical" />
            <div style={{ justifyContent: "flex-end" }}>
                <TabList
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
            onClose={() => setIsOpenModalProps(false)}
        />
    </>);
});
