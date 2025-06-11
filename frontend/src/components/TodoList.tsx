import React from 'react';
import type { Todo } from '../types/index.js';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  console.log('📋 MINIMAL TodoList - received todos:', todos);
  console.log('📋 MINIMAL TodoList - todos length:', todos?.length);
  
  // ABSOLUT MINIMAL VERSION - bara text, inget HTML
  if (!todos || !Array.isArray(todos) || todos.length === 0) {
    console.log('📋 MINIMAL TodoList - No todos');
    return "INGA TODOS HITTADES!";
  }

  console.log('📋 MINIMAL TodoList - Will return text');
  
  // Bara returnera ren text utan HTML
  return `MINIMAL TODOLIST TEST - HITTADE ${todos.length} TODOS: ${todos.map(t => t.title).join(', ')}`;
}; 