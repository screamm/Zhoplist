import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Todo, TodoFormData, TodoFilter, TodoSort, ToastNotification } from '../types/index.js';
import { api } from '../utils/api.js';
import { v4 as uuidv4 } from 'uuid';
import { sessionManager } from '../utils/sessionManager.js';

// Add at the top after imports
const STORAGE_KEY = 'shopping-list-todos';

// Offline storage functions
const saveToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return [];
  }
};

// State interface
interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  sort: TodoSort;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  isAddModalOpen: boolean;
  editingTodo: Todo | null;
  toasts: ToastNotification[];
  viewMode: 'categorized' | 'flat'; // New: Toggle between categorized and flat list view
}

// Action types
type TodoAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_COMPLETED' }
  | { type: 'SET_FILTER'; payload: TodoFilter }
  | { type: 'SET_SORT'; payload: TodoSort }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_ADD_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_EDITING_TODO'; payload: Todo | null }
  | { type: 'ADD_TOAST'; payload: ToastNotification }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'categorized' | 'flat' }; // New: Set view mode

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sort: 'newest',
  searchQuery: '',
  isLoading: false,
  error: null,
  isAddModalOpen: false,
  editingTodo: null,
  toasts: [],
  viewMode: 'categorized', // Default to categorized view
};

// Reducer function
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_TODOS': {
      const newState1 = { ...state, todos: action.payload, isLoading: false, error: null };
      saveToStorage(action.payload); // Auto-save to localStorage
      return newState1;
    }

    case 'ADD_TODO': {
      const newTodos = [action.payload, ...(state.todos || [])];
      const newState2 = { 
        ...state, 
        todos: newTodos,
        isAddModalOpen: false 
      };
      saveToStorage(newTodos); // Auto-save to localStorage
      return newState2;
    }

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: (state.todos || []).map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        ),
        editingTodo: null,
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: (state.todos || []).filter(todo => todo.id !== action.payload),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: (state.todos || []).map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      };

    case 'DELETE_COMPLETED':
      return {
        ...state,
        todos: (state.todos || []).filter(todo => !todo.completed),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_ADD_MODAL_OPEN':
      return { ...state, isAddModalOpen: action.payload };

    case 'SET_EDITING_TODO':
      return { ...state, editingTodo: action.payload };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...(state.toasts || []), action.payload],
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: (state.toasts || []).filter(toast => toast.id !== action.payload),
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };

    default:
      return state;
  }
};

// Context interface
interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  // Todo actions
  loadTodos: () => Promise<void>;
  createTodo: (todoData: TodoFormData) => Promise<void>;
  updateTodo: (id: string, updates: Partial<TodoFormData>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteCompleted: () => Promise<void>;
  setTodos: (todos: Todo[]) => void;
  // UI actions
  setFilter: (filter: TodoFilter) => void;
  setSort: (sort: TodoSort) => void;
  setSearchQuery: (query: string) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  startEditingTodo: (todo: Todo) => void;
  stopEditingTodo: () => void;
  setViewMode: (mode: 'categorized' | 'flat') => void; // New: Set view mode
  toggleViewMode: () => void; // New: Toggle between view modes
  // Toast actions
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  hideToast: (id: string) => void;
  // Computed values
  filteredTodos: Todo[];
  // Count helpers
  uncrossedCount: number; // New: Count of active/uncrossed items
  completedCount: number; // New: Count of completed/crossed items
}

// Create context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider component
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Toast actions (defined early to avoid circular dependencies)
  const showToast = React.useCallback((toast: Omit<ToastNotification, 'id'>) => {
    const toastWithId: ToastNotification = {
      ...toast,
      id: uuidv4(),
      duration: toast.duration || 3000,
    };
    dispatch({ type: 'ADD_TOAST', payload: toastWithId });
  }, []);

  const hideToast = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  }, []);

  // Auto-remove toasts after duration
  useEffect(() => {
    (state.toasts || []).forEach(toast => {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          hideToast(toast.id);
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [state.toasts, hideToast]);

  // API action implementations - server first approach
  const loadTodos = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Try server first for fresh data
      const todos = await api.getTodos();
      dispatch({ type: 'SET_TODOS', payload: todos });
      saveToStorage(todos); // Cache server data
    } catch (error) {
      console.error('❌ Server sync failed:', error);
      
      // Fall back to localStorage only if server fails
      const cachedTodos = loadFromStorage();
      if (cachedTodos.length > 0) {
        dispatch({ type: 'SET_TODOS', payload: cachedTodos });
        showToast({
          type: 'warning',
          title: 'Working offline',
          message: 'Using cached data - server unavailable',
          duration: 5000,
        });
      } else {
        // No cached data and server failed
        const errorMessage = error instanceof Error ? error.message : 'Cannot load todos - server unavailable';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        dispatch({ type: 'SET_TODOS', payload: [] }); // Start with empty list
        showToast({
          type: 'error',
          title: 'Connection failed',
          message: 'Cannot reach server. Please check your connection.',
          duration: 10000,
        });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [showToast]);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Listen for sessionID changes and reload todos
  useEffect(() => {
    const unsubscribe = sessionManager.onSessionChange(() => {
      // När sessionID ändras, ladda nya todos
      dispatch({ type: 'SET_TODOS', payload: [] }); // Rensa gamla todos
      loadTodos(); // Ladda nya todos för ny session
    });
    
    return unsubscribe;
  }, [loadTodos]);

  const createTodo = async (todoData: TodoFormData) => {
    try {
      const newTodo = await api.createTodo(todoData);
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      showToast({
        type: 'success',
        title: 'Todo skapad',
        message: `"${newTodo.title}" har lagts till`,
        duration: 3000,
      });
    } catch (error) {
      console.error('❌ Error creating todo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Fel vid skapande av todo';
      showToast({
        type: 'error',
        title: 'Fel vid skapande',
        message: errorMessage,
        duration: 5000,
      });
    }
  };

  const updateTodo = async (id: string, updates: Partial<TodoFormData>) => {
    try {
      await api.updateTodo(id, updates);
      dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
      showToast({
        type: 'success',
        title: 'Todo uppdaterad',
        duration: 2000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fel vid uppdatering av todo';
      showToast({
        type: 'error',
        title: 'Fel vid uppdatering',
        message: errorMessage,
        duration: 5000,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.deleteTodo(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
      showToast({
        type: 'success',
        title: 'Todo borttagen',
        duration: 2000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fel vid borttagning av todo';
      showToast({
        type: 'error',
        title: 'Fel vid borttagning',
        message: errorMessage,
        duration: 5000,
      });
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await api.toggleTodo(id);
      dispatch({ type: 'TOGGLE_TODO', payload: id });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fel vid växling av todo-status';
      showToast({
        type: 'error',
        title: 'Fel vid statusändring',
        message: errorMessage,
        duration: 5000,
      });
    }
  };

  const deleteCompleted = async () => {
    try {
      const result = await api.deleteCompletedTodos();
      dispatch({ type: 'DELETE_COMPLETED' });
      showToast({
        type: 'success',
        title: 'Slutförda todos borttagna',
        message: `${result.deletedCount} todos borttagna`,
        duration: 3000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fel vid borttagning av slutförda todos';
      showToast({
        type: 'error',
        title: 'Fel vid borttagning',
        message: errorMessage,
        duration: 5000,
      });
    }
  };

  // UI actions
  const setFilter = (filter: TodoFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: TodoSort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const openAddModal = () => {
    dispatch({ type: 'SET_ADD_MODAL_OPEN', payload: true });
  };

  const closeAddModal = () => {
    dispatch({ type: 'SET_ADD_MODAL_OPEN', payload: false });
  };

  const startEditingTodo = (todo: Todo) => {
    dispatch({ type: 'SET_EDITING_TODO', payload: todo });
  };

  const stopEditingTodo = () => {
    dispatch({ type: 'SET_EDITING_TODO', payload: null });
  };

  const setTodos = (todos: Todo[]) => {
    dispatch({ type: 'SET_TODOS', payload: todos });
  };

  const setViewMode = (mode: 'categorized' | 'flat') => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const toggleViewMode = () => {
    const newMode = state.viewMode === 'categorized' ? 'flat' : 'categorized';
    dispatch({ type: 'SET_VIEW_MODE', payload: newMode });
  };

  // Computed filtered and sorted todos
  const filteredTodos = React.useMemo(() => {
    
    if (!state || !state.todos) {
      return [];
    }
    
    // First filter out invalid todos
    let filtered = state.todos.filter(todo => 
      todo && 
      typeof todo === 'object' && 
      todo.id && 
      todo.title &&
      typeof todo.title === 'string'
    );
    

    // Apply filter
    switch (state.filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply search
    if (state.searchQuery && state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(todo => {
        const title = todo.title?.toLowerCase() || '';
        const description = todo.description?.toLowerCase() || '';
        const category = todo.category?.toLowerCase() || '';
        const tags = (todo.tags || []).some(tag => 
          tag && typeof tag === 'string' && tag.toLowerCase().includes(query)
        );
        
        return title.includes(query) ||
               description.includes(query) ||
               category.includes(query) ||
               tags;
      });
    }

    // Apply sort
    switch (state.sort) {
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case 'priority':
        filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'sv'));
        break;
      default:
        // 'newest' - default sort from API
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }

    return filtered;
  }, [state.todos, state.filter, state.sort, state.searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  // Compute count helpers
  const uncrossedCount = React.useMemo(() => {
    return filteredTodos.filter(todo => !todo.completed).length;
  }, [filteredTodos]);

  const completedCount = React.useMemo(() => {
    return filteredTodos.filter(todo => todo.completed).length;
  }, [filteredTodos]);

  // Log dependency changes
  React.useEffect(() => {
  }, [state.todos, state.filter, state.sort, state.searchQuery]);

  const contextValue: TodoContextType = {
    state,
    dispatch,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    deleteCompleted,
    setTodos,
    setFilter,
    setSort,
    setSearchQuery,
    openAddModal,
    closeAddModal,
    startEditingTodo,
    stopEditingTodo,
    setViewMode,
    toggleViewMode,
    showToast,
    hideToast,
    filteredTodos,
    uncrossedCount,
    completedCount,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

// Hook to use the context
export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}; 