import React, { useState, memo } from 'react';
import { IconStar } from 'code-easy-components';

import { ContextMenuService } from '../../shared/components/context-menu/ContextMenuService';
import { ProjectTypeList, EProjectType } from '../../shared/enuns';

interface CardItemProps {
    onDelete?(id: string): void;
    onCancel?(): void;
    onClick(item: {
        icon?: any;
        id: string;
        name: string;
        version: string;
        type: EProjectType;
        description: string;
    }): void;
    isAdding?: boolean;
    item: {
        icon?: any;
        id: string;
        name: string;
        version: string;
        type: EProjectType;
        lastUpdate?: string;
        description: string;
    }
    listMode?: boolean;
}
export const CardItem = memo(({ listMode, ...props }: CardItemProps) => {
    const [item, setItem] = useState(props.item);

    const contextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        ContextMenuService.showMenu(e.pageX, e.pageY, [
            {
                label: 'Delete',
                useConfirmation: true,
                action: () => props.onDelete ? props.onDelete(props.item.id) : {},
            }
        ]);
    }

    return (
        !props.isAdding
            ? <div
                tabIndex={0}
                onContextMenu={contextMenu}
                onClick={() => props.onClick(item)}
                onKeyDown={e => (e.keyCode === 13 || e.keyCode === 32) ? props.onClick(item) : {}
                }
                className={`${!listMode && "margin-right-m"} margin-bottom-m border-radius btn background-transparent padding-none flex-column outline-none`}
                style={{
                    border: 'var(--input-border)',
                    width: listMode ? 'auto' : 200,
                    height: 'fit-content',
                    maxWidth: 400,
                }}
            >
                {!listMode && <>
                    <div className="flex1 padding-m" style={{ alignSelf: 'center' }}>
                        <img height="50" src={props.item.icon || IconStar} alt="Placeholder" />
                    </div>
                    <hr className="hr margin-bottom-s margin-top-s" style={{ backgroundColor: 'var(--main-background-highlighted)' }} />
                </>}
                <div className="flex-column">
                    <div className="padding-s text-ellipsis">{props.item.name}</div>
                    <div className="padding-s font-size-s flex-column" style={{ alignItems: 'center' }}>
                        {!listMode && <div className="flex1">{props.item.description}</div>}
                        <div className="flex-space-between full-width margin-top-s">
                            <div style={{ whiteSpace: 'nowrap' }}>v. {props.item.version}</div>
                            <div style={{ whiteSpace: 'nowrap' }}>{props.item.lastUpdate}</div>
                        </div>
                    </div>
                </div>
            </div >
            : <div className="margin-right-m margin-bottom-m border-radius padding-s flex-column" style={{ border: 'var(--input-border)', width: 300 }}>
                <div className="margin-top-s">
                    <div className="flex3 flex-column margin-right-s">
                        <label htmlFor="input_name">Name</label>
                        <input id="input_name" value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} autoFocus={true} />
                    </div>
                    <div className="flex1 flex-column" style={{ width: 50 }}>
                        <label htmlFor="input_version">Version</label>
                        <input id="input_version" value={item.version} onChange={e => setItem({ ...item, version: e.target.value })} />
                    </div>
                </div>
                <div className="flex-column margin-top-s">
                    <label htmlFor="input_description">Description</label>
                    <textarea id="input_description" className="flex1" style={{ resize: 'none' }} value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} />
                </div>
                <div className="flex-column margin-top-s">
                    <label htmlFor="input_type">Project type</label>
                    <select id="input_type" value={item.type} onChange={e => setItem({ ...item, type: e.currentTarget.value as any })}>
                        {ProjectTypeList.map(item => <option key={item.name} value={item.type}>{item.name}</option>)}
                    </select>
                </div>
                <div className="margin-top-m" style={{ justifyContent: 'flex-end' }}>
                    <button
                        onClick={props.onCancel}
                        className="border-none hover focus active cursor-pointer padding-sm padding-left-m padding-right-m background-transparent margin-right-s border-radius outline-none"
                    >Cancel</button>
                    <button
                        onClick={() => props.onClick(item)}
                        className="border-none hover focus active cursor-pointer padding-sm text-white padding-left-m padding-right-m border-radius outline-none background-primary"
                    >Save</button>
                </div>
            </div>
    );
});
