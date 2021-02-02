import React, { createContext } from 'react';

import { TabListStore } from '../components/tab-list';

export const TabListContext = createContext({} as TabListStore);

export const TabListProvider: React.FC = ({ children }) => {
    return (
        <TabListContext.Provider value={new TabListStore([])}>
            {children}
        </TabListContext.Provider>
    );
}
