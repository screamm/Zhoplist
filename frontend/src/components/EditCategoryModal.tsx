import React, { useState, useEffect } from 'react';
import { X, Palette, Hash, Trash2 } from 'lucide-react';
// import { useLanguage } from '../context/LanguageContext';
import { CustomIcon } from './AddCategoryModal';
import type { CustomCategory } from '../utils/customCategories';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updates: { name: string; icon: string; color: string }) => void;
  onDelete: () => void;
  category?: CustomCategory;
}

const DEFAULT_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6',
  '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
  '#F43F5E', '#64748B', '#6B7280', '#374151', '#1F2937'
];

const ICON_TYPES = [
  'box', 'sports', 'electronics', 'garden', 'pets', 'baby',
  'tools', 'books', 'auto', 'health', 'office', 'music'
];

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  category
}) => {
  // const { t } = useLanguage();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICON_TYPES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize form with category data
  useEffect(() => {
    if (category && isOpen) {
      setName(category.name);
      setSelectedColor(category.color);
      setSelectedIcon(category.icon);
      setShowDeleteConfirm(false);
    }
  }, [category, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      onUpdate({
        name: name.trim(),
        icon: selectedIcon,
        color: selectedColor
      });
      onClose();
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
      onClose();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] shadow-2xl border-t sm:border border-gray-700 overflow-hidden flex flex-col">
        
        {/* Mobile handle bar */}
        <div className="sm:hidden w-12 h-1 bg-gray-600 rounded-full mx-auto mt-3 mb-2"></div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Redigera kategori</h2>
              <p className="text-sm text-gray-400 mt-1">Ändra namn, ikon eller färg för din kategori</p>
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
            
            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <h3 className="text-red-400 font-medium">Ta bort kategori?</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Är du säker på att du vill ta bort kategorin "{category.name}"? 
                  Denna åtgärd kan inte ångras och alla varor i kategorin kommer att försvinna.
                </p>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors font-medium"
                  >
                    Ja, ta bort
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            )}
            
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
                {ICON_TYPES.map((iconType, index) => (
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
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                <Palette className="w-4 h-4 inline mr-1" />
                Välj färg
              </label>
              <div className="grid grid-cols-10 gap-2">
                {DEFAULT_COLORS.map((color, index) => (
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
            {!showDeleteConfirm && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-4 bg-red-600/20 text-red-400 rounded-2xl hover:bg-red-600/30 transition-all font-medium touch-target flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ta bort</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-4 bg-gray-800/50 text-gray-300 rounded-2xl hover:bg-gray-700 transition-all font-medium touch-target"
              disabled={isSubmitting}
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting || showDeleteConfirm}
              className="flex-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-600/30 touch-target"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                  Uppdaterar...
                </>
              ) : (
                'Spara ändringar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};