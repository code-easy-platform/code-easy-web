import React from "react";

import { Switch } from "../../shared/components/properties-editor/shared/components/toggle-swicth/Switch";
import { FlowBackgroundType } from "../../shared/services/storage/IdeConfigStorage";
import { IOptionListItem, ListDetail, Modal, OptionItemContent } from "../../shared/components/modal";
import { useIdeConfigs } from "../../shared/contexts";


export const IdeConfigs: React.FC<{ open: boolean, close(): void }> = ({ open, close }) => {
    const { flowBackgroundType, snapGridWhileDragging, defaultPort, ideVersion, setConfigs } = useIdeConfigs();

    const handleSnapGrid = () => {
        setConfigs({ snapGridWhileDragging: !snapGridWhileDragging });
    }

    const handleBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConfigs({ flowBackgroundType: e.target.value as any });
    }

    const meuOptions: IOptionListItem[] = [
        {
            title: 'General',
            isSelected: true,
        },
        {
            title: 'Colors',
        },
        {
            title: 'Flow editor',
        },
        {
            title: 'Properties editor',
        },
        {
            title: 'About',
        }
    ];

    return (
        <Modal
            isOpen={open}
            onClose={close}
            initialWidth={820}
            initialHeight={580}
            title={"Configurations"}
            allowBackdropClick={false}
        >
            <ListDetail menuOptions={meuOptions}>
                <OptionItemContent>
                    <div className="flex-column">
                        <label htmlFor="defaultPort">Port default</label>
                        <input
                            id="defaultPort"
                            value={defaultPort}
                            placeholder="Ex: 3000"
                            className="margin-top-s"
                            style={{ maxWidth: 200 }}
                            onChange={e => setConfigs({ defaultPort: Number(e.target.value || 3000) })}
                        />
                    </div>
                </OptionItemContent>
                <OptionItemContent>
                    <div className="flex-column">
                        <label>Comming soon!!!</label>
                    </div>
                </OptionItemContent>
                <OptionItemContent>
                    <div className="flex-column">
                        <label htmlFor="select">Background type</label>
                        <select id={"select"} onChange={handleBackground} value={flowBackgroundType} className="margin-top-s" style={{ maxWidth: 200 }}>
                            <option value={FlowBackgroundType.checkered}>Checkered</option>
                            <option value={FlowBackgroundType.dotted}>Dotted</option>
                            <option value={FlowBackgroundType.none}>None</option>
                        </select>
                    </div>
                    <div className="margin-top-m flex-column">
                        <label htmlFor="snapGrid" className="">Snap grid while dragging</label>
                        <Switch id="snapGrid" border="var(--input-border)" checked={snapGridWhileDragging} onChange={handleSnapGrid} />
                    </div>
                </OptionItemContent>
                <OptionItemContent>
                    <div className="flex-column">
                        <label>Comming soon!!!</label>
                    </div>
                </OptionItemContent>
                <OptionItemContent>
                    <div className="flex-column">
                        <label>Platform version</label>
                        <p className="font-size-g margin-bottom-m">{ideVersion}</p>

                        <label>Github</label>
                        <button
                            style={{ maxWidth: 130 }}
                            onClick={() => window.open('https://github.com/code-easy-platform')}
                            className="hover active border-none border-radius-soft padding-s padding-horizontal-m outline-none background-primary text-white cursor-pointer"
                        >Open on github</button>
                    </div>
                </OptionItemContent>
            </ListDetail>
        </Modal>
    );
}
