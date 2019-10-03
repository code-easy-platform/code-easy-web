import React from 'react';
import './App.scss';
import Editor from './pages/editor/Editor';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Editor />
      </div>
    </DndProvider>
  );
}

export default App;
