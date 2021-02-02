import React, { memo, useCallback } from 'react';
import { IconStar } from 'code-easy-components';

import { EProjectType } from '../../shared/enuns';
import { openContextMenu } from '../../shared/services';

interface CardItemProps {
    onClick(): void;
    onCancel?(): void;
    listMode?: boolean;
    onDelete?(id: string): void;
    item: {
        icon?: any;
        id: string;
        name: string;
        version: string;
        type: EProjectType;
        lastUpdate?: string;
        description: string;
    }
}
export const CardItem = memo(({ listMode, item, onClick, onCancel, onDelete }: CardItemProps) => {

    const contextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        openContextMenu(e.pageX, e.pageY, [
            {
                label: 'Delete',
                useConfirmation: true,
                action: () => onDelete ? onDelete(item.id) : {},
            }
        ]);
    }, [item.id, onDelete]);

    return (
        <div
            tabIndex={0}
            onClick={onClick}
            title={item.description}
            onContextMenu={contextMenu}
            className={`${!listMode && "margin-right-m"} margin-bottom-m border-radius-soft btn background-transparent padding-none flex-column outline-none input-border`}
            style={{
                border: 'var(--input-border)',
                width: listMode ? 'auto' : 200,
                height: 'fit-content',
                maxWidth: 400,
            }}
        >
            {!listMode &&
                <>
                    <div className="flex1 padding-m" style={{ alignSelf: 'center' }}>
                        <img height="50" src={item.icon || IconStar} alt="Placeholder" />
                    </div>
                    <hr className="hr margin-bottom-s margin-top-s" style={{ backgroundColor: 'var(--main-background-highlighted)' }} />
                </>
            }
            <div className="flex-column">
                <div className="padding-s text-ellipsis">{item.name}</div>
                <div className="padding-s font-size-s flex-column" style={{ alignItems: 'center' }}>
                    <div className="flex-space-between full-width margin-top-s font-size-m">
                        <div style={{ whiteSpace: 'nowrap' }}>v. {item.version}</div>
                        <div style={{ whiteSpace: 'nowrap' }}>{item.lastUpdate}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});
