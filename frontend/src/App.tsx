// React import not needed in React 19
import { TodoProvider } from './context/TodoContext';
import './App.css';
import { ResponsiveCategoryView } from './components/ResponsiveCategoryView';
import { EditTodoModal } from './components/EditTodoModal';
import { useTodo } from './context/TodoContext';

function AppContent() {
  const { state } = useTodo();
  
  return (
    <div className="min-h-screen">
      <ResponsiveCategoryView />
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
