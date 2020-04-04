import React from 'react';

import { ContextMenu } from './shared/components/context-menu/ContextMenu';
import Editor from './pages/editor/Editor';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ContextMenu />
      <Editor />
    </div>
  );
}

export default App;
