import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import type { Todo } from '../types';
import { AllIcon, PendingIcon, DoneIcon, CheckIcon, PartyIcon, NoteIcon } from './icons/Icons';

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
    await toggleTodo(id);
  };

  const handleDeleteTodo = async (id: string) => {
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
      {/* Modern Header with Cyan-Green Gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
        color: 'white',
        padding: '24px 20px',
        position: 'relative',
        flexShrink: 0
      }}>
        {/* Online/Offline indicator */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          opacity: 0.9,
          background: 'rgba(255,255,255,0.1)',
          padding: '4px 8px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
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
          fontSize: '32px',
          fontWeight: '800',
          letterSpacing: '-1px',
          background: 'linear-gradient(45deg, #ffffff, #e6f7ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
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
        {/* Add Item Section */}
        <div style={{
          padding: '24px 20px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e8f4f8',
          flexShrink: 0
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
                  padding: '18px 24px',
                  border: 'none',
                  borderRadius: '20px',
                  backgroundColor: '#f0f8ff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,180,219,0.08)',
                  color: '#1a365d'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.backgroundColor = '#ffffff';
                  target.style.boxShadow = '0 4px 20px rgba(0,180,219,0.15)';
                  target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.backgroundColor = '#f0f8ff';
                  target.style.boxShadow = '0 2px 8px rgba(0,180,219,0.08)';
                  target.style.transform = 'translateY(0)';
                }}
              />
              <button
                type="submit"
                disabled={!newTodoTitle.trim()}
                style={{
                  padding: '18px 28px',
                  background: newTodoTitle.trim() 
                    ? 'linear-gradient(135deg, #00d4aa 0%, #00b4db 100%)' 
                    : '#e2e8f0',
                  color: newTodoTitle.trim() ? 'white' : '#a0aec0',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: newTodoTitle.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: newTodoTitle.trim() ? '0 4px 15px rgba(0,212,170,0.3)' : 'none',
                  minWidth: '80px'
                }}
                onMouseEnter={(e) => {
                  if (newTodoTitle.trim()) {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 8px 25px rgba(0,212,170,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = newTodoTitle.trim() ? '0 4px 15px rgba(0,212,170,0.3)' : 'none';
                }}
              >
                Add
              </button>
            </div>
          </form>
        </div>

        {/* Tab Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e8f4f8',
          padding: '0 20px',
          flexShrink: 0
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
                  padding: '16px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: activeTab === tab ? '#00b4db' : '#64748b',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #00d4aa' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  borderRadius: '8px 8px 0 0'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = '#f8fdff';
                    target.style.color = '#00b4db';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'transparent';
                    target.style.color = '#64748b';
                  }
                }}
              >
                {tab} {tab === 'pending' ? `(${pendingCount})` : tab === 'completed' ? `(${completedCount})` : `(${state.todos.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List - Scrollable Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'white',
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
                    padding: window.innerWidth <= 768 ? '12px 0' : '20px 0', // Reduced padding for mobile
                    borderBottom: index < filteredTodos().length - 1 ? '1px solid #f1f8fc' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f8fdff'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'}
                >
                  {/* Modern Checkbox */}
                  <button
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{
                      width: window.innerWidth <= 768 ? '28px' : '32px', // Smaller on mobile
                      height: window.innerWidth <= 768 ? '28px' : '32px',
                      borderRadius: window.innerWidth <= 768 ? '14px' : '16px',
                      border: 'none',
                      background: todo.completed 
                        ? 'linear-gradient(135deg, #00d4aa 0%, #00b4db 100%)'
                        : '#f0f8ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      marginRight: window.innerWidth <= 768 ? '16px' : '20px', // Less margin on mobile
                      transition: 'all 0.3s ease',
                      boxShadow: todo.completed 
                        ? '0 4px 15px rgba(0,212,170,0.3)' 
                        : '0 2px 8px rgba(0,180,219,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!todo.completed) {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = 'linear-gradient(135deg, #e6fff9 0%, #e6f7ff 100%)';
                        target.style.transform = 'scale(1.1)';
                        target.style.boxShadow = '0 4px 15px rgba(0,180,219,0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!todo.completed) {
                        const target = e.target as HTMLButtonElement;
                        target.style.background = '#f0f8ff';
                        target.style.transform = 'scale(1)';
                        target.style.boxShadow = '0 2px 8px rgba(0,180,219,0.1)';
                      }
                    }}
                  >
                    {todo.completed && (
                      <CheckIcon 
                        size={window.innerWidth <= 768 ? 16 : 18} 
                        color="white" 
                      />
                    )}
                  </button>

                  {/* Todo Text */}
                  <span
                    style={{
                      flex: 1,
                      fontSize: window.innerWidth <= 768 ? '16px' : '17px', // Smaller font on mobile
                      color: todo.completed ? '#94a3b8' : '#1e293b',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: '500',
                      lineHeight: window.innerWidth <= 768 ? '1.3' : '1.4' // Tighter line height on mobile
                    }}
                  >
                    {todo.title}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    style={{
                      width: window.innerWidth <= 768 ? '36px' : '40px', // Smaller on mobile
                      height: window.innerWidth <= 768 ? '36px' : '40px',
                      borderRadius: window.innerWidth <= 768 ? '18px' : '20px',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: window.innerWidth <= 768 ? '20px' : '24px', // Smaller icon on mobile
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

      {/* Modern Bottom Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e8f4f8',
        padding: window.innerWidth <= 768 ? '12px 20px 16px 20px' : '16px 20px 24px 20px', // Less padding on mobile
        boxShadow: '0 -8px 30px rgba(0,180,219,0.08)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexShrink: 0,
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: activeTab === 'all' ? '#00b4db' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px', // Less padding on mobile
            borderRadius: '16px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'all') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#f8fdff';
              target.style.color = '#00b4db';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'all') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = '#94a3b8';
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
            background: 'none',
            border: 'none',
            color: activeTab === 'pending' ? '#00b4db' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px', // Less padding on mobile
            borderRadius: '16px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'pending') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#f8fdff';
              target.style.color = '#00b4db';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'pending') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = '#94a3b8';
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
            background: 'none',
            border: 'none',
            color: activeTab === 'completed' ? '#00b4db' : '#94a3b8',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px', // Less padding on mobile
            borderRadius: '16px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'completed') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#f8fdff';
              target.style.color = '#00b4db';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'completed') {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = '#94a3b8';
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