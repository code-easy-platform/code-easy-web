import React, { useState } from 'react';

import { TabGroup, TabButton } from '../tab-button/TabButton';
import { TreeManager } from '../tree-manager/TreeManager';

import icon_complete from './../../../assets/icons/icon-complete.png';
import icon_warning from './../../../assets/icons/icon-warning.png';
import icon_error from './../../../assets/icons/icon-error.png';
import icon_info from './../../../assets/icons/icon-info.png';

enum OutputTab {
    notifications = "Notifications",
    problems = "Problems",
    output = "Output",
}

export const OutputPanel: React.FC = () => {
    const [currTab, setCurrtab] = useState(OutputTab.output);

    return (
        <div className="flex1 background-panels flex-column">
            <div className="background-bars">
                <TabGroup className="flex-justfy-start">
                    <TabButton onClick={() => setCurrtab(OutputTab.output)} isSelected={currTab === OutputTab.output} id="output" content="Output" style={{ height: 'var(--size-xs)' }} />
                    <TabButton onClick={() => setCurrtab(OutputTab.problems)} isSelected={currTab === OutputTab.problems} id="problems" content="Problems" style={{ height: 'var(--size-xs)' }} />
                    <TabButton onClick={() => setCurrtab(OutputTab.notifications)} isSelected={currTab === OutputTab.notifications} id="notifications" content="Notifications" style={{ height: 'var(--size-xs)' }} />
                </TabGroup>
            </div>
            <hr className="hr" />
            <div className="flex1 overflow-auto">
                {currTab === OutputTab.output && <>
                    <TreeManager
                        itens={[
                            {
                                id: "0",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                nodeExpanded: false,
                                icon: icon_complete,
                                canDropList: ['ITEM'],
                                label: "Generating js optimized code.",
                            },
                            {
                                id: "1",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                nodeExpanded: false,
                                icon: icon_complete,
                                canDropList: ['ITEM'],
                                label: "Running npm install.",
                            },
                            {
                                id: "2",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                nodeExpanded: false,
                                icon: icon_complete,
                                canDropList: ['ITEM'],
                                label: "Starting node server.",
                            },
                            {
                                id: "3",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                nodeExpanded: false,
                                icon: icon_complete,
                                canDropList: ['ITEM'],
                                label: "Server is live on: http://localhost:3000/api/v1.",
                            },
                        ]}
                        onClick={() => { }}
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                    />
                </>}
                {currTab === OutputTab.problems && <>
                    <TreeManager
                        itens={[
                            {
                                id: "0",
                                childs: [],
                                type: 'ITEM',
                                icon: icon_error,
                                isSelected: false,
                                nodeExpanded: false,
                                canDropList: ['ITEM'],
                                label: "Expression is not ok.",
                            },
                            {
                                id: "1",
                                childs: [],
                                type: 'ITEM',
                                icon: icon_error,
                                isSelected: false,
                                nodeExpanded: false,
                                canDropList: ['ITEM'],
                                label: "Boolean value is required",
                            },
                            {
                                id: "3",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                icon: icon_warning,
                                nodeExpanded: false,
                                canDropList: ['ITEM'],
                                label: "Longint is not a int",
                            },
                            {
                                id: "4",
                                childs: [],
                                type: 'ITEM',
                                isSelected: false,
                                icon: icon_warning,
                                nodeExpanded: false,
                                canDropList: ['ITEM'],
                                label: "Unused variable 'newparam'.",
                            }
                        ]}
                        onClick={() => { }}
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                    />
                </>}
                {currTab === OutputTab.notifications && <>
                    <TreeManager
                        itens={[
                            {
                                id: "0",
                                childs: [],
                                type: 'ITEM',
                                icon: icon_info,
                                isSelected: false,
                                nodeExpanded: false,
                                canDropList: ['ITEM'],
                                label: "New release was successfully created!",
                            },
                        ]}
                        onClick={() => { }}
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                    />
                </>}

            </div>
        </div>
    );
}
