import React, { useState, memo } from 'react';

import { TabGroup, TabButton } from '../tab-button/TabButton';
import { TreeManager, ITreeItem } from '../tree-manager';
import { NewsMD } from './NewsMD/NewsMD';

enum OutputTab {
    notifications = "Notifications",
    whatsnew = "Whatsnew",
    problems = "Problems",
    output = "Output",
    figma = "Figma",
}

interface OutputPanelProps {
    notification?: ITreeItem[];
    problems?: ITreeItem[];
    output?: ITreeItem[];
}
export const OutputPanel: React.FC<OutputPanelProps> = memo(({ notification, output, problems }) => {
    const [currTab, setCurrtab] = useState(OutputTab.problems);

    return (
        <div className="flex1 background-panels flex-column">
            <div className="background-bars">
                <TabGroup className="flex-justfy-start">
                    <TabButton id="problems" onClick={() => setCurrtab(OutputTab.problems)} isSelected={currTab === OutputTab.problems} content={"Problems"} />
                    <TabButton onClick={() => setCurrtab(OutputTab.output)} isSelected={currTab === OutputTab.output} id="output" content="Output" />
                    <TabButton onClick={() => setCurrtab(OutputTab.notifications)} isSelected={currTab === OutputTab.notifications} id="notifications" content="Notifications" />
                    <div className="full-width" />
                    <TabButton onClick={() => setCurrtab(OutputTab.whatsnew)} isSelected={currTab === OutputTab.whatsnew} id="news" content="News" />
                    <TabButton onClick={() => setCurrtab(OutputTab.figma)} isSelected={currTab === OutputTab.figma} id="figma" content="Figma" />
                </TabGroup>
            </div>
            <hr className="hr" />
            <div className="flex1 overflow-auto">
                {currTab === OutputTab.problems && <>
                    <TreeManager
                        items={problems || []}
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                    />
                </>}
                {currTab === OutputTab.output && <>
                    <TreeManager
                        items={output || []}
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                    />
                </>}
                {currTab === OutputTab.notifications && <>
                    <TreeManager
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                        items={notification || [{
                            label: "No notifications have been detected",
                            nodeExpanded: false,
                            isSelected: false,
                            id: undefined,
                            type: "ITEM",
                        }]}
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
});
