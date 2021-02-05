import React, { memo } from 'react';

import { TwoColumnsResizable, TwoRowsResizable, OutputPanel } from '../../../shared/components';
import { PropertiesEditorController } from './PropertiesEditor.Controller';
import { TreeManagerController } from './TreeManager.Controller';
import { FlowEditorController } from './FlowEditor.Controller';

export const Playground: React.FC = memo(() => {
    return (
        <TwoColumnsResizable id="EditorTabCenter" variant="right">
            <TwoRowsResizable id="TwoRowsResizableOutput" maxBottomHeight={"99%"} useMinMaxHeight={true} minBottomHeight={10}>
                <FlowEditorController />
                <div className="flex1 z1">
                    <OutputPanel />
                </div>
            </TwoRowsResizable>
            <div className="flex1 background-panels full-width">
                <TwoRowsResizable id="EditorTabRightRows" minBottomHeight={10}>
                    <TreeManagerController />
                    <PropertiesEditorController />
                </TwoRowsResizable>
            </div>
        </TwoColumnsResizable >
    );
});
