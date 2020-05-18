import React, { useState, useEffect } from 'react';

import { Storage } from './../../shared/services/LocalStorage';
import { Project } from '../../shared/interfaces/Aplication';
import { Modal } from '../../shared/components/modal/Modal';
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
            const projs = JSON.parse(e.target.result);

            // Valida se o conteúdo se é uma lista.
            if (projs.length === undefined) {
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

        file.readAsText(e.target.files[0]);
    }

    const importProjects = () => {
        Storage.setProjects(projects);
        window.alert("Projects imported successfully...")
        close();
    }

    return (
        <Modal
            key="ImportAFile"
            onSave={importProjects}
            onCancel={() => close()}
            allowBackdropClick={false}
            isOpen={openImportProjects}
            title={"Import your projects"}
            onClose={() => { close(); return true }}
            children={<>
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
            </>}
        />
    );
}
