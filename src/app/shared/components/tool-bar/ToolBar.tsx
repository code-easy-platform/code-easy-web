import React, { useState, memo, useEffect, useCallback } from 'react';
import { VscHome, VscChevronDown, VscSaveAll, VscCheck } from 'react-icons/vsc';
import { transform, useObserverValue } from 'react-observing';
import { useHistory } from 'react-router-dom';

import { PropertiesTab } from '../../../pages/editor/properties-tab/PropertiesTab';
import { flowItemsStore, tabListStore } from '../../stores';
import { DownloadService, openContextMenu, ProjectsStorage } from '../../services';
import { useEditorContext } from '../../hooks';
import { TabButtonSimple } from '../tabs';
import { TabList } from '../tab-list';
import { Modal } from '../modal';
import './ToolBar.css';

export const ToolBar: React.FC = memo(() => {
    const [isOpenModalProps, setIsOpenModalProps] = useState(false);
    const tabList = useObserverValue(tabListStore.tabs);
    const [isSaved, setIsSaved] = useState(false);
    const { tabs, project } = useEditorContext();
    const history = useHistory();

    // Add event listener to Crtl + s
    useEffect(() => {
        const handleOnSave = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                setIsSaved(true);

                if (!isSaved) {
                    ProjectsStorage.setProjectById(project);
                }
            }
        };
        window.addEventListener('keydown', handleOnSave);
        return () => window.removeEventListener('keydown', handleOnSave)
    }, [project, isSaved]);

    // IsSaved timeout 
    useEffect(() => {
        if (isSaved) {
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        }
    }, [isSaved]);

    // Clear opened tabs
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

    const handleExport = useCallback(() => {
        DownloadService.downloadFilesAsZip([{ name: 'src', isFolder: true, children: [] }]);
    }, []);

    const openMoreOption = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        openContextMenu(e.clientX, 35, [
            {
                label: 'Properties',
                action: () => setIsOpenModalProps(true)
            },
            {
                action: handleExport,
                icon: <VscChevronDown />,
                label: 'Export JS source code',
            },
        ]);
    }, [handleExport]);

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
                    role="button-save"
                    className={"btn outline-none"}
                    title="Save project (Ctrl + s)"
                    onClick={() => {
                        ProjectsStorage.setProjectById(project);
                        setIsSaved(true);
                    }}
                >
                    {isSaved
                        ? <VscCheck className="padding-horizontal-s fade-in" style={{ height: 20, width: 20 }} />
                        : <VscSaveAll className="padding-horizontal-s fade-in" style={{ height: 20, width: 20 }} />
                    }
                </TabButtonSimple>
                <hr className="hr hr-vertical" />
                <TabButtonSimple
                    title="More options"
                    role="tab-more-options"
                    onClick={openMoreOption}
                    className="btn outline-none"
                >
                    <VscChevronDown className="padding-horizontal-s" style={{ height: 20, width: 20 }} />
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
            initialWidth={720}
            initialHeight={470}
            title={"Properties"}
            allowMaximize={false}
            isOpen={isOpenModalProps}
            children={<PropertiesTab />}
            onClose={() => setIsOpenModalProps(false)}
        />
    </>);
});
