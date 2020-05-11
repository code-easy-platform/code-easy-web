import React, { useState } from 'react';

import { TreeInterface } from '../tree-manager/shared/models/TreeInterface';
import { TabGroup, TabButton } from '../tab-button/TabButton';
import { TreeManager } from '../tree-manager/TreeManager';
import { NewsMD } from './NewsMD/NewsMD';

enum OutputTab {
    notifications = "Notifications",
    whatsnew = "Whatsnew",
    problems = "Problems",
    output = "Output",
    figma = "Figma",
}

interface OutputPanelProps {
    notification?: TreeInterface[];
    problems?: TreeInterface[];
    output?: TreeInterface[];
}
export const OutputPanel: React.FC<OutputPanelProps> = ({ notification, output, problems }) => {
    const [currTab, setCurrtab] = useState(OutputTab.problems);

    return (
        <div className="flex1 background-panels flex-column">
            <div className="background-bars">
                <TabGroup className="flex-justfy-start">
                    <TabButton onClick={() => setCurrtab(OutputTab.problems)} isSelected={currTab === OutputTab.problems} id="problems" content="Problems" style={{ height: 'var(--size-xs)' }} />
                    <TabButton onClick={() => setCurrtab(OutputTab.output)} isSelected={currTab === OutputTab.output} id="output" content="Output" style={{ height: 'var(--size-xs)' }} />
                    <TabButton onClick={() => setCurrtab(OutputTab.notifications)} isSelected={currTab === OutputTab.notifications} id="notifications" content="Notifications" style={{ height: 'var(--size-xs)' }} />
                    <div className="full-width" />
                    <TabButton onClick={() => setCurrtab(OutputTab.whatsnew)} isSelected={currTab === OutputTab.whatsnew} id="news" content="News" style={{ height: 'var(--size-xs)' }} />
                    <TabButton onClick={() => setCurrtab(OutputTab.figma)} isSelected={currTab === OutputTab.figma} id="figma" content="Figma" style={{ height: 'var(--size-xs)' }} />
                </TabGroup>
            </div>
            <hr className="hr" />
            <div className="flex1 overflow-auto">
                {currTab === OutputTab.problems && <>
                    <TreeManager
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                        itens={problems || []}
                        onClick={() => { }}
                    />
                </>}
                {currTab === OutputTab.output && <>
                    <TreeManager
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                        itens={output || []}
                        onClick={() => { }}
                    />
                </>}
                {currTab === OutputTab.notifications && <>
                    <TreeManager
                        itens={notification || [{
                            label: "No notifications have been detected",
                            isDisabledSelect: true,
                            nodeExpanded: false,
                            isSelected: false,
                            id: undefined,
                            type: "ITEM",
                            childs: [],
                        }]}
                        onContextMenu={() => { }}
                        onDoubleClick={() => { }}
                        onClick={() => { }}
                    />
                </>}
                {currTab === OutputTab.whatsnew && <NewsMD />}
                {currTab === OutputTab.figma && <>
                    <iframe
                        title={"IFrame figma"}
                        className={"full-width"}
                        style={{ border: 'none' }}
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNmtaptPKChB7t2nMk8LWkCxW%2FCode-Easy%3Fnode-id%3D0%253A1"
                    ></iframe>
                </>}
            </div>
        </div>
    );
}
