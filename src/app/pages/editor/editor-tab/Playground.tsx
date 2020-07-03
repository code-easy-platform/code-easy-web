import React, { useContext } from 'react';

import { TwoColumnsResizable } from '../../../shared/components/resizable-columns/TwoColumnsResizable';
import { TwoRowsResizable } from '../../../shared/components/resizable-columns/TwoRowsResizable';
import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { OutputPanel } from '../../../shared/components/output-panel/OutputPanel';
import { ProblemsHelper } from '../../../shared/services/helpers/ProblemsHelper';
import { OutputHelper } from '../../../shared/services/helpers/OutputHelper';
import { PropertiesEditorController } from './PropertiesEditor.Controller';
import { TreeManagerController } from './TreeManager.Controller';
import { FlowEditorController } from './FlowEditor.Controller';

export const Playground: React.FC = () => {
    return (
        <TwoColumnsResizable
            aligment={"right"}
            id={"EditorTabCenter"}
            left={
                <TwoRowsResizable
                    top={<FlowEditorController />}
                    id={"TwoRowsResizableOutput"}
                    maxBottomHeight={"99%"}
                    useMinMaxHeight={true}
                    minBottomHeight={"1%"}
                    bottom={
                        <div className="flex1 z1">
                            <OutputPanel
                                problems={ProblemsHelper.getProblems(useContext(CodeEditorContext).project).problems}
                                output={OutputHelper.getOutput(useContext(CodeEditorContext).project)}
                            />
                        </div>
                    }
                />
            }
            right={
                <div className="flex1 background-panels full-width">
                    <TwoRowsResizable
                        id="EditorTabRightRows"
                        top={<TreeManagerController />}
                        bottom={<PropertiesEditorController />}
                    />
                </div>
            }
        />
    );
};
