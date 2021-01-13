import React from 'react';

import { Header, FieldsList } from './shared/components';
import { IItem } from './shared/interfaces';

interface PropertiesEditorFormProps {
    item: IItem;
}
export const PropertiesEditorForm: React.FC<PropertiesEditorFormProps> = ({ item }) => {
    return (
        <div className="flex1 flex-column full-width">
            <Header
                title={item.name}
                subtitle={item.subname}
                titleFontSize={"medium"}
                subtitleFontSize={"x-small"}
                backgroundColor={"var(--main-background-bars)"}
            />
            <FieldsList fields={item.properties} />
        </div>
    );
}
