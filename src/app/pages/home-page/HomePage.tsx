import React, { useState, useEffect, useCallback, memo } from 'react';
import { Utils, IconOpenGithub, IconDownload, IconImport, IconConfig } from 'code-easy-components';
import { useHistory } from 'react-router-dom';
import dataformat from 'dateformat';

import { BottonStatusBar, TabButton } from '../../shared/components';
import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { EProjectType } from '../../shared/enuns';
import { ImportProjects } from './ImportFiles';
import { Project } from '../../shared/models';
import { IdeConfigs } from './Configs';
import { CardItem } from './CardItem';


export const HomePage = memo(() => {
    const [projects, setProjects] = useState<Project[]>(ProjectsStorage.getProjects() || []);
    const [openImportProjects, setOpenImportProjects] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [filter, setFilter] = useState('');
    const history = useHistory();

    useEffect(() => {
        ProjectsStorage.setProjects(projects);
        document.title = "Projects - Code easy";
    }, [projects]);

    const addNewProject = useCallback((item: any) => {
        setIsAdding(false);

        projects.push(ProjectsStorage.getNewProject(item.name, item.version, item.type, item.description));

        projects.sort((a, b) => a.configurations.label.localeCompare(b.configurations.label));

        setProjects(projects);
        ProjectsStorage.setProjects(projects);
    }, [projects]);

    return (
        <div className="main-page">
            <div className="tool-bar background-bars">
                <TabButton
                    id="tabMenu"
                    title="Menu"
                    style={{ outline: 'none' }}
                    className={" btn background-transparent btn-open-menu-tab"}
                />
                <hr className="hr hr-vertical" />
            </div>
            <hr className="hr" />

            <div className="flex1 fade-in" style={{ height: "calc(100vh - 60px)" }}>
                <div className="background-panels flex-column" style={{ width: 350 }}>
                    <div className="flex-space-between">
                        <div>
                            <button
                                title={"Configurations"}
                                onClick={() => setOpenConfig(true)}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                children={<img src={IconConfig} style={{ height: "70%" }} alt={IconConfig} draggable="false" />}
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => setOpenImportProjects(true)}
                                style={{ height: 'var(--tool-bar-height)' }}
                                title={"Import a list of projects from your files"}
                                className="btn background-transparent outline-none padding-s"
                                children={<img src={IconImport} style={{ height: "70%" }} alt={IconOpenGithub} draggable="false" />}
                            />
                            <button
                                title={"Download your projects"}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                children={<img src={IconDownload} style={{ height: "70%" }} alt={IconOpenGithub} draggable="false" />}
                                onClick={() => Utils.downloadFile('MyProjects', 'json', Project.stringifyProjects(projects))}
                            />
                            <button
                                title={"Open on github"}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                onClick={() => window.open('https://github.com/code-easy-platform')}
                                children={<img src={IconOpenGithub} style={{ height: "70%" }} alt={IconOpenGithub} draggable="false" />}
                            />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="flex1 padding-s padding-top-m flex-column overflow-auto overflow-contrast">
                        <div>Recents</div>
                        <div className="flex1 padding-top-s padding-top-m flex-column">
                            {projects.sort((a, b) => Utils.compareDate(b.configurations.updatedDate, a.configurations.updatedDate)).map(card => {
                                return <CardItem
                                    listMode
                                    key={card.configurations.id}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.configurations.id))}
                                    onClick={() => {
                                        ProjectsStorage.setProjectById(card);
                                        history.push(`/editor/${card.configurations.id}`);
                                    }}
                                    item={{
                                        type: card.configurations.type,
                                        name: card.configurations.label,
                                        id: card.configurations.id || '',
                                        version: card.configurations.version,
                                        description: card.configurations.description,
                                        lastUpdate: dataformat(new Date(card.configurations.updatedDate), "yyyy-mm-dd hh:mm"),
                                    }}
                                />
                            })}
                            {projects.length === 0 && <span style={{ opacity: 0.5 }}>No recently open items to show...</span>}
                        </div>
                    </div>
                </div>
                <div className="full-width padding-xg flex-column">
                    <div>
                        <label htmlFor="projects-seach" className="main-header codicon-word-wrap">My projects</label>
                    </div>
                    <div>
                        <input id="projects-seach" className="padding-m margin-top-m" onChange={e => setFilter(e.target.value)} style={{ width: '40%' }} placeholder="Type here to search ..." />
                        <button
                            disabled={isAdding}
                            children="New project"
                            onClick={() => setIsAdding(true)}
                            className={`outline-none padding-m background-primary border-none margin-top-m margin-left-s border-radius cursor-pointer text-white hover active ${isAdding ? 'opacity-5' : ''}`}
                        />
                    </div>
                    <hr className="hr margin-bottom-s margin-top-s" style={{ backgroundColor: 'var(--main-background-highlighted)' }} />
                    <div className="flex-wrap overflow-auto">
                        {isAdding && <CardItem
                            key={'undefined'}
                            isAdding={true}
                            onClick={addNewProject}
                            onCancel={() => setIsAdding(false)}
                            item={{ id: '', name: '', version: '', description: '', type: EProjectType.api }}
                        />}
                        {projects
                            .filter(item => (item.configurations.label.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
                            .sort((a, b) => a.configurations.label.localeCompare(b.configurations.label))
                            .map(card => {
                                return <CardItem
                                    key={card.configurations.id}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.configurations.id))}
                                    onClick={() => {
                                        ProjectsStorage.setProjectById(card);
                                        history.push(`/editor/${card.configurations.id}`);
                                    }}
                                    item={{
                                        type: card.configurations.type,
                                        name: card.configurations.label,
                                        id: card.configurations.id || '',
                                        version: card.configurations.version,
                                        description: card.configurations.description,
                                        lastUpdate: dataformat(new Date(card.configurations.updatedDate), "yyyy-mm-dd hh:mm"),
                                    }}
                                />
                            })
                        }
                        {(projects.length === 0 && !isAdding) && <div className="font-size-m margin-s" style={{ opacity: 0.5 }}>No items to ahow...</div>}
                    </div>
                </div>
            </div>

            <hr className="hr" />
            <BottonStatusBar />
            <IdeConfigs open={openConfig} close={() => setOpenConfig(false)} />
            <ImportProjects
                open={openImportProjects}
                close={() => {
                    setProjects(ProjectsStorage.getProjects());
                    setOpenImportProjects(false);
                }}
            />
        </div>);
});
