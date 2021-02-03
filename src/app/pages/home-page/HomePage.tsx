import React, { useState, useEffect, useCallback } from 'react';
import { VscHome, VscSettingsGear, VscCloudDownload, VscCloudUpload, VscGithub } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';
import { Utils } from 'code-easy-components';
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
        ProjectsStorage.getProjects().then(storedProjects => {
            setProjects(storedProjects);
        })
    }, []);

    const handleAddNewProject = useCallback(async (item: any) => {
        const newProject = ProjectsStorage.getNewProject(item.name, item.version, item.type, item.description);
        projects.push(newProject);

        await ProjectsStorage.setProjects(projects);

        history.push(`/editor/${newProject.id.value}`);
    }, [projects, history]);

    const handleRemoveProject = useCallback((projectId: string | undefined) => {
        if (!projectId) return;

        ProjectsStorage.removeProjectById(projectId).then(newProjects => {
            setProjects(newProjects);
        });
    }, []);

    return (
        <div className="flex-column">
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

            <div className="flex1 fade-in" style={{ height: "calc(100vh - (var(--tool-bar-height) + var(--status-bar-height)))" }}>
                <div className="background-panels flex-column" style={{ width: 350 }}>
                    <div className="flex-space-between">
                        <div>
                            <button
                                title={"Configurations"}
                                onClick={() => setOpenConfig(true)}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                children={<VscSettingsGear className="padding-horizontal-s" style={{ height: 15, width: 15 }} />}
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => setOpenImportProjects(true)}
                                style={{ height: 'var(--tool-bar-height)' }}
                                title={"Import a list of projects from your files"}
                                className="btn background-transparent outline-none padding-s"
                                children={<VscCloudUpload className="padding-horizontal-s" style={{ height: 15, width: 15 }} />}
                            />
                            <button
                                title={"Download your projects"}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                children={<VscCloudDownload className="padding-horizontal-s" style={{ height: 15, width: 15 }} />}
                                onClick={() => Utils.downloadFile('MyProjects', 'json', ProjectParser.stringifyProjects(projects))}
                            />
                            <button
                                title={"Open on github"}
                                style={{ height: 'var(--tool-bar-height)' }}
                                className="btn background-transparent outline-none padding-s"
                                onClick={() => window.open('https://github.com/code-easy-platform')}
                                children={<VscGithub className="padding-horizontal-s" style={{ height: 15, width: 15 }} />}
                            />
                        </div>
                    </div>
                    <hr className="hr" />
                    <nav className="flex1 padding-s padding-top-m flex-column overflow-auto overflow-contrast">
                        <header>Recents</header>
                        <main className="flex1 padding-top-s padding-top-m flex-column">
                            <ul>
                                {(projects.length === 0 && !isAdding) && (
                                    <button
                                        type="button"
                                        onClick={() => setIsAdding(true)}
                                        className="cursor-pointer hover padding-horizontal-s padding-xs background-transparent border-default text-white"
                                    >New project</button>
                                )}
                                {projects.sort((a, b) => Utils.compareDate(b.updatedDate.value, a.updatedDate.value)).map((card, index) => {
                                    return <CardItem
                                        listMode
                                        key={index}
                                        onDelete={() => handleRemoveProject(card.id.value)}
                                        onClick={() => history.push(`/editor/${card.id.value}`)}
                                        item={{
                                            type: card.type.value,
                                            name: card.label.value,
                                            id: card.id.value || '',
                                            version: card.version.value,
                                            description: card.description.value || '',
                                            lastUpdate: dataformat(new Date(card.updatedDate.value), "yyyy-mm-dd hh:mm"),
                                        }}
                                    />
                                })}
                            </ul>
                        </main>
                    </nav>
                </div>
                <div className="full-width padding-xg flex-column">
                    <section>
                        <header>
                            <label htmlFor="projects-seach" className="main-header codicon-word-wrap">My projects</label>
                        </header>
                        <main>
                            <input id="projects-seach" className="padding-m margin-top-m" onChange={e => setFilter(e.target.value)} style={{ width: '40%' }} placeholder="Type here to search ..." />
                            <button
                                disabled={isAdding}
                                children="New project"
                                onClick={() => setIsAdding(true)}
                                className={`outline-none padding-m background-primary border-none margin-top-m margin-left-s border-radius cursor-pointer text-white hover active ${isAdding ? 'opacity-5' : ''}`}
                            />
                        </main>
                    </section>
                    <hr className="hr margin-bottom-s margin-top-s" style={{ backgroundColor: 'var(--main-background-highlighted)' }} />
                    <section className="overflow-auto">
                        <ul className="display-flex flex-wrap">
                            {(projects.length === 0 && !isAdding) && <span className="margin-s opacity-5 font-size-g">No items to show...</span>}
                            {isAdding && <CardNewProject onSave={handleAddNewProject} onCancel={() => setIsAdding(false)} />}
                            {projects
                                .filter(item => (item.label.value.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
                                .sort((a, b) => a.label.value.localeCompare(b.label.value))
                                .map((card, index) => {
                                    return (
                                        <CardItem
                                            key={index}
                                            onDelete={() => handleRemoveProject(card.id.value)}
                                            onClick={() => history.push(`/editor/${card.id.value}`)}
                                            item={{
                                                type: card.type.value,
                                                name: card.label.value,
                                                id: card.id.value || '',
                                                version: card.version.value,
                                                icon: card.icon.value?.content,
                                                description: card.description.value || '',
                                                lastUpdate: dataformat(new Date(card.updatedDate.value), "yyyy-mm-dd hh:mm"),
                                            }}
                                        />
                                    );
                                })
                            }
                        </ul>
                    </section>
                </div>
            </div>

            <hr className="hr" />
            <BottonStatusBar />
            <IdeConfigs open={openConfig} close={() => setOpenConfig(false)} />
            <ImportProjects
                open={openImportProjects}
                close={() => {
                    ProjectsStorage.getProjects().then(setProjects)
                    setOpenImportProjects(false);
                }}
            />
        </div>
    );
}
