import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Utils, IconOpenGithub, IconDownload, IconImport, IconConfig } from 'code-easy-components';
import dataformat from 'dateformat';

import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { TabButton } from '../../shared/components/tab-button/TabButton';
import { Button } from '../../shared/components/buttons/Button';
import { Project } from '../../shared/interfaces/Aplication';
import { ProjectType } from '../../shared/enuns/ProjectType';
import { ImportProjects } from './ImportFiles';
import { IdeConfigs } from './Configs';
import { CardItem } from './CardItem';


export const HomePage = () => {

    const [projects, setProjects] = useState<Project[]>(ProjectsStorage.getProjects() || []);
    const [openImportProjects, setOpenImportProjects] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [filter, setFilter] = useState('');
    const history = useHistory();

    useEffect(() => {
        ProjectsStorage.setProjects(projects);
    }, [projects]);

    document.title = "Projects - Code easy";

    const addNewProject = (item: any) => {
        setIsAdding(false);

        projects.push(ProjectsStorage.getNewProject(item.name, item.version, item.type, item.description));

        projects.sort((a, b) => a.projectConfigs.label.localeCompare(b.projectConfigs.label));

        setProjects(projects);
        ProjectsStorage.setProjects(projects);
    }

    return (
        <div className="main-page fade-in">
            <div className="tool-bar background-bars">
                <div>
                    <TabButton
                        id="tabMenu"
                        title="Menu"
                        to="/projects"
                        style={{ outline: 'none' }}
                        className=" btn btn-open-menu-tab"
                    />
                    <hr className="hr hr-vertical" />
                </div>
            </div>
            <hr className="hr" />

            <div className="flex1" style={{ height: "calc(100vh - 60px)" }}>
                <div className="background-panels flex-column" style={{ width: 350 }}>
                    <div className="flex-space-between">
                        <div>
                            <Button
                                icon={IconConfig}
                                onClick={e => setOpenConfig(true)}
                                style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                            />
                            {/* <Button
                                        icon={icon_plugins}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_accont}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    /> */}
                        </div>
                        <div>
                            <Button
                                icon={IconImport}
                                title={"Import a list of projects from your files"}
                                style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                onClick={() => setOpenImportProjects(true)}
                            />
                            <Button
                                icon={IconDownload}
                                title={"Download your projects"}
                                style={{ height: 'var(--tool-bar-height)', padding: '10px' }}

                                //TODO: Download do projeto otimizado.
                                onClick={() => Utils.downloadFile('MyProjects', 'json', Project.projectsToString(projects))}
                            />
                            {/* <Button
                                        icon={icon_tips}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    />
                                    <Button
                                        icon={icon_help}
                                        style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                    /> */}
                            <Button
                                title="Open on github"
                                icon={IconOpenGithub}
                                style={{ height: 'var(--tool-bar-height)', padding: '10px' }}
                                onClick={() => window.open('https://github.com/code-easy-platform')}
                            />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="flex1 padding-s padding-top-m flex-column overflow-auto overflow-contrast">
                        <div>Recents</div>
                        <div className="flex1 padding-top-s padding-top-m flex-column">
                            {projects.sort((a, b) => Utils.compareDate(b.projectConfigs.updatedDate, a.projectConfigs.updatedDate)).map(card => {
                                return <CardItem
                                    listMode
                                    key={card.projectConfigs.id}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.projectConfigs.id))}
                                    onClick={() => {
                                        ProjectsStorage.setProjectById(card);
                                        history.push(`/editor/${card.projectConfigs.id}`);
                                    }}
                                    item={{
                                        type: card.projectConfigs.type,
                                        name: card.projectConfigs.label,
                                        id: card.projectConfigs.id || '',
                                        version: card.projectConfigs.version,
                                        description: card.projectConfigs.description,
                                        lastUpdate: dataformat(new Date(card.projectConfigs.updatedDate), "yyyy-mm-dd hh:mm"),
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
                        {projects
                            .filter(item => (item.projectConfigs.label.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
                            .sort((a, b) => a.projectConfigs.label.localeCompare(b.projectConfigs.label))
                            .map(card => {
                                return <CardItem
                                    key={card.projectConfigs.id}
                                    onDelete={() => setProjects(ProjectsStorage.removeProjectById(card.projectConfigs.id))}
                                    onClick={() => {
                                        ProjectsStorage.setProjectById(card);
                                        history.push(`/editor/${card.projectConfigs.id}`);
                                    }}
                                    item={{
                                        type: card.projectConfigs.type,
                                        name: card.projectConfigs.label,
                                        id: card.projectConfigs.id || '',
                                        version: card.projectConfigs.version,
                                        description: card.projectConfigs.description,
                                        lastUpdate: dataformat(new Date(card.projectConfigs.updatedDate), "yyyy-mm-dd hh:mm"),
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
}
