import React, { useState, useEffect } from 'react';

import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { Modal } from '../../shared/components/modal/Modal';
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
        const file = new FileReader();

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
                        proj.projectConfigs !== undefined &&
                        proj.projectConfigs.name !== undefined &&
                        proj.projectConfigs.id !== undefined &&
                        proj.projectConfigs.type !== undefined &&
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
        }

    }

    const importProjects = () => {
        ProjectsStorage.setProjects(projects);
        window.alert("Projects imported successfully...")
        close();
    }

    return (
        <Modal
            key="ImportAFile"
            allowBackdropClick={false}
            isOpen={openImportProjects}
            primaryButtomText={"Import"}
            secondaryButtomText={"Close"}
            title={"Import your projects"}
            onClickPrimary={importProjects}
            onClickSecondary={() => close()}
            onClose={() => { close(); return true }}
            children={<div className="flex-column">
                <input type="file" accept=".json" onChange={onChangeFile} />
                <div className="margin-top-s padding-s flex-wrap overflow-auto">
                    {!projectRecognized && "No projects recognized..."}
                    {projects.map(project => (
                        <CardItem
                            item={{
                                id: project.projectConfigs.id || '',
                                name: project.projectConfigs.label,
                                type: project.projectConfigs.type,
                                version: project.projectConfigs.version,
                                description: project.projectConfigs.description,
                            }}
                            onClick={() => { }}
                            key={project.projectConfigs.id}
                        />
                    ))}
                </div>
            </div>}
        />
    );
}
