import React from 'react';
import { useHistory } from 'react-router-dom';

import { ProjectsStorage } from '../../../shared/services/storage/ProjectsStorage';
import { useEditorContext } from '../../../shared/contexts';

export const PropertiesTab = () => {
    const { project, setProject } = useEditorContext();
    const history = useHistory();

    return (
        <div className='flex1 flex-content-center'>
            <div className='flex-column'>
                <header className='main-header'>Propriedades do projeto</header>
                <hr className='hr hr-white divider' />

                <div className='flex-column margin-top-s'>
                    <label htmlFor='project-name'>Name</label>
                    <input
                        value={project.configurations.label}
                        className='input-medium'
                        id='project-name'
                        type='text'
                        onChange={(e) => {
                            project.configurations.label = e.target.value;
                            setProject(project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-description'>Description</label>
                    <textarea
                        value={project.configurations.description}
                        id='project-description'
                        className='input-medium'
                        style={{ resize: 'vertical', minHeight: 50, maxHeight: 100 }}
                        onChange={(e) => {
                            project.configurations.description = e.target.value;
                            setProject(project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-author-name'>Author name</label>
                    <input
                        value={project.configurations.author}
                        id='project-author-name'
                        className='input-medium'
                        type='text'
                        onChange={(e) => {
                            project.configurations.author = e.target.value;
                            setProject(project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-version'>Version</label>
                    <input
                        value={project.configurations.version}
                        className='input-medium'
                        id='project-version'
                        type='text'
                        onChange={(e) => {
                            project.configurations.version = e.target.value;
                            setProject(project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <button
                        className='btn background-transparent border-radius'
                        style={{ border: '1px solid var(--main-error-color)' }}
                        onClick={() => {
                            if (window.confirm('Really want to delete the project?')) {
                                ProjectsStorage.removeProjectById(project.configurations.id);
                                history.replace('/');
                            }
                        }}
                    >Delete project</button>
                </div>

            </div>
        </div>
    );
}
