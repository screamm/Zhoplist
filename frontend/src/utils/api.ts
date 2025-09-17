import type { Todo, TodoFormData, APIResponse } from '../types/index.js';
import { createMockAPI } from './mockData.js';
import { sessionManager } from './sessionManager.js';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787';
const API_TIMEOUT = 10000; // 10 seconds for reliable API calls

// Create mock API instance
const mockAPI = createMockAPI();

// Check if we should use mock data (only when explicitly requested)
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Track API availability to avoid unnecessary timeout delays
let isApiAvailable: boolean | null = null;
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 30000; // Check API availability every 30 seconds

class APIError extends Error {
  public status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

const fetchWithTimeout = async (url: string, options?: RequestInit): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionManager.getSessionId(),
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new APIError(
        `API Error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // If network error and we're in development, fall back to mock
    if (USE_MOCK_DATA && (error instanceof TypeError || (error as Error).name === 'AbortError')) {
      console.warn('API not available, using mock data');
      throw new APIError('API unavailable, using offline mode');
    }
    
    throw new APIError(
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
};

// Quick API availability check
const quickApiCheck = async (): Promise<boolean> => {
  const now = Date.now();
  
  // Use cached result if recent
  if (isApiAvailable !== null && (now - lastApiCheck) < API_CHECK_INTERVAL) {
    return isApiAvailable;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second health check
    
    await fetch(`${API_BASE_URL}/health`, {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    isApiAvailable = true;
    lastApiCheck = now;
    return true;
  } catch {
    isApiAvailable = false;
    lastApiCheck = now;
    return false;
  }
};

// Utility to try API first, then fall back to mock
const tryApiOrMock = async <T>(
  apiCall: () => Promise<T>,
  mockCall: () => Promise<T>
): Promise<T> => {
  // Always try API first unless mock mode is explicitly enabled
  if (!USE_MOCK_DATA) {
    try {
      const result = await apiCall();
      isApiAvailable = true;
      return result;
    } catch (error) {
      console.error('❌ API call failed:', error);
      isApiAvailable = false;
      throw error; // Don't fall back to mock in production
    }
  }
  
  // Mock mode - check API availability first
  const apiAvailable = await quickApiCheck();
  if (!apiAvailable) {
    return await mockCall();
  }
  
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.warn('⚠️ API failed in mock mode, using mock data:', error);
    isApiAvailable = false;
    return await mockCall();
  }
};

export const api = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    console.log('🌐 API: getTodos called');
    const result = await tryApiOrMock(
      () => apiRequest<Todo[] | APIResponse<Todo[]>>('/api/todos').then(res => {
        // Handle both old and new API format
        if (Array.isArray(res)) {
          return res; // Old format: direct array
        } else if ('data' in res && res.data) {
          return res.data; // New format: wrapped in APIResponse
        } else {
          return []; // Fallback
        }
      }),
      () => mockAPI.getTodos()
    );
    return result;
  },

  // Create a new todo
  createTodo: async (todo: TodoFormData): Promise<Todo> => {
    const result = await tryApiOrMock(
      () => apiRequest<Todo | APIResponse<Todo>>('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      }).then(res => {
        // Handle both old and new API format
        if ('data' in res && res.data) {
          return res.data; // New format
        } else {
          return res as Todo; // Old format
        }
      }),
      () => mockAPI.createTodo(todo)
    );
    return result;
  },

  // Update a todo
  updateTodo: async (id: string, updates: Partial<TodoFormData>): Promise<void> => {
    return tryApiOrMock(
      () => apiRequest<APIResponse<Todo>>(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      }).then(() => undefined),
      () => mockAPI.updateTodo(id, updates)
    );
  },

  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    return tryApiOrMock(
      () => apiRequest<APIResponse<void>>(`/api/todos/${id}`, {
        method: 'DELETE',
      }).then(() => undefined),
      () => mockAPI.deleteTodo(id)
    );
  },

  // Toggle todo completion
  toggleTodo: async (id: string): Promise<void> => {
    return tryApiOrMock(
      () => apiRequest<APIResponse<Todo>>(`/api/todos/${id}/toggle`, {
        method: 'PATCH',
      }).then(() => undefined),
      () => mockAPI.toggleTodo(id)
    );
  },

  // Delete all completed todos
  deleteCompletedTodos: async (): Promise<{ message: string; deletedCount: number }> => {
    return tryApiOrMock(
      () => apiRequest<APIResponse<{ deletedCount: number }>>('/api/todos/completed', {
        method: 'DELETE',
      }).then(res => ({ message: res.message || 'Completed todos deleted', deletedCount: res.data.deletedCount })),
      () => mockAPI.deleteCompletedTodos()
    );
  },

  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    try {
      return await apiRequest<{ status: string }>('/health');
    } catch {
      return { status: 'offline' };
    }
  },
};

// Helper function to check if we're online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Reset API availability when coming back online
export const resetApiAvailability = (): void => {
  isApiAvailable = null;
  lastApiCheck = 0;
};

// Listen for online/offline events
if (typeof window !== 'undefined') {
  window.addEventListener('online', resetApiAvailability);
  window.addEventListener('offline', () => {
    isApiAvailable = false;
  });
}

// Helper function to retry API calls
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying, with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};

// Debounce utility for API calls
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}; 