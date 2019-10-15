import React, { Component } from 'react';
import { CodeEditorContext } from '../../../../shared/services/code-editor-context/CodeEditorContext';
// import BottonStatusBar from '../../../../components/botton-status-bar/BottonStatusBar';
import { ConnectDropTarget, DropTarget, DropTargetMonitor, XYCoord } from 'react-dnd';
import ItemDrag, { ItemTypes } from './components/item-drag/ItemDrag';
import update from 'immutability-helper';
import { Line } from '../../../../../../shared/components/lines/Line';
import FluxoList from './enuns/FluxoList';
import { Utils } from '../../../../../../shared/services/Utils';



const styles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
}

export interface CodeEditorState {
    fluxoList: FluxoList;
}

export interface CodeEditorProps {
    connectDropTarget: ConnectDropTarget
}

class CodeEditor extends Component<CodeEditorProps, CodeEditorState> {
    public state: CodeEditorState = {
        fluxoList: {
            1: { antecessorKey: "", sucessorKey: 2, isHaveSucessor: true, isHaveAntecessor: false, top: 100, left: 40, width: 80, height: 80, title: 'Drag me 1' },
            2: { antecessorKey: 1, sucessorKey: 3, isHaveSucessor: true, isHaveAntecessor: true, top: 200, left: 40, width: 80, height: 80, title: 'Drag me 2' },
            3: { antecessorKey: 2, sucessorKey: 4, isHaveSucessor: true, isHaveAntecessor: true, top: 300, left: 40, width: 80, height: 80, title: 'Drag me 3' },
            4: { antecessorKey: 3, sucessorKey: "", isHaveSucessor: false, isHaveAntecessor: true, top: 400, left: 40, width: 80, height: 80, title: 'Drag me 4' },
        },
    }

    public render() {
        const { connectDropTarget } = this.props;
        const { fluxoList } = this.state;

        return connectDropTarget(
            <div style={styles}>
                <svg style={{ width: '100%', height: '100%' }}>
                    {Object.keys(fluxoList).map(key => {
                        const { left, top, width, height, isHaveSucessor, sucessorKey } = fluxoList[key];

                        let top2: number = 0;
                        let left2: number = 0;
                        let height2: number = 0;
                        let width2: number = 0;
                        try {
                            top2 = fluxoList[sucessorKey].top;
                            left2 = fluxoList[sucessorKey].left;
                            height2 = fluxoList[sucessorKey].height;
                            width2 = fluxoList[sucessorKey].width;
                        } catch (e) { console.error("[Erro mapeado]: " + e); }

                        return (
                            isHaveSucessor
                                ? <Line
                                    top1={top + height - 15}
                                    top2={top2 - 5}

                                    left1={left + (width / 2)}
                                    left2={left2 + (width2 / 2)}

                                    color="blue"
                                />
                                : undefined
                        );
                    })}
                </svg>
                {Object.keys(fluxoList).map(key => {
                    const { left, top, title } = fluxoList[key];
                    return <ItemDrag key={key} id={key} left={left} top={top} title={title}>{title}</ItemDrag>;
                })}
            </div>,
        )
    }

    public moveBox(id: string, left: number, top: number, title: string) {
        this.setState(
            update(this.state, {
                fluxoList: {
                    [id]: {
                        $merge: { left, top, title },
                    },
                },
            }),
        )
    }
}
CodeEditor.contextType = CodeEditorContext;

export default DropTarget(
    ItemTypes.BOX,
    {
        drop(props: CodeEditorProps, monitor: DropTargetMonitor, component: CodeEditor | null, ) {
            if (!component) return;

            const item = monitor.getItem();
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round((item.left ? item.left : 0) + delta.x)
            const top = Math.round((item.top ? item.top : 0) + delta.y)

            if (!item.id) {
                let newKey;
                let isExistentItem;

                // Vai encontrar uma key que não estaja em uso.
                do {
                    newKey = Utils.getRandomKey(10, 1000);
                    isExistentItem = component.state.fluxoList[newKey];
                } while (isExistentItem);

                if (!isExistentItem) {
                    component.state.fluxoList[newKey] = {
                        antecessorKey: "",
                        isHaveAntecessor: false,
                        isHaveSucessor: false,
                        sucessorKey: "",
                        title: item.title + newKey,
                        width: 80,
                        height: 80,
                        left: left,
                        top: top,
                    }
                    component.setState({});

                    item.id = newKey;
                    item.title = item.title + newKey;
                }
            }
            component.moveBox(item.id, left, top, item.title);

        },
    },
    (connect: any) => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(CodeEditor)
