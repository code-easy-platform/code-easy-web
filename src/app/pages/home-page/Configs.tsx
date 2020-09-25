import React from "react";

import { Switch } from "../../shared/components/properties-editor/shared/components/toggle-swicth/Switch";
import { FlowBackgroundType } from "../../shared/services/storage/IdeConfigStorage";
import { Modal } from "../../shared/components/modal";
import { useIdeConfigs } from "../../shared/contexts";


export const IdeConfigs: React.FC<{ open: boolean, close(): void }> = ({ open, close }) => {
    const { flowBackgroundType, snapGridWhileDragging, setConfigs } = useIdeConfigs();

    const handleSnapGrid = () => {
        setConfigs({ snapGridWhileDragging: !snapGridWhileDragging });
    }

    const handleBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConfigs({ flowBackgroundType: e.target.value as any });
    }

    return (
        <Modal
            isOpen={open}
            onClose={close}
            initialWidth={820}
            initialHeight={580}
            title={"Configurations"}
            allowBackdropClick={false}
        >
            <div className="flex1">
                <section className="flex2 padding-top-xs padding-bottom-xs background-panels">
                    <div className="hover active padding-s cursor-pointer selected">
                        Flow editor
                    </div>
                </section>
                <hr className="hr hr-vertical hr-white" />
                <section className="flex5 padding-s flex-column">
                    <div className="flex-column">
                        <label htmlFor="select">Background type</label>
                        <select id={"select"} onChange={handleBackground} value={flowBackgroundType} className="margin-top-s" style={{ maxWidth: 200 }}>
                            <option value={FlowBackgroundType.checkered}>Checkered</option>
                            <option value={FlowBackgroundType.dotted}>Dotted</option>
                            <option value={FlowBackgroundType.none}>None</option>
                        </select>
                    </div>
                    <div className="margin-top-s flex-items-center">
                        <Switch id="snapGrid" border="var(--input-border)" checked={snapGridWhileDragging} onChange={handleSnapGrid} />
                        <label htmlFor="snapGrid" className="margin-left-s">Snap grid while dragging</label>
                    </div>
                </section>
            </div>
        </Modal>
    );
}
