// Todo interface matching our API specification
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 0 | 1 | 2; // 0=low, 1=medium, 2=high
  category?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  userSession: string; // SessionID eller lista-kod för multi-user support
}

// Form data for creating/updating todos
export interface TodoFormData {
  title: string;
  description?: string;
  priority?: 0 | 1 | 2;
  category?: string;
  dueDate?: string;
  tags?: string[];
}

// API response types
export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface DeleteCompletedResponse {
  message: string;
  deletedCount: number;
}

// Filter and sort options
export type TodoFilter = 'all' | 'active' | 'completed';
export type TodoSort = 'newest' | 'oldest' | 'priority' | 'alphabetical';

// Priority levels with labels and colors
export const PRIORITY_LEVELS = {
  0: { label: 'Låg', color: 'blue', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-400' },
  1: { label: 'Medium', color: 'yellow', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-400' },
  2: { label: 'Hög', color: 'red', bgColor: 'bg-red-500/10', borderColor: 'border-red-400' },
} as const;

// Category colors
export const CATEGORY_COLORS = [
  'bg-blue-500/20 text-blue-300 border-blue-400/30',
  'bg-green-500/20 text-green-300 border-green-400/30',
  'bg-purple-500/20 text-purple-300 border-purple-400/30',
  'bg-pink-500/20 text-pink-300 border-pink-400/30',
  'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
] as const;

// Common UI states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Toast notification types
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

// Mobile gesture events
export interface SwipeGesture {
  direction: 'left' | 'right';
  distance: number;
  velocity: number;
}

// App configuration
export interface AppConfig {
  apiBaseUrl: string;
  maxTodos: number;
  autoSaveDelay: number;
  enableOfflineMode: boolean;
} 