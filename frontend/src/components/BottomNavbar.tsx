import React from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

interface BottomNavbarProps {
  onAddItem: () => void;
  onDeleteCompleted: () => void;
  onToggleView: () => void;
  completedCount: number;
  uncrossedCount: number;
  viewMode: 'categorized' | 'flat';
  className?: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  onAddItem,
  onDeleteCompleted,
  onToggleView,
  completedCount,
  uncrossedCount,
  viewMode,
  className = ''
}) => {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-40
      bg-white/10 backdrop-blur-xl border-t border-white/20
      pt-4 pb-8 py-3 safe-area-bottom bottom-nav-container
      ${className}
    `}>
      <div className="grid grid-cols-3 gap-4 items-center max-w-lg mx-auto">
        <style dangerouslySetInnerHTML={{__html: `
          .bottom-nav-container { contain: layout style; will-change: transform; }
          .nav-icon-container { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; contain: size layout; }
          .nav-button-left { display: flex; justify-content: flex-start; align-items: center; }
          .nav-button-center { display: flex; justify-content: center; align-items: center; }
          .nav-button-right { display: flex; justify-content: flex-end; align-items: center; }
          .nav-text-container { min-width: 20px; text-align: center; flex-shrink: 0; }
          .trash-btn-stable { opacity: 1; transform: translateZ(0); backface-visibility: hidden; }
        `}} />
        {/* Delete completed button */}
        <div className="nav-button-left">
          <button
            onClick={onDeleteCompleted}
            disabled={completedCount === 0}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-2xl trash-btn-stable
              transition-colors duration-200
              ${completedCount > 0 
                ? 'bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30' 
                : 'bg-gray-500/10 border border-gray-400/20 text-gray-500 cursor-not-allowed'
              }
            `}
            title={`Ta bort ${completedCount} strukna varor`}
          >
            <div className="nav-icon-container">
              <Trash2 size={18} />
            </div>
            <span className="text-sm font-medium nav-text-container">
              {completedCount > 0 ? completedCount : ''}
            </span>
          </button>
        </div>

        {/* Add item button - Main CTA */}
        <div className="nav-button-center">
          <button
            onClick={onAddItem}
            className="
              w-16 h-16 
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
            <div className="nav-icon-container">
              <Plus size={24} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* View toggle button - shows uncrossed count */}
        <div className="nav-button-right">
          <button
            onClick={onToggleView}
            className="
              flex items-center space-x-2 px-4 py-2 rounded-2xl
              bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-white/20
              active:scale-95
              transition-all duration-200
            "
            title={viewMode === 'categorized' 
              ? `Visa ${uncrossedCount} varor i lista`
              : `Visa ${uncrossedCount} varor efter kategori`
            }
          >
            <div className="nav-icon-container">
              <Check size={18} className="text-green-400" />
            </div>
            <span className="text-sm font-medium text-white/70 nav-text-container">
              {uncrossedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default BottomNavbar;