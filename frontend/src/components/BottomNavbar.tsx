import React from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

interface BottomNavbarProps {
  onAddItem: () => void;
  onDeleteCompleted: () => void;
  completedCount: number;
  className?: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  onAddItem,
  onDeleteCompleted,
  completedCount,
  className = ''
}) => {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-40
      bg-white/10 backdrop-blur-xl border-t border-white/20
      px-4 py-3 safe-area-bottom
      ${className}
    `}>
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Delete completed button */}
        <button
          onClick={onDeleteCompleted}
          disabled={completedCount === 0}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-2xl
            transition-all duration-200
            ${completedCount > 0 
              ? 'bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30' 
              : 'bg-gray-500/10 border border-gray-400/20 text-gray-500 cursor-not-allowed'
            }
          `}
          title={`Ta bort ${completedCount} strukna varor`}
        >
          <Trash2 size={18} />
          {completedCount > 0 && (
            <span className="text-sm font-medium">
              {completedCount}
            </span>
          )}
        </button>

        {/* Add item button - Main CTA */}
        <button
          onClick={onAddItem}
          className="
            w-14 h-14 
            bg-gradient-to-r from-cyan-400 to-cyan-500
            hover:from-cyan-500 hover:to-cyan-600
            active:scale-95
            rounded-full
            shadow-xl shadow-cyan-500/25
            flex items-center justify-center
            text-white
            transition-all duration-200
            border-2 border-white/20
          "
          title="Lägg till vara"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        {/* Completed indicator */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <Check size={18} className="text-green-400" />
          <span className="text-sm font-medium text-white/70">
            {completedCount}
          </span>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default BottomNavbar;