import type { Todo, TodoFormData } from '../types';

export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Handla mat för veckan',
    description: 'Behöver köpa kött, grönsaker och mjölkprodukter till veckan',
    completed: false,
    priority: 2,
    category: 'Hushåll',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Tomorrow
    tags: ['inköp', 'mat', 'urgency'],
    userSession: 'default-session',
  },
  {
    id: '2', 
    title: 'Ringa tandläkaren',
    description: 'Boka tid för kontroll',
    completed: false,
    priority: 1,
    category: 'Hälsa',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    tags: ['hälsa', 'telefon'],
    userSession: 'default-session',
  },
  {
    id: '3',
    title: 'Slutföra projektrapport',
    description: 'Behöver skriva sammanfattning och slutsatser',
    completed: false,
    priority: 2,
    category: 'Jobb',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // In 2 days
    tags: ['jobb', 'deadline', 'rapport'],
    userSession: 'default-session',
  },
  {
    id: '4',
    title: 'Köpa present till mamma',
    description: 'Hennes födelsedag är nästa vecka',
    completed: true,
    priority: 1,
    category: 'Familj',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    tags: ['present', 'familj'],
    userSession: 'default-session',
  }
  // REMOVED todos 5, 6, 7, 8 to keep only 4 todos with different categories
];

// For development mode, we can use this to simulate API responses
export const createMockAPI = () => {
  let todos = [...mockTodos];

  // Helper to get current session ID dynamically
  const getCurrentSession = async () => {
    try {
      const { sessionManager } = await import('./sessionManager.js');
      return sessionManager.getSessionId();
    } catch {
      return 'default-session';
    }
  };

  return {
    getTodos: async () => {
      const currentSession = await getCurrentSession();
      return todos.filter(todo => todo.userSession === currentSession);
    },
    createTodo: async (todoData: TodoFormData) => {
      const currentSession = await getCurrentSession();
      const newTodo: Todo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: todoData.title,
        description: todoData.description || '',
        completed: false,
        priority: todoData.priority || 0,
        category: todoData.category || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: todoData.dueDate,
        tags: todoData.tags || [],
        userSession: currentSession,
      };
      todos.unshift(newTodo);
      return Promise.resolve(newTodo);
    },
    updateTodo: async (id: string, updates: Partial<TodoFormData>) => {
      const currentSession = await getCurrentSession();
      const index = todos.findIndex(t => t.id === id && t.userSession === currentSession);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...updates, updatedAt: new Date().toISOString() };
      }
      return Promise.resolve();
    },
    deleteTodo: async (id: string) => {
      const currentSession = await getCurrentSession();
      todos = todos.filter(t => !(t.id === id && t.userSession === currentSession));
      return Promise.resolve();
    },
    toggleTodo: async (id: string) => {
      const currentSession = await getCurrentSession();
      const index = todos.findIndex(t => t.id === id && t.userSession === currentSession);
      if (index !== -1) {
        todos[index] = { 
          ...todos[index], 
          completed: !todos[index].completed,
          updatedAt: new Date().toISOString()
        };
      }
      return Promise.resolve();
    },
    deleteCompletedTodos: async () => {
      const currentSession = await getCurrentSession();
      const sessionTodos = todos.filter(t => t.userSession === currentSession);
      const deletedCount = sessionTodos.filter(t => t.completed).length;
      todos = todos.filter(t => !(t.userSession === currentSession && t.completed));
      return Promise.resolve({ message: 'Completed todos deleted', deletedCount });
    },
  };
}; 