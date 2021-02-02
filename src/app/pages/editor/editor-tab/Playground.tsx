import React, { memo } from 'react';

import { TwoColumnsResizable, TwoRowsResizable, OutputPanel } from '../../../shared/components';
import { PropertiesEditorController } from './PropertiesEditor.Controller';
import { TreeManagerController } from './TreeManager.Controller';
import { FlowEditorController } from './FlowEditor.Controller';

export const Playground: React.FC = memo(() => {
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
                                // problems={[]}
                                // output={[]}
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
});
