import React, { useState, useEffect, useCallback } from 'react';
import { Utils, IconOpenGithub, IconDownload, IconImport, IconConfig } from 'code-easy-components';
import { useHistory } from 'react-router-dom';
import { VscHome } from 'react-icons/vsc';
import dataformat from 'dateformat';

import { BottonStatusBar, TabButtonSimple } from '../../shared/components';
import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { Project, ProjectParser } from '../../shared/models';
import { CardNewProject } from './CardNewProject';
import { ImportProjects } from './ImportFiles';
import { IdeConfigs } from './Configs';
import { CardItem } from './CardItem';


export const HomePage = () => {
    const [openImportProjects, setOpenImportProjects] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openConfig, setOpenConfig] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [filter, setFilter] = useState('');
    const history = useHistory();

    useEffect(() => {
        document.title = "Projects - Code easy";
        setProjects(ProjectsStorage.getProjects());
    }, []);

    const addNewProject = useCallback((item: any) => {
        setIsAdding(false);

        projects.push(ProjectsStorage.getNewProject(item.name, item.version, item.type, item.description));

        projects.sort((a, b) => a.label.value.localeCompare(b.label.value));

        setProjects(projects);
        ProjectsStorage.setProjects(projects);
    }, [projects]);

    return (
        <div className="main-page">
            <div className="tool-bar background-bars">
                <TabButtonSimple
                    title="Menu"
                    role="tab-menu"
                    className="btn background-transparent outline-none"
                >
                    <VscHome className="padding-horizontal-s" style={{ height: 20, width: 20 }} />
                </TabButtonSimple>
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
                                disabled
                                title={"Download your projects"}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                onClick={() => Utils.downloadFile('MyProjects', 'json', ProjectParser.stringifyProjects(projects))}
                                children={<img src={IconDownload} style={{ height: "70%" }} alt={IconOpenGithub} draggable="false" />}
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
                            {projects.sort((a, b) => Utils.compareDate(b.updatedDate.value, a.updatedDate.value)).map((card, index) => {
                                return <CardItem
                                    listMode
                                    key={index}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.id.value))}
                                    onClick={() => {
                                        ProjectsStorage.setProjectById(card);
                                        history.push(`/editor/${card.id.value}`);
                                    }}
                                    item={{
                                        type: card.type.value,
                                        name: card.label.value,
                                        id: card.id.value || '',
                                        version: card.version.value,
                                        description: card.description.value,
                                        lastUpdate: dataformat(new Date(card.updatedDate.value), "yyyy-mm-dd hh:mm"),
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
                        {isAdding && <CardNewProject
                            onSave={addNewProject}
                            onCancel={() => setIsAdding(false)}
                        />}
                        {projects
                            .filter(item => (item.label.value.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
                            .sort((a, b) => a.label.value.localeCompare(b.label.value))
                            .map((card, index) => {
                                return <CardItem
                                    key={index}
                                    onClick={() => history.push(`/editor/${card.id.value}`)}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.id.value))}
                                    item={{
                                        type: card.type.value,
                                        name: card.label.value,
                                        id: card.id.value || '',
                                        version: card.version.value,
                                        description: card.description.value,
                                        lastUpdate: dataformat(new Date(card.updatedDate.value), "yyyy-mm-dd hh:mm"),
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
        </div>
    );
}
