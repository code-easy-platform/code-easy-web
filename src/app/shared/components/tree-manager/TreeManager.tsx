import React, { FC, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { TreeInterface } from './shared/models/TreeInterface';
import { Tree } from './shared/components/Tree';
import './TreeManager.css';

interface TreeManagerProps {
    isUseDrop?: boolean;
    isUseDrag?: boolean;
    emptyMessage?: string;
    itens: TreeInterface[];
    showEmptyMessage?: boolean;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    onKeyDown?(e: React.FocusEvent<HTMLDivElement>): void;
    onDropItem?(targetItemId: string, dropppedItemId: string, droppedItemProps: any): void;
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onExpandNode?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    onDoubleClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    style?: {
        editingItemBackgroundColor?: string,
        activeItemBackgroundColor?: string,
        hasErrorItemBackgroundColor?: string,
    }
}
export const TreeManager: FC<TreeManagerProps> = ({ itens, emptyMessage, style, showEmptyMessage, onClick, onFocus, onKeyDown, onContextMenu, onDoubleClick, onExpandNode = () => { }, onDropItem = () => { }, isUseDrag = false, isUseDrop = false }) => {

    const [clickedId, setClickedId] = useState("");
    useEffect(() => {
        setClickedId(clickedId)
    }, [clickedId]);

    const click = (id: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (!item.isDisabledSelect) {
            setClickedId(id);
        }

        if (!item.isDisabled) {
            onClick && onClick(id, item, e);
        }

    }

    // Estilização padrão
    if (style) {
        if (!style.hasErrorItemBackgroundColor) style.hasErrorItemBackgroundColor = '#ff0000';
        if (!style.activeItemBackgroundColor) style.activeItemBackgroundColor = '#1f724340';
        if (!style.editingItemBackgroundColor) style.editingItemBackgroundColor = '#1f724320';

        document.documentElement.style.setProperty('--selected-item-color', `${style.activeItemBackgroundColor}`);
        document.documentElement.style.setProperty('--editing-item-color', `${style.editingItemBackgroundColor}`);

    } else {
        style = {
            hasErrorItemBackgroundColor: '#ff0000',
            activeItemBackgroundColor: '#1f724340',
            editingItemBackgroundColor: '#1f724320',
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                tabIndex={0}
                onFocus={onFocus}
                className="tree-base"
                onKeyDown={(e: any) => onKeyDown && onKeyDown(e)}
            >
                {itens.length > 0 &&
                    itens.map((item, index) => (
                        <Tree
                            key={index}
                            item={item}
                            paddingLeft={5}
                            onClick={click}
                            style={style as any}
                            isUseDrag={isUseDrag}
                            isUseDrop={isUseDrop}
                            onDropItem={onDropItem}
                            itemIdSelected={clickedId}
                            onExpandNode={onExpandNode}
                            onContextMenu={onContextMenu}
                            onDoubleClick={onDoubleClick}
                        />
                    ))
                }
                <div onContextMenu={e => onContextMenu && onContextMenu(undefined, e)} className="empty-message" style={{ paddingBottom: showEmptyMessage ? undefined : 100 }}>
                    {((emptyMessage && itens.length === 0) || showEmptyMessage) && <div className="message">{emptyMessage}</div>}
                </div>
            </div>
        </DndProvider>
    );
}
