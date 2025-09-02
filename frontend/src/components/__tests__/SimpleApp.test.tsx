import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SimpleApp } from '../SimpleApp';

// Mock the TodoContext
vi.mock('../../context/TodoContext', async () => {
  const actual = await vi.importActual('../../context/TodoContext');
  return {
    ...actual,
    useTodo: vi.fn(() => ({
      state: {
        todos: [
          {
            id: '1',
            title: 'Test Todo',
            completed: false,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
        isLoading: false,
        error: null,
      },
      createTodo: vi.fn(),
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
    })),
  };
});

// Mock haptic feedback
vi.mock('../../utils/animations', () => ({
  hapticFeedback: {
    light: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  },
}));

describe('SimpleApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders the app header', () => {
    render(<SimpleApp />);
    expect(screen.getByText('Zhoplist')).toBeInTheDocument();
  });

  it('renders the add todo form', () => {
    render(<SimpleApp />);
    const input = screen.getByPlaceholderText('What do you need to buy?');
    expect(input).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders todo items', () => {
    render(<SimpleApp />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('shows tab navigation', () => {
    render(<SimpleApp />);
    expect(screen.getAllByText(/all/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/pending/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  it('allows typing in the todo input', () => {
    render(<SimpleApp />);
    const input = screen.getByPlaceholderText('What do you need to buy?') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'New todo item' } });
    expect(input.value).toBe('New todo item');
  });

  it('shows online/offline status', () => {
    render(<SimpleApp />);
    // Should show online status by default
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('handles mobile view correctly', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<SimpleApp />);
    
    // Should still render all main elements
    expect(screen.getByText('Zhoplist')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What do you need to buy?')).toBeInTheDocument();
  });

  // Empty state test skipped - requires complex mocking
  it.skip('renders empty state when no todos', () => {
    // This test would need better mocking setup
  });
}); 