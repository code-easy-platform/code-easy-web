import React, { useState, useEffect } from 'react';

import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { Modal } from '../../shared/components';
import { Project } from '../../shared/models';
import { CardItem } from './CardItem';

export const ImportProjects = ({ open, close }: { open: boolean, close: Function }) => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectRecognized, setProjectsRecognized] = useState(false);
    const [openImportProjects, setOpenImportProjects] = useState(open);
    useEffect(() => {
        setOpenImportProjects(open);
    }, [open]);

    const onChangeFile = (e: any) => {
        /* const file = new FileReader();

        file.onload = (e: any) => {
            const projs = Project.parseProjects(e.target.result);

            // Valida se o conteúdo se é uma lista.
            if (projs.length === 0) {
                window.alert("File was not recognized!");
                setProjectsRecognized(false);
                setProjects([]);
            } else {
                let isProjetcs = true;

                projs.forEach((proj: Project) => {
                    isProjetcs = (
                        proj.configurations !== undefined &&
                        proj.configurations.name !== undefined &&
                        proj.configurations.id !== undefined &&
                        proj.configurations.type !== undefined &&
                        proj.tabs !== undefined
                    );
                });

                if (isProjetcs) {
                    setProjects(projs);
                    setProjectsRecognized(true);
                } else {
                    window.alert("File was not recognized!");
                    setProjectsRecognized(false);
                    setProjects([]);
                }
            }
        };

        // Lê o conteúdo contido no arquivo
        if (e.target.files[0]) {
            file.readAsText(e.target.files[0]);
        } else {
            setProjects([]);
        } */
    }

    const importProjects = () => {
        ProjectsStorage.setProjects(projects);
        window.alert("Projects imported successfully...");
        setProjectsRecognized(false);
        setProjects([]);
        close();
    }

    return (
        <Modal
            key="ImportAFile"
            onClose={() => close()}
            allowBackdropClick={false}
            isOpen={openImportProjects}
            title={"Import your projects"}
        >
            <div className={`flex-column flex1 flex-items-center${!projectRecognized ? ' flex-content-center' : ''}`}>
                <div className={`${projectRecognized ? 'margin-top-m' : ''}`}>
                    <input
                        type="file"
                        accept=".json"
                        onChange={onChangeFile}
                    />
                    {projectRecognized &&
                        <button
                            onClick={importProjects}
                            className="padding-horizontal-m margin-left-s cursor-pointer background-primary border-default text-white border-radius-soft outline-none hover active"
                        >Import</button>
                    }
                </div>
                {projectRecognized &&
                    <div className="margin-top-s padding-s flex-wrap overflow-auto flex-content-center">
                        {projects.map(project => (
                            <CardItem
                                item={{
                                    id: project.id.value || '',
                                    name: project.label.value,
                                    type: project.type.value,
                                    version: project.version.value,
                                    description: project.description.value || '',
                                }}
                                onClick={() => { }}
                                key={project.id.value}
                            />
                        ))}
                    </div>
                }
            </div>
        </Modal>
    );
}
