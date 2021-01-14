import React from 'react';

import { IdeConfigurationProvider } from './shared/contexts';
import { ContextMenu } from './shared/components';
import { Routes } from './pages/Routes';

export const App = () => {
  return (
    <div className="App">
      <IdeConfigurationProvider>
        <ContextMenu />
        <Routes />
      </IdeConfigurationProvider>
    </div>
  );
}
