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

  return {
    getTodos: () => Promise.resolve([...todos]),
    createTodo: (todoData: TodoFormData) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: todoData.title,
        description: todoData.description || '',
        completed: false,
        priority: todoData.priority || 0,
        category: todoData.category || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: todoData.dueDate,
        tags: todoData.tags || [],
        userSession: 'default-session',
      };
      todos.unshift(newTodo);
      return Promise.resolve(newTodo);
    },
    updateTodo: (id: string, updates: Partial<TodoFormData>) => {
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...updates, updatedAt: new Date().toISOString() };
      }
      return Promise.resolve();
    },
    deleteTodo: (id: string) => {
      todos = todos.filter(t => t.id !== id);
      return Promise.resolve();
    },
    toggleTodo: (id: string) => {
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = { 
          ...todos[index], 
          completed: !todos[index].completed,
          updatedAt: new Date().toISOString()
        };
      }
      return Promise.resolve();
    },
    deleteCompletedTodos: () => {
      const deletedCount = todos.filter(t => t.completed).length;
      todos = todos.filter(t => !t.completed);
      return Promise.resolve({ message: 'Completed todos deleted', deletedCount });
    },
  };
}; 