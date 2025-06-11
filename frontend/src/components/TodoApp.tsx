import React from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';

export const TodoApp: React.FC = () => {
  const { state, loadTodos } = useTodos();

  console.log('🏠 TodoApp render:', {
    todos: state.todos,
    loading: state.isLoading,
    error: state.error
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            📝 Min Todo-lista
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Håll koll på dina uppgifter
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Add Todo Form */}
        <div className="mb-8">
          <AddTodoForm />
        </div>

        {/* Loading State */}
        {state.isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Laddar...</p>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">❌ {state.error}</p>
            <button 
              onClick={loadTodos}
              className="mt-2 text-red-600 underline hover:text-red-800"
            >
              Försök igen
            </button>
          </div>
        )}

        {/* Todo List */}
        {!state.isLoading && !state.error && (
          <TodoList todos={state.todos} />
        )}
      </main>
    </div>
  );
}; 