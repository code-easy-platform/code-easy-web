import React, { Component } from 'react';
import { CodeEditorContext } from '../../../../shared/code-editor-context/CodeEditorContext';
import BottonStatusBar from '../../../../components/botton-status-bar/BottonStatusBar';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, XYCoord } from 'react-dnd';
import { Line } from '../../../../../../shared/components/lines/Line';
import ItemDrag, { ItemTypes } from './components/item-drag/ItemDrag';
import update from 'immutability-helper';



const styles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
}

export interface CodeEditorProps {
    connectDropTarget: ConnectDropTarget
}

export interface CodeEditorState {
    boxes: { [key: string]: { top: number; left: number; title: string } }
}

class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
    public state: CodeEditorState = {
        boxes: {
            a: { top: 20, left: 80, title: 'Drag me 1' },
            b: { top: 80, left: 20, title: 'Drag me 2' },
            c: { top: 160, left: 20, title: 'Drag me 3' },
            d: { top: 200, left: 20, title: 'Drag me 4' },
        },
    }

    public render() {
        const { connectDropTarget } = this.props;
        const { boxes } = this.state;

        return connectDropTarget(
            <div style={styles}>
                {Object.keys(boxes).map(key => {
                    const { left, top, title } = boxes[key]
                    return <ItemDrag key={key} id={key} left={left} top={top}>{title}</ItemDrag>;
                })}
            </div>,
        )
    }

    public moveBox(id: string, left: number, top: number) {
        this.setState(
            update(this.state, {
                boxes: {
                    [id]: {
                        $merge: { left, top },
                    },
                },
            }),
        )
    }
}

export default DropTarget(
    ItemTypes.BOX,
    {
        drop(
            props: CodeEditorProps,
            monitor: DropTargetMonitor,
            component: CodeEditor | null,
        ) {
            if (!component) {
                return
            }
            const item = monitor.getItem()
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)

            component.moveBox(item.id, left, top)
        },
    },
    (connect: any) => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(CodeEditor)
