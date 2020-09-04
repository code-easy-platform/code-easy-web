import React, { useCallback } from 'react';

import { Header, FieldsList } from './shared/components';
import { IItem, IProperty } from './shared/interfaces';

interface PropertiesEditorFormProps {
    item: IItem;
    onChange?(item: IItem): void;
}
export const PropertiesEditorForm: React.FC<PropertiesEditorFormProps> = ({ item, onChange }) => {

    const handleOnChange = useCallback((fields: IProperty<any>[]) => {
        onChange && onChange({ ...item, properties: fields });
    }, [item, onChange]);

    return (
        <div className="flex1 flex-column full-width">
            <Header
                title={item.name}
                subtitle={item.subname}
                titleFontSize={"medium"}
                subtitleFontSize={"x-small"}
                backgroundColor={"var(--main-background-bars)"}
            />
            <FieldsList
                onChange={handleOnChange}
                fields={item.properties}
            />
        </div>
    );
}
