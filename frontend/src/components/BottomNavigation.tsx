import React from 'react';
import { useTodo } from '../context/TodoContext';
import { HomeIcon, ExploreIcon, ShoppingCartIcon, UserIcon } from './icons/Icons';

export const BottomNavigation: React.FC = () => {
  const { state, deleteCompleted } = useTodo();

  // Safety check for state
  if (!state) {
    return null;
  }

  const totalTodos = (state.todos || []).filter(todo => todo && typeof todo === 'object').length;
  const completedTodos = (state.todos || []).filter(todo => todo && typeof todo === 'object' && todo.completed).length;
  const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const navItems = [
    { icon: HomeIcon, label: 'Hem', active: false },
    { icon: ExploreIcon, label: 'Utforska', active: false },
    { icon: ShoppingCartIcon, label: 'Handla', active: true },
    { icon: UserIcon, label: 'Profil', active: false },
  ];

  return (
    <div className="
      fixed bottom-0 left-0 right-0
      bg-white/10
      backdrop-blur-xl
      border-t border-white/20
      px-6 py-4
      z-30
    ">
      {/* Progress Summary */}
      {totalTodos > 0 && (
        <div className="mb-4 px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm font-medium">
              {completedTodos}/{totalTodos} artiklar klara
            </span>
            <span className="text-cyan-400 text-sm font-bold">
              {progressPercentage}%
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Done Button */}
          {completedTodos > 0 && (
            <button
              onClick={deleteCompleted}
              className="
                w-full
                py-3
                bg-gradient-to-r from-green-500 to-green-600
                hover:from-green-600 hover:to-green-700
                rounded-xl
                text-white
                font-medium
                text-sm
                transition-all duration-200
                hover:scale-105
                active:scale-95
                shadow-lg
                shadow-green-500/25
              "
            >
              Rensa klara artiklar ({completedTodos})
            </button>
          )}
        </div>
      )}

      {/* Navigation Icons */}
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`
              flex flex-col items-center space-y-1
              py-2 px-3
              rounded-xl
              transition-all duration-200
              ${item.active 
                ? 'text-cyan-400 bg-cyan-400/20' 
                : 'text-white/60 hover:text-white/80 hover:bg-white/10'
              }
            `}
          >
            <item.icon size={20} color="currentColor" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 