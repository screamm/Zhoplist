import React, { useState } from 'react';
import { X, Palette, Hash, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: { name: string; icon: string; color: string }) => void;
}

const DEFAULT_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6',
  '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
  '#F43F5E', '#64748B', '#6B7280', '#374151', '#1F2937'
];

// Custom SVG Icons for new categories
export const CustomIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const icons = {
    // General/Other
    box: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="12" rx="2" fill={color}/>
        <path d="M4 8L12 4L20 8" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M12 4V16" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    // Sports & Fitness
    sports: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill={color}/>
        <path d="M8 12H16" stroke="black" strokeWidth="1.5" opacity="0.3"/>
        <path d="M12 8V16" stroke="black" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
    // Electronics
    electronics: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="7" width="14" height="10" rx="2" fill={color}/>
        <rect x="6" y="8" width="12" height="6" rx="1" fill="black" opacity="0.2"/>
        <circle cx="12" cy="19" r="1" fill={color}/>
      </svg>
    ),
    // Garden
    garden: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 4C8 4 5 7 5 11C5 15 8 18 12 18C16 18 19 15 19 11C19 7 16 4 12 4Z" fill={color}/>
        <rect x="11" y="18" width="2" height="4" fill={color}/>
        <path d="M8 9C10 8 14 8 16 11" stroke="black" strokeWidth="1" opacity="0.3" fill="none"/>
      </svg>
    ),
    // Pets
    pets: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="14" r="6" fill={color}/>
        <circle cx="9" cy="8" r="2" fill={color}/>
        <circle cx="15" cy="8" r="2" fill={color}/>
        <circle cx="12" cy="12" r="1.5" fill="black" opacity="0.4"/>
        <path d="M10 16C11 17 13 17 14 16" stroke="black" strokeWidth="1" opacity="0.4" fill="none"/>
      </svg>
    ),
    // Baby
    baby: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 10L9 6H15L16 10V18C16 19 15 20 14 20H10C9 20 8 19 8 18V10Z" fill={color}/>
        <circle cx="12" cy="6" r="2" fill={color}/>
        <rect x="10" y="13" width="4" height="4" rx="1" fill="black" opacity="0.2"/>
      </svg>
    ),
    // Tools
    tools: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="3" height="16" rx="1.5" fill={color}/>
        <rect x="15" y="8" width="3" height="12" rx="1.5" fill={color}/>
        <circle cx="7.5" cy="4" r="2" fill={color}/>
        <circle cx="16.5" cy="8" r="2" fill={color}/>
      </svg>
    ),
    // Books
    books: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="4" width="4" height="16" rx="1" fill={color}/>
        <rect x="10" y="6" width="4" height="14" rx="1" fill={color}/>
        <rect x="15" y="8" width="4" height="12" rx="1" fill={color}/>
        <rect x="5.5" y="8" width="3" height="8" rx="0.5" fill="black" opacity="0.2"/>
      </svg>
    ),
    // Car/Auto
    auto: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L7 8H17L19 12V17C19 18 18 19 17 19H7C6 19 5 18 5 17V12Z" fill={color}/>
        <circle cx="8" cy="17" r="2" fill="black" opacity="0.3"/>
        <circle cx="16" cy="17" r="2" fill="black" opacity="0.3"/>
        <rect x="8" y="10" width="8" height="3" rx="1" fill="black" opacity="0.2"/>
      </svg>
    ),
    // Health
    health: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="8" y="6" width="8" height="12" rx="3" fill={color}/>
        <path d="M12 9V15" stroke="white" strokeWidth="2"/>
        <path d="M9 12H15" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    // Office
    office: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" fill={color}/>
        <rect x="8" y="7" width="8" height="10" rx="1" fill="black" opacity="0.2"/>
        <rect x="9" y="9" width="2" height="1" fill="white" opacity="0.5"/>
        <rect x="13" y="9" width="2" height="1" fill="white" opacity="0.5"/>
      </svg>
    ),
    // Music
    music: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 6L16 4V16" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="7" cy="17" r="3" fill={color}/>
        <circle cx="17" cy="15" r="3" fill={color}/>
      </svg>
    )
  };

  return icons[type as keyof typeof icons] || icons.box;
};

const ICON_TYPES = [
  'box', 'sports', 'electronics', 'garden', 'pets', 'baby',
  'tools', 'books', 'auto', 'health', 'office', 'music'
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICON_TYPES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      onAdd({
        name: name.trim(),
        icon: selectedIcon,
        color: selectedColor
      });
      
      // Reset form
      setName('');
      setSelectedColor(DEFAULT_COLORS[0]);
      setSelectedIcon(ICON_TYPES[0]);
      onClose();
    } catch (error) {
      console.error('Failed to add category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setSelectedColor(DEFAULT_COLORS[0]);
    setSelectedIcon(ICON_TYPES[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] shadow-2xl border-t sm:border border-gray-700 overflow-hidden flex flex-col">
        
        {/* Mobile handle bar */}
        <div className="sm:hidden w-12 h-1 bg-gray-600 rounded-full mx-auto mt-3 mb-2"></div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{t.addNewCategory}</h2>
              <p className="text-sm text-gray-400 mt-1">Skapa en egen kategori för dina varor</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-gray-800 transition-colors touch-target"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* Category Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Kategorinamn *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="t.ex. Husdjur, Sport, Elektronik"
                className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-800 focus:outline-none transition-all text-base touch-target"
                maxLength={20}
                autoFocus
              />
              <p className="text-xs text-gray-500">{name.length}/20 tecken</p>
            </div>

            {/* Icon Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                <Hash className="w-4 h-4 inline mr-1" />
                Välj ikon
              </label>
              <div className="grid grid-cols-6 gap-3">
                {(showAllIcons ? ICON_TYPES : ICON_TYPES.slice(0, 5)).map((iconType, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedIcon(iconType)}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center transition-all touch-target p-2
                      ${selectedIcon === iconType
                        ? 'bg-purple-600 shadow-lg shadow-purple-600/30'
                        : 'bg-gray-800/50 hover:bg-gray-700'
                      }
                    `}
                  >
                    <CustomIcon type={iconType} color={selectedIcon === iconType ? 'white' : selectedColor} />
                  </button>
                ))}
                {/* Show More/Less Button */}
                <button
                  type="button"
                  onClick={() => setShowAllIcons(!showAllIcons)}
                  className="aspect-square rounded-lg flex items-center justify-center transition-all touch-target bg-gray-800/50 hover:bg-gray-700 border-2 border-dashed border-gray-600"
                >
                  {showAllIcons ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                <Palette className="w-4 h-4 inline mr-1" />
                Välj färg
              </label>
              <div className="grid grid-cols-10 gap-2">
                {(showAllColors ? DEFAULT_COLORS : DEFAULT_COLORS.slice(0, 9)).map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`
                      aspect-square rounded-lg transition-all touch-target
                      ${selectedColor === color
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
                        : 'hover:scale-105'
                      }
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {/* Show More/Less Button */}
                <button
                  type="button"
                  onClick={() => setShowAllColors(!showAllColors)}
                  className="aspect-square rounded-lg flex items-center justify-center transition-all touch-target bg-gray-800/50 hover:bg-gray-700 border-2 border-dashed border-gray-600"
                >
                  {showAllColors ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Förhandsvisning</label>
              <div className="flex items-center justify-center p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                  style={{ backgroundColor: selectedColor + '30' }}
                >
                  <CustomIcon type={selectedIcon} color={selectedColor} />
                </div>
                <span className="text-white font-medium">
                  {name || 'Din kategori'}
                </span>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 flex gap-3 flex-shrink-0 pb-safe">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-4 bg-gray-800/50 text-gray-300 rounded-2xl hover:bg-gray-700 transition-all font-medium touch-target"
              disabled={isSubmitting}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-600/30 touch-target"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                  Skapar...
                </>
              ) : (
                'Skapa kategori'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};