import React from 'react';

import { IItem, IPropertiesEditorConfigurations } from './shared/interfaces';
import { ConfigurationProvider } from './shared/contexts';
import { PropertiesEditorForm } from './PropertiesEditor';

interface PropertiesEditorProps {
    item: IItem;
    configs?: IPropertiesEditorConfigurations;
}
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ item, configs }) => {

    return (
        <ConfigurationProvider configs={configs as IPropertiesEditorConfigurations}>
            <PropertiesEditorForm item={item} />
        </ConfigurationProvider>
    );
}

export * from './shared/interfaces';
export * from './shared/enums';
