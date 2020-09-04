import React from "react";

import { FlowBackgroundType } from "../../shared/services/storage/IdeConfigStorage";
import { Modal } from "../../shared/components/modal/Modal";
import { useIdeConfigs } from "../../shared/contexts";


export const IdeConfigs: React.FC<{ open: boolean, close(): void }> = ({ open, close }) => {
    const { flowBackgroundType, snapGridWhileDragging, setConfigs } = useIdeConfigs();

    const handleSnapGrid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfigs({ snapGridWhileDragging: !snapGridWhileDragging });
    }

    const handleBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConfigs({ flowBackgroundType: e.target.value as any });
    }

    const handleSave = () => {
        close();
    }

    return (
        <Modal
            onClose={() => { close(); return true }}
            onClickSecondary={() => close()}
            allowBackdropClick={false}
            title={"Configurações"}
            onClickPrimary={handleSave}
            isOpen={open}
            children={<>
                <div className="margin-top-s flex-column">
                    <header className="main-header">Flow editor</header>

                    <br />

                    <div className="flex-column">
                        <label htmlFor="select">Background type</label>
                        <select id={"select"} onChange={handleBackground} value={flowBackgroundType} className="margin-top-s" style={{ maxWidth: 200 }}>
                            <option value={FlowBackgroundType.checkered}>Checkered</option>
                            <option value={FlowBackgroundType.dotted}>Dotted</option>
                            <option value={FlowBackgroundType.none}>None</option>
                        </select>
                    </div>

                    <div className="margin-top-s">
                        <input id="snapGrid" type="checkbox" className="padding-xs margin-right-s" checked={snapGridWhileDragging} onChange={handleSnapGrid} />
                        <label htmlFor="snapGrid">Snap grid while dragging</label>
                    </div>

                </div>
            </>}
        />
    );
}
