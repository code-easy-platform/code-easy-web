import React from 'react';

import { ContextMenu } from './shared/components/context-menu/ContextMenu';
import { Routes } from './pages/Routes';
import { IdeConfigurationProvider } from './shared/contexts';

function App() {
  return (
    <div className="App">
      <IdeConfigurationProvider>
        <ContextMenu />
        <Routes />
      </IdeConfigurationProvider>
    </div>
  );
}

export default App;
