// React import not needed in React 19
import { TodoProvider } from './context/TodoContext';
import './App.css';
import { ModernShoppingList } from './components/ModernShoppingList';
import { EditTodoModal } from './components/EditTodoModal';
import { useTodo } from './context/TodoContext';

function AppContent() {
  const { state } = useTodo();
  
  return (
    <div className="min-h-screen">
      <ModernShoppingList />
      {state.editingTodo && <EditTodoModal todo={state.editingTodo} />}
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
