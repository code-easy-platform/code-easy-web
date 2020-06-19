import React, { useState } from "react";

import { IdeConfigStorage, FlowBackgroundType } from "../../shared/services/storage/IdeConfigStorage";
import { Modal } from "../../shared/components/modal/Modal";


export const IdeConfigs: React.FC<{ open: boolean, close(): void }> = ({ open, close }) => {
    const ideConfigStorage = new IdeConfigStorage();

    const [configs, setConfigs] = useState(ideConfigStorage.getConfigs());

    const handleSnapGrid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfigs({ ...configs, snapGridWhileDragging: !configs.snapGridWhileDragging });
    }

    const handleBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConfigs({ ...configs, flowBackgroundType: e.target.value as any });
    }

    const save = () => {
        ideConfigStorage.setConfigs(configs);
        close();
    }

    return (
        <Modal
            onClose={() => { close(); return true }}
            allowBackdropClick={false}
            onCancel={() => close()}
            title={"Configurações"}
            onSave={save}
            isOpen={open}
            children={<>
                <div className="margin-top-s padding-m box-shadow-small background-panels border-radius flex-column">
                    <div className="flex-column">
                        <label htmlFor="select">Background type</label>
                        <select id={"select"} onChange={handleBackground} value={configs.flowBackgroundType} className="margin-top-s" style={{ maxWidth: 200 }}>
                            <option value={FlowBackgroundType.checkered}>Checkered</option>
                            <option value={FlowBackgroundType.dotted}>Dotted</option>
                            <option value={FlowBackgroundType.none}>None</option>
                        </select>
                    </div>
                    <div className="margin-top-s">
                        <input id="snapGrid" type="checkbox" className="padding-xs margin-right-s" checked={configs.snapGridWhileDragging} onChange={handleSnapGrid} />
                        <label htmlFor="snapGrid" >Snap grid while dragging</label>
                    </div>
                </div>
            </>}
        />
    );
}
