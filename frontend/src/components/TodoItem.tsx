import React, { useState } from 'react';
import type { Todo } from '../types/index.js';
import { useTodo } from '../context/TodoContext';
import { useSwipe } from '../hooks/useSwipe';

interface TodoItemProps {
  todo: Todo;
  hideIcon?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, hideIcon = false }) => {
  console.log('📝 TodoItem render with todo:', todo);
  
  const { toggleTodo, deleteTodo } = useTodo();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Safety check for todo
  if (!todo || typeof todo !== 'object' || !todo.id || !todo.title) {
    console.log('❌ TodoItem: Invalid todo, returning null');
    return null;
  }

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 200);
  };

  const handleToggle = () => {
    setIsCompleting(true);
    setTimeout(() => {
      toggleTodo(todo.id);
      setIsCompleting(false);
    }, 150);
  };

  const { 
    swipeHandlers, 
    swipeDirection, 
    swipeOffset,
    isVisible 
  } = useSwipe({
    onSwipeLeft: handleDelete,
    onSwipeRight: handleToggle,
    threshold: 100,
    resetDelay: 2000
  });

  const transform = swipeDirection === 'left' 
    ? `translateX(${Math.min(swipeOffset, -80)}px)` 
    : swipeDirection === 'right' 
    ? `translateX(${Math.max(swipeOffset, 80)}px)` 
    : 'translateX(0px)';

  if (!isVisible || isDeleting) {
    return null;
  }

  // Kvantitet från beskrivning eller tags
  const getQuantity = () => {
    // Sök efter kvantitet i beskrivning eller titel
    const text = `${todo?.title || ''} ${todo?.description || ''}`.toLowerCase();
    const quantityMatch = text.match(/(\d+)\s*(st|pcs|kg|g|l|ml|pack|förp)/);
    if (quantityMatch) {
      return `${quantityMatch[1]} ${quantityMatch[2]}`;
    }
    return '1 st';
  };

  return (
    <div className="relative w-full">
      {/* Swipe action indicators */}
      {(swipeDirection === 'left' || swipeDirection === 'right') && (
        <div className="absolute inset-0 flex items-center justify-between px-4 rounded-xl overflow-hidden z-10">
          {/* Delete action (left swipe) */}
          {swipeDirection === 'left' && (
            <div className="flex items-center space-x-2 text-red-500">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🗑️</span>
              </div>
              <span className="text-sm font-medium">Ta bort</span>
            </div>
          )}

          {/* Complete action (right swipe) */}
          {swipeDirection === 'right' && (
            <div className="flex items-center space-x-2 text-green-500 ml-auto">
              <span className="text-sm font-medium">
                {todo.completed ? 'Ångra' : 'Klar'}
              </span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">
                  {todo.completed ? '↶' : '✓'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main todo content */}
      <div
        {...swipeHandlers}
        style={{ transform }}
        className={`
          relative 
          transition-all 
          duration-200 
          ease-out
          ${isCompleting ? 'scale-95' : ''}
          ${todo.completed ? 'opacity-60' : ''}
        `}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left side: Checkbox and content */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Checkbox */}
            <button
              onClick={handleToggle}
              className={`
                relative
                w-6 h-6 
                rounded-full
                border-2
                flex-shrink-0
                mr-3
                transition-all 
                duration-200
                ${todo.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-blue-500'
                }
              `}
            >
              {todo.completed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`
                  font-medium text-base
                  transition-all duration-200
                  ${todo.completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-900'
                  }
                `}>
                  {todo.title}
                </h3>
                
                {/* Quantity */}
                <span className={`
                  text-sm font-medium ml-3 flex-shrink-0
                  ${todo.completed ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {getQuantity()}
                </span>
              </div>

              {/* Optional description */}
              {todo.description && (
                <p className={`
                  text-sm mt-1
                  ${todo.completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-500'
                  }
                `}>
                  {todo.description}
                </p>
              )}

              {/* Tags/Category (minimal) */}
              {(todo.category || (todo.tags && todo.tags.length > 0)) && (
                <div className="flex items-center mt-2 space-x-2">
                  {todo.category && (
                    <span className="
                      px-2 py-1 
                      bg-gray-100 
                      text-gray-600 
                      text-xs 
                      rounded-lg 
                      font-medium
                    ">
                      {todo.category}
                    </span>
                  )}
                  
                  {(todo.tags || []).slice(0, 1).map((tag, index) => (
                    <span
                      key={index}
                      className="
                        px-2 py-1 
                        bg-blue-50 
                        text-blue-600 
                        text-xs 
                        rounded-lg 
                        font-medium
                      "
                    >
                      #{tag}
                    </span>
                  ))}

                  {(todo.tags && todo.tags.length > 1) && (
                    <span className="text-xs text-gray-400">
                      +{todo.tags.length - 1}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 