import React, { useState, useRef, useEffect } from 'react';

import { TwoColumnsResizable } from '../../shared/components/resizable-columns/TwoColumnsResizable';
import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { ToolBarHome } from '../../shared/components/tool-bar/ToolBar';
import { Button } from '../../shared/components/buttons/Button';
import { Storage } from '../../shared/services/LocalStorage';
import { Project } from '../../shared/interfaces/Aplication';
import { RecentOpen } from './RecentOpen';
import { CardItem } from './CardItem';

import icon_open_github from './../../assets/icons/icon-open-github.png';
import icon_download from './../../assets/icons/icon-download.png';
import icon_plugins from './../../assets/icons/icon-plugins.png';
import icon_config from './../../assets/icons/icon-config.png';
import icon_accont from './../../assets/icons/icon-accont.png';
import icon_tips from './../../assets/icons/icon-tips.png';
import icon_help from './../../assets/icons/icon-help.png';
import { Link } from 'react-router-dom';
import { ProjectType } from '../../shared/enuns/ProjectType';

export const HomePage = () => {

    const linkRef = useRef<any>(null);
    const [projects, setProjects] = useState<Project[]>(Storage.getProjects() || []);
    const [isAdding, setIsAdding] = useState(false);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        Storage.setProjects(projects);
    }, [projects]);

    document.title = "Projects - Code easy";

    const addNewProject = (item: any) => {
        setIsAdding(false);

        projects.push(Storage.getNewProject(item.name, item.version, item.type, item.description));

        projects.sort((a, b) => a.projectConfigs.label.localeCompare(b.projectConfigs.label));

        setProjects(projects);
        Storage.setProjects(projects);
    }

    return (
        <div className="main-page">
            <ToolBarHome />
            <hr className="hr" />

            <div className="full-width" style={{ height: "calc(100vh - 60px)" }}>
                <TwoColumnsResizable
                    aligment={"left"}
                    id={"TwoColumnsResizableHomepage"}
                    columnLeft={
                        <div className="flex1 background-panels flex-column">
                            <div className="flex-space-between">
                                <div>
                                    <Button
                                        icon={icon_config}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_plugins}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_accont}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                </div>
                                <div>
                                    <Button
                                        icon={icon_download}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_tips}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_help}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        title="Open on github"
                                        icon={icon_open_github}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                        onClick={() => window.open('https://github.com/code-easy-platform')}
                                    />
                                </div>
                            </div>
                            <hr className="hr" />
                            <div className="flex1 padding-s padding-top-m">
                                <RecentOpen />
                            </div>
                        </div>
                    }
                    columnRight={
                        <div className="flex1 padding-xg flex-column">
                            <div className="">
                                <header className="main-header codicon-word-wrap">My projects</header>
                            </div>
                            <div>
                                <input className="padding-m margin-top-m" onChange={e => setFilter(e.target.value)} style={{ width: '40%' }} placeholder="Type here to search ..." />
                                <button
                                    children="New project"
                                    onClick={() => setIsAdding(true)}
                                    className="btn outline-none padding-m margin-top-m margin-left-s border-radius background-highlighted"
                                />
                            </div>
                            <hr className="hr margin-bottom-s margin-top-s" style={{ backgroundColor: 'var(--main-background-highlighted)' }} />
                            <div className="flex-wrap overflow-auto">
                                {isAdding && <CardItem
                                    key={'undefined'}
                                    isAdding={true}
                                    onClick={addNewProject}
                                    onCancel={() => setIsAdding(false)}
                                    item={{ id: '', name: '', version: '', description: '', type: ProjectType.api }}
                                />}
                                {projects.filter(item => (item.projectConfigs.label.toLowerCase().indexOf(filter) >= 0)).map(card => {
                                    return <CardItem
                                        key={card.projectConfigs.id}
                                        onClick={() => {
                                            Storage.setProject(card);
                                            if (linkRef.current) { linkRef.current.click(); }
                                        }}
                                        item={{
                                            type: card.projectConfigs.type,
                                            name: card.projectConfigs.label,
                                            id: card.projectConfigs.id || '',
                                            version: card.projectConfigs.version,
                                            description: card.projectConfigs.description,
                                        }}
                                    />
                                })}
                                {(projects.length === 0 && !isAdding) && <div className="font-size-m margin-s" style={{ opacity: 0.5 }}>No itens to ahow...</div>}
                            </div>
                            <Link style={{ display: 'none' }} ref={linkRef} to="/editor" />
                        </div>
                    }
                />
            </div>

            <hr className="hr" />
            <BottonStatusBar />
        </div>);
}

