import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import type { Todo } from '../types';
import { AllIcon, PendingIcon, DoneIcon, CheckIcon, PartyIcon, NoteIcon } from './icons/Icons';
import { hapticFeedback } from '../utils/animations';

// Offline storage functions
const saveToStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const SimpleApp: React.FC = () => {
  const { state, createTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (state.todos.length > 0) {
      saveToStorage(state.todos);
    }
  }, [state.todos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      hapticFeedback.light(); // Lätt vibration för add
      
      await createTodo({
        title: newTodoTitle,
        description: '',
        category: '',
        priority: 0
      });
      setNewTodoTitle('');
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = state.todos.find(t => t.id === id);
    
    // Haptic feedback för touch-känsla
    if (todo?.completed) {
      hapticFeedback.light(); // Lätt vibration för undo
    } else {
      hapticFeedback.success(); // Framgång vibration för completion
    }
    
    await toggleTodo(id);
  };

  const handleDeleteTodo = async (id: string) => {
    hapticFeedback.error(); // Varning vibration för delete
    await deleteTodo(id);
  };

  // Filter todos based on active tab
  const filteredTodos = () => {
    switch (activeTab) {
      case 'pending':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  };

  const pendingCount = state.todos.filter(t => !t.completed).length;
  const completedCount = state.todos.filter(t => t.completed).length;

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#f7f9fc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0
    }}>
      {/* Modern 2025 Header with Enhanced Liquid Glass */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8B5CF6 100%)',
        color: 'white',
        padding: '28px 24px',
        position: 'relative',
        flexShrink: 0,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)'
      }}>
        {/* Online/Offline indicator with 2025 glass effect */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '500',
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '6px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#4ade80' : '#f87171'
          }} />
          {isOnline ? 'Online' : 'Offline'}
        </div>
        
        <h1 style={{
          margin: 0,
          fontSize: '36px',
          fontWeight: '900',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 2px 20px rgba(255, 255, 255, 0.1)',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Zhoplist
        </h1>
        
        {state.todos.length > 0 && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            opacity: 0.95,
            fontWeight: '500'
          }}>
            {pendingCount} items • {completedCount} completed
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Add Item Section with Enhanced Glass */}
        <div style={{
          padding: '28px 24px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          flexShrink: 0,
          boxShadow: '0 1px 20px rgba(0, 0, 0, 0.05)'
        }}>
          <form onSubmit={handleAddTodo}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="What do you need to buy?"
                style={{
                  flex: 1,
                  padding: '20px 28px',
                  border: '1px solid rgba(102, 126, 234, 0.15)',
                  borderRadius: '24px',
                  background: 'rgba(248, 250, 252, 0.9)',
                  backdropFilter: 'blur(12px)',
                  fontSize: '16px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 24px rgba(102, 126, 234, 0.08)',
                  color: '#1e293b',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.background = 'rgba(255, 255, 255, 0.95)';
                  target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  target.style.boxShadow = '0 8px 40px rgba(139, 92, 246, 0.15), 0 0 0 3px rgba(139, 92, 246, 0.1)';
                  target.style.transform = 'translateY(-2px) scale(1.01)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.background = 'rgba(248, 250, 252, 0.9)';
                  target.style.borderColor = 'rgba(102, 126, 234, 0.15)';
                  target.style.boxShadow = '0 4px 24px rgba(102, 126, 234, 0.08)';
                  target.style.transform = 'translateY(0) scale(1)';
                }}
              />
              <button
                type="submit"
                disabled={!newTodoTitle.trim()}
                style={{
                  padding: '20px 32px',
                  background: newTodoTitle.trim() 
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)' 
                    : 'rgba(226, 232, 240, 0.8)',
                  color: newTodoTitle.trim() ? 'white' : '#94a3b8',
                  border: newTodoTitle.trim() ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: newTodoTitle.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: newTodoTitle.trim() ? '0 8px 32px rgba(139, 92, 246, 0.25)' : 'none',
                  minWidth: '100px',
                  backdropFilter: 'blur(12px)',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (newTodoTitle.trim()) {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(-3px) scale(1.02)';
                    target.style.boxShadow = '0 12px 48px rgba(139, 92, 246, 0.35)';
                    target.style.background = 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #A855F7 100%)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = 'translateY(0) scale(1)';
                  target.style.boxShadow = newTodoTitle.trim() ? '0 8px 32px rgba(139, 92, 246, 0.25)' : 'none';
                  target.style.background = newTodoTitle.trim() ? 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)' : 'rgba(226, 232, 240, 0.8)';
                }}
              >
                Add
              </button>
            </div>
          </form>
        </div>

        {/* Tab Navigation with Liquid Glass */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '0 24px',
          flexShrink: 0,
          boxShadow: '0 1px 16px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            gap: '0'
          }}>
            {(['all', 'pending', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '18px 24px',
                  border: 'none',
                  background: activeTab === tab 
                    ? 'rgba(139, 92, 246, 0.1)' 
                    : 'transparent',
                  color: activeTab === tab ? '#8B5CF6' : '#6b7280',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #8B5CF6' : '3px solid transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'capitalize',
                  borderRadius: '12px 12px 0 0',
                  backdropFilter: activeTab === tab ? 'blur(12px)' : 'none',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'rgba(139, 92, 246, 0.05)';
                    target.style.color = '#8B5CF6';
                    target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    const target = e.target as HTMLButtonElement;
                    target.style.background = 'transparent';
                    target.style.color = '#6b7280';
                    target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {tab} {tab === 'pending' ? `(${pendingCount})` : tab === 'completed' ? `(${completedCount})` : `(${state.todos.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List - Scrollable Content with Liquid Glass */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitOverflowScrolling: 'touch'
        }}>
          {filteredTodos().length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: '#94a3b8',
              fontSize: '16px'
            }}>
              <div style={{ 
                fontSize: window.innerWidth <= 768 ? '48px' : '64px', // Smaller on mobile
                marginBottom: window.innerWidth <= 768 ? '12px' : '16px',
                opacity: 0.6
              }}>
                {activeTab === 'completed' ? 
                  <PartyIcon size={window.innerWidth <= 768 ? 48 : 64} color="#94a3b8" /> : 
                 activeTab === 'pending' ? 
                  <PendingIcon size={window.innerWidth <= 768 ? 48 : 64} color="#94a3b8" /> :
                  <NoteIcon size={window.innerWidth <= 768 ? 48 : 64} color="#94a3b8" />
                }
              </div>
              <div style={{ fontWeight: '500' }}>
                {activeTab === 'completed' ? 'No completed items yet' : 
                 activeTab === 'pending' ? 'No pending items' :
                 'Start adding items to your list!'}
              </div>
            </div>
          ) : (
            <div style={{ 
              padding: '8px 20px 120px 20px'
            }}>
              {filteredTodos().map((todo, index) => (
                <div
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: window.innerWidth <= 768 ? '16px 0' : '20px 0', // Better mobile touch targets
                    borderBottom: index < filteredTodos().length - 1 ? '1px solid #f1f8fc' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f8fdff'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'}
                >
                  {/* Modern 2025 Checkbox */}
                  <button
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{
                      width: window.innerWidth <= 768 ? '44px' : '48px', // 44px minimum touch target
                      height: window.innerWidth <= 768 ? '44px' : '48px',
                      borderRadius: window.innerWidth <= 768 ? '22px' : '24px',
                      border: todo.completed ? 'none' : '2px solid rgba(139, 92, 246, 0.2)',
                      background: todo.completed 
                        ? 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)'
                        : 'rgba(248, 250, 252, 0.8)',
                      backdropFilter: 'blur(12px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      marginRight: window.innerWidth <= 768 ? '16px' : '20px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: todo.completed 
                        ? '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)' 
                        : '0 4px 20px rgba(139, 92, 246, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      if (!todo.completed) {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = 'rgba(139, 92, 246, 0.1)';
                        target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                        target.style.transform = 'scale(1.1)';
                        target.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!todo.completed) {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = 'rgba(248, 250, 252, 0.8)';
                        target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                        target.style.transform = 'scale(1)';
                        target.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.08)';
                      }
                    }}
                  >
                    {todo.completed && (
                      <CheckIcon 
                        size={window.innerWidth <= 768 ? 20 : 22} 
                        color="white" 
                      />
                    )}
                  </button>

                  {/* Todo Text with 2025 Typography */}
                  <span
                    style={{
                      flex: 1,
                      fontSize: window.innerWidth <= 768 ? '16px' : '17px', // Smaller font on mobile
                      color: todo.completed ? '#94a3b8' : '#1e293b',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontWeight: '500',
                      lineHeight: window.innerWidth <= 768 ? '1.3' : '1.4', // Tighter line height on mobile
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      opacity: todo.completed ? 0.7 : 1
                    }}
                  >
                    {todo.title}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    style={{
                      width: window.innerWidth <= 768 ? '44px' : '48px', // 44px minimum touch target
                      height: window.innerWidth <= 768 ? '44px' : '48px',
                      borderRadius: window.innerWidth <= 768 ? '22px' : '24px',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: window.innerWidth <= 768 ? '24px' : '28px', // Better visibility
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.5,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.opacity = '1';
                      target.style.backgroundColor = '#fef2f2';
                      target.style.transform = 'scale(1.15)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.opacity = '0.5';
                      target.style.backgroundColor = 'transparent';
                      target.style.transform = 'scale(1)';
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern 2025 Bottom Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.1)',
        padding: window.innerWidth <= 768 ? '16px 24px 20px 24px' : '20px 24px 28px 24px', // Better spacing
        boxShadow: '0 -12px 40px rgba(139, 92, 246, 0.08), 0 -1px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: activeTab === 'all' ? 'rgba(139, 92, 246, 0.1)' : 'none',
            border: 'none',
            color: activeTab === 'all' ? '#8B5CF6' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: window.innerWidth <= 768 ? '12px 16px' : '16px 20px', // Better touch targets
            borderRadius: '20px',
            backdropFilter: activeTab === 'all' ? 'blur(12px)' : 'none',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'all') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(139, 92, 246, 0.08)';
              target.style.color = '#8B5CF6';
              target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'all') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'transparent';
              target.style.color = '#94a3b8';
              target.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <AllIcon size={window.innerWidth <= 768 ? 20 : 24} color="currentColor" />
          </div>
          All
        </button>
        
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: activeTab === 'pending' ? 'rgba(139, 92, 246, 0.1)' : 'none',
            border: 'none',
            color: activeTab === 'pending' ? '#8B5CF6' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: window.innerWidth <= 768 ? '12px 16px' : '16px 20px', // Better touch targets
            borderRadius: '20px',
            backdropFilter: activeTab === 'pending' ? 'blur(12px)' : 'none',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'pending') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(139, 92, 246, 0.08)';
              target.style.color = '#8B5CF6';
              target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'pending') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'transparent';
              target.style.color = '#94a3b8';
              target.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <PendingIcon size={window.innerWidth <= 768 ? 20 : 24} color="currentColor" />
          </div>
          Pending
        </button>
        
        <button
          onClick={() => setActiveTab('completed')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: activeTab === 'completed' ? 'rgba(139, 92, 246, 0.1)' : 'none',
            border: 'none',
            color: activeTab === 'completed' ? '#8B5CF6' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: window.innerWidth <= 768 ? '12px 16px' : '16px 20px', // Better touch targets
            borderRadius: '20px',
            backdropFilter: activeTab === 'completed' ? 'blur(12px)' : 'none',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'completed') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(139, 92, 246, 0.08)';
              target.style.color = '#8B5CF6';
              target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'completed') {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'transparent';
              target.style.color = '#94a3b8';
              target.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <DoneIcon size={window.innerWidth <= 768 ? 20 : 24} color="currentColor" />
          </div>
          Done
        </button>
      </div>
    </div>
  );
}; 