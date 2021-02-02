import React, { useState, memo, useCallback } from 'react';

import { ProjectTypeList, EProjectType } from '../../shared/enuns';

interface CardItemProps {
    onCancel?(): void;
    onSave(item: {
        name: string;
        version: string;
        type: EProjectType;
        description: string;
    }): void;
}
export const CardNewProject = memo(({ onSave, onCancel }: CardItemProps) => {
    const [item, setItem] = useState({
        name: '',
        version: '',
        description: '',
        type: EProjectType.api,
    });

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(item);
    }, [onSave, item]);

    return (
        <div className="margin-right-m margin-bottom-m border-radius padding-s flex-column input-border background-bars" style={{ width: 300 }}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="margin-top-s">
                    <div className="flex3 flex-column margin-right-s">
                        <label htmlFor="input_name">Name</label>
                        <input
                            required
                            minLength={3}
                            id="input_name"
                            autoFocus={true}
                            value={item.name}
                            onChange={e => setItem({ ...item, name: e.target.value })}
                        />
                    </div>
                    <div className="flex1 flex-column" style={{ width: 50 }}>
                        <label htmlFor="input_version">Version</label>
                        <input
                            type="number"
                            id="input_version"
                            placeholder="0.0.0"
                            value={item.version}
                            onChange={e => setItem({ ...item, version: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex-column margin-top-s">
                    <label htmlFor="input_description">Description</label>
                    <textarea
                        id="input_description"
                        value={item.description}
                        style={{ resize: 'none' }}
                        onChange={e => setItem({ ...item, description: e.target.value })}
                    />
                </div>
                <div className="flex-column margin-top-s">
                    <label htmlFor="input_type">Project type</label>
                    <select required id="input_type" value={item.type} onChange={e => setItem({ ...item, type: e.currentTarget.value as any })}>
                        {ProjectTypeList.map(item => <option key={item.name} value={item.type}>{item.name}</option>)}
                    </select>
                </div>
                <div className="margin-top-m" style={{ justifyContent: 'flex-end' }}>
                    <button
                        type="reset"
                        onClick={onCancel}
                        className="border-none hover focus active cursor-pointer padding-sm text-white padding-left-m padding-right-m background-transparent margin-right-s border-radius outline-none"
                    >Cancel</button>
                    <button
                        type="submit"
                        className="border-none hover focus active cursor-pointer padding-sm text-white padding-left-m padding-right-m border-radius outline-none background-primary"
                    >Save</button>
                </div>
            </form>
        </div>
    );
});
