import React from 'react';

import { ContextMenu } from './shared/components/context-menu/ContextMenu';
import { IdeConfigurationProvider } from './shared/contexts';
import { Routes } from './pages/Routes';

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
