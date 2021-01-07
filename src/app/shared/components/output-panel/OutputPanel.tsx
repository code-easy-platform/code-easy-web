import React, { useState, memo } from 'react';
import { observe } from 'react-observing';

import { TreeManager, ITreeItem } from '../external';
import { TabGroup, TabButtonSimple } from '../tabs';

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
export const OutputPanel: React.FC<OutputPanelProps> = memo(({ notification = [], output = [], problems = [] }) => {
    const [currTab, setCurrtab] = useState(OutputTab.problems);

    return (
        <div className="flex1 background-panels flex-column">
            <div className="background-bars">
                <TabGroup className="flex-justfy-start">
                    <TabButtonSimple id="problems" onClick={() => setCurrtab(OutputTab.problems)} isSelected={currTab === OutputTab.problems}>
                        Problems
                    </TabButtonSimple>
                    <TabButtonSimple onClick={() => setCurrtab(OutputTab.output)} isSelected={currTab === OutputTab.output} id="output">
                        Output
                    </TabButtonSimple>
                    <TabButtonSimple onClick={() => setCurrtab(OutputTab.notifications)} isSelected={currTab === OutputTab.notifications} id="notifications">
                        Notifications
                    </TabButtonSimple>
                </TabGroup>
            </div>
            <hr className="hr" />
            <div className="flex1 overflow-auto">
                {currTab === OutputTab.problems &&
                    <TreeManager
                        items={problems}
                        configs={{
                            isUseDrag: false,
                            isUseDrop: false,
                        }}
                    />
                }
                {currTab === OutputTab.output &&
                    <TreeManager
                        items={output}
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
                        items={/* notification ||  */[
                            {
                                description: observe("No notifications detected"),
                                label: observe("No notifications detected"),
                                isAllowedToggleNodeExpand: observe(false),
                                isDisabledDoubleClick: observe(true),
                                isDisabledSelect: observe(true),
                                isDisabledDrag: observe(true),
                                isDisabledDrop: observe(true),
                                showExpandIcon: observe(false),
                                isDisabledClick: observe(true),
                                nodeExpanded: observe(false),
                                isSelected: observe(false),
                                id: observe(undefined),
                                type: observe("ITEM"),

                                icon: observe(undefined),
                                iconSize: observe(undefined),
                                hasError: observe(undefined),
                                isEditing: observe(undefined),
                                hasWarning: observe(undefined),
                                isDisabled: observe(undefined),
                                ascendantId: observe(undefined),
                                canDropList: observe(undefined),
                                useCustomIconToExpand: observe(undefined),
                            }
                        ]}
                    />
                }
            </div>
        </div>
    );
});
