import React, { createContext } from 'react';
import { IObservable, observe } from 'react-observing';

import { ECurrentFocus } from '../enuns';

export const CurrentFocusContext = createContext<IObservable<ECurrentFocus>>({} as IObservable<ECurrentFocus>);

export const CurrentFocusProvider: React.FC = ({ children }) => {
    const observable = observe(ECurrentFocus.flow);

    return (
        <CurrentFocusContext.Provider value={observable}>
            {children}
        </CurrentFocusContext.Provider>
    );
}
