import React, { useCallback, useMemo } from 'react';
import { useObserver, useObserverValue } from 'react-observing';
import { useHistory } from 'react-router-dom';

import { IOptionListItem, ListDetail, OptionItemContent } from '../../../shared/components';
import { useEditorContext } from '../../../shared/hooks';
import { ProjectsStorage } from '../../../shared/services';

export const PropertiesTab = () => {
    const { project } = useEditorContext();
    const history = useHistory();

    const [description, setDescription] = useObserver(project.description);
    const [version, setVersion] = useObserver(project.version);
    const [author, setAuthor] = useObserver(project.author);
    const [label, setLabel] = useObserver(project.label);
    const id = useObserverValue(project.id);

    const options: IOptionListItem[] = useMemo(() => [
        {
            title: 'Project properties',
            isSelected: true,
        },
        {
            title: 'GitHub',
            isSelected: false,
        }
    ], []);

    const handleDelete = useCallback(() => {
        if (!window.confirm('Really want to delete the project?')) return;

        ProjectsStorage.removeProjectById(id);
        history.replace('/');
    }, [history, id]);

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

                    <div className='flex-column margin-top-m'>
                        <button
                            onClick={handleDelete}
                            style={{ width: 150 }}
                            className='padding-s outline-none border-default-transparent border-radius text-uppercase text-white main-error-color cursor-pointer hover active'
                        >Delete project</button>
                    </div>
                </div>
            </OptionItemContent>
            <OptionItemContent>
                Comming soon!
            </OptionItemContent>
        </ListDetail>
    );
}
