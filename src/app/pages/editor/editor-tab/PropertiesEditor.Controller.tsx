import React from 'react';
import { useObserverValue } from 'react-observing';

import { PropertiesEditor } from '../../../shared/components/external';
import { PropertiesEditorStore } from '../../../shared/stores';

export const PropertiesEditorController: React.FC = () => {
    const item = useObserverValue(PropertiesEditorStore);

    if (!item) return null;

    return (
        <PropertiesEditor item={item} />
    );
}
