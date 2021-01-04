import React, { useState, memo } from 'react';

import { TreeManager, ITreeItem } from '../external';
import { TabGroup, TabButton } from '../tabs';

enum OutputTab {
    notifications = "Notifications",
    whatsnew = "Whatsnew",
    problems = "Problems",
    output = "Output",
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
                    <TabButton id="problems" onClick={() => setCurrtab(OutputTab.problems)} isSelected={currTab === OutputTab.problems}>
                        Problems
                    </TabButton>
                    <TabButton onClick={() => setCurrtab(OutputTab.output)} isSelected={currTab === OutputTab.output} id="output">
                        Output
                    </TabButton>
                    <TabButton onClick={() => setCurrtab(OutputTab.notifications)} isSelected={currTab === OutputTab.notifications} id="notifications">
                        Notifications
                    </TabButton>
                </TabGroup>
            </div>
            <hr className="hr" />
            <div className="flex1 overflow-auto">
                {currTab === OutputTab.problems &&
                    <TreeManager
                        items={problems || []}
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                    />
                }
                {currTab === OutputTab.output &&
                    <TreeManager
                        items={output || []}
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                    />
                }
                {currTab === OutputTab.notifications &&
                    <TreeManager
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                        items={/* notification ||  */[/* {
                            label: observe("No notifications detected"),
                            nodeExpanded: observe(false),
                            isSelected: observe(false),
                            id: observe(undefined),
                            type: observe("ITEM"),
                        } */]}
                    />
                }
            </div>
        </div>
    );
});
