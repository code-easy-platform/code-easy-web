import React from 'react';
import { useObserver } from 'react-observing';

import { IOptionListItem, ListDetail, OptionItemContent } from '../../../shared/components';
import { useEditorContext } from '../../../shared/contexts';

export const PropertiesTab = () => {
    const { project } = useEditorContext();

    const [description, setDescription] = useObserver(project.description);
    const [version, setVersion] = useObserver(project.version);
    const [author, setAuthor] = useObserver(project.author);
    const [label, setLabel] = useObserver(project.label);

    const options: IOptionListItem[] = [
        {
            title: 'Project properties',
            isSelected: true,
        }
    ];

    return (
        <ListDetail menuOptions={options}>
            <OptionItemContent>
                <div className='flex-column padding-s' style={{ maxWidth: 400 }}>
                    <div className='flex-column margin-top-s'>
                        <label htmlFor='project-name'>Name</label>
                        <input
                            type='text'
                            value={label}
                            id='project-name'
                            className='input-medium'
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>

                    <div className='flex-column margin-top-m'>
                        <label htmlFor='project-description'>Description</label>
                        <textarea
                            value={description}
                            id='project-description'
                            className='input-medium'
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: 'vertical', minHeight: 50, maxHeight: 100 }}
                        />
                    </div>

                    <div className='flex-column margin-top-m'>
                        <label htmlFor='project-author-name'>Author name</label>
                        <input
                            type='text'
                            value={author}
                            id='project-author-name'
                            className='input-medium'
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className='flex-column margin-top-m'>
                        <label htmlFor='project-version'>Version</label>
                        <input
                            type='text'
                            value={version}
                            id='project-version'
                            className='input-medium'
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>

                    {/* <div className='flex-column margin-top-m'>
                        <button
                            className='btn background-transparent border-radius'
                            style={{ border: '1px solid var(--main-error-color)' }}
                            onClick={() => {
                                if (window.confirm('Really want to delete the project?')) {
                                    ProjectsStorage.removeProjectById(id);
                                    history.replace('/');
                                }
                            }}
                        >Delete project</button>
                    </div> */}
                </div>
            </OptionItemContent>
        </ListDetail>
    );
}
