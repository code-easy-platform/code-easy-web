import React, { useContext } from 'react';

import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import './PropertiesTab.css';

export const PropertiesTab = () => {
    const codeEditorContext = useContext(CodeEditorContext);

    return (
        <div className='background-panels flex1 flex-column tab-properties'>
            <div className='tab-properties-container flex-column'>
                <header className='main-header'>Propriedades do projeto</header>
                <hr className='hr hr-white divider' />

                <div className='flex-column margin-top-s'>
                    <label htmlFor='project-name'>Name</label>
                    <input
                        value={codeEditorContext.project.projectConfigs.label}
                        className='input-medium'
                        id='project-name'
                        type='text'
                        onChange={(e) => {
                            codeEditorContext.project.projectConfigs.label = e.target.value;
                            codeEditorContext.updateProjectState(codeEditorContext.project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-description'>Description</label>
                    <input
                        value={codeEditorContext.project.projectConfigs.description}
                        id='project-description'
                        className='input-medium'
                        type='text'
                        onChange={(e) => {
                            codeEditorContext.project.projectConfigs.description = e.target.value;
                            codeEditorContext.updateProjectState(codeEditorContext.project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-author-name'>Author name</label>
                    <input
                        value={codeEditorContext.project.projectConfigs.autor}
                        id='project-author-name'
                        className='input-medium'
                        type='text'
                        onChange={(e) => {
                            codeEditorContext.project.projectConfigs.autor = e.target.value;
                            codeEditorContext.updateProjectState(codeEditorContext.project);
                        }}
                    />
                </div>

                <div className='flex-column margin-top-m'>
                    <label htmlFor='project-version'>Version</label>
                    <input
                        value={codeEditorContext.project.projectConfigs.version}
                        className='input-medium'
                        id='project-version'
                        type='text'
                        onChange={(e) => {
                            codeEditorContext.project.projectConfigs.version = e.target.value;
                            codeEditorContext.updateProjectState(codeEditorContext.project);
                        }}
                    />
                </div>

                {/* <div className='flex-column margin-top-m'>
                    <label htmlFor='project-folder'>Folder</label>
                    <input value={codeEditorContext.project.projectConfigs.label} id='project-folder' className='input-medium' type='text' />
                </div> */}

            </div>
        </div>
    );
}
