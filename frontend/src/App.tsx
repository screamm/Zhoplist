import React from 'react';
import { TodoProvider } from './context/TodoContext';
import './App.css';
import { SimpleApp } from './components/SimpleApp';

function App() {
  return (
    <TodoProvider>
      <SimpleApp />
    </TodoProvider>
  );
}

export default App;
