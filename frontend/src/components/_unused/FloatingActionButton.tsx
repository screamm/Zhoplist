import React from 'react';
import { useTodo } from '../context/TodoContext';

export const FloatingActionButton: React.FC = () => {
  const { openAddModal } = useTodo();

  return (
    <button
      onClick={openAddModal}
      className="fab"
      aria-label="Lägg till ny todo"
    >
      <span className="text-2xl text-white">+</span>
    </button>
  );
}; 