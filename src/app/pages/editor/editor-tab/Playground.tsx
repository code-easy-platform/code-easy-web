import React, { memo } from 'react';

import { TwoRowsResizable, OutputPanel, ResizableColumns } from '../../../shared/components';
import { PropertiesEditorController } from './PropertiesEditor.Controller';
import { TreeManagerController } from './TreeManager.Controller';
import { FlowEditorController } from './FlowEditor.Controller';

export const Playground: React.FC = memo(() => {
    return (
        <ResizableColumns>
            <TwoRowsResizable
                key={"OutputColumn"}
                minBottomHeight={"1%"}
                useMinMaxHeight={true}
                maxBottomHeight={"99%"}
                id={"TwoRowsResizableOutput"}
                top={<FlowEditorController />}
                bottom={
                    <div className="flex1 z1">
                        <OutputPanel
                        // problems={[]}
                        // output={[]}
                        />
                    </div>
                }
            />
            <div key="PropertiesEditorColumn" className="flex1 background-panels full-width">
                <TwoRowsResizable
                    id="EditorTabRightRows"
                    top={<TreeManagerController />}
                    bottom={<PropertiesEditorController />}
                />
            </div>
        </ResizableColumns>
    );
});
