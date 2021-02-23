import React, { createContext, useState, useEffect } from 'react';

import { ITreeItem } from '../interfaces';

interface IContextData {
    items: ITreeItem[];
}
export const ItemsContext = createContext<IContextData>({} as IContextData);

export const ItemsProvider: React.FC<{ items: ITreeItem[], onChange?(items: ITreeItem[]): void; }> = ({ children, ...rest }) => {
    const [items, setItems] = useState<ITreeItem[]>(rest.items);
    useEffect(() => {
        setItems(rest.items);
    }, [rest.items]);

    return (
        <ItemsContext.Provider value={{ items }}>
            {children}
        </ItemsContext.Provider>
    );
};
