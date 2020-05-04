import React from 'react';

import { ContextMenu } from './shared/components/context-menu/ContextMenu';
import { Routes } from './pages/Routes';

function App() {
  return (
    <div className="App">
      <ContextMenu />
      <Routes />
    </div>
  );
}

export default App;
