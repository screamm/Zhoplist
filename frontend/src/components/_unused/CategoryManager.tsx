// UI för att hantera kategorier - användare kan lägga till/ta bort/redigera
import { useState, useEffect } from 'react';
import { categoryManager, type CustomCategory } from '../utils/categoryManager';
import { Plus, Edit2, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange?: () => void; // Callback när kategorier ändras
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  onCategoryChange
}) => {
  const [categories, setCategories] = useState<CustomCategory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [error, setError] = useState<string>('');

  // Ladda kategorier
  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = () => {
    setCategories(categoryManager.getAllCategories());
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setError('Kategorinamn krävs');
      return;
    }

    try {
      categoryManager.addCustomCategory(
        newCategoryName.trim(),
        newCategoryIcon || '📦'
      );
      
      loadCategories();
      setIsAddingNew(false);
      setNewCategoryName('');
      setNewCategoryIcon('');
      setError('');
      onCategoryChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    }
  };

  const handleEditCategory = (category: CustomCategory) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditIcon(category.icon);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editName.trim()) {
      setError('Kategorinamn krävs');
      return;
    }

    try {
      categoryManager.updateCategory(editingId, {
        name: editName.trim(),
        icon: editIcon || '📦'
      });

      loadCategories();
      setEditingId(null);
      setError('');
      onCategoryChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    }
  };

  const handleRemoveCategory = (id: string) => {
    const category = categoryManager.getCategory(id);
    if (!category) return;

    if (!categoryManager.canRemoveCategory(id)) {
      setError(`Kategorin "${category.name}" kan inte tas bort`);
      return;
    }

    if (confirm(`Är du säker på att du vill ta bort kategorin "${category.name}"?`)) {
      try {
        categoryManager.removeCategory(id);
        loadCategories();
        onCategoryChange?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ett fel uppstod');
      }
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const newOrder = [...categories];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    categoryManager.reorderCategories(newOrder.map(cat => cat.id));
    loadCategories();
    onCategoryChange?.();
  };

  const handleMoveDown = (index: number) => {
    if (index === categories.length - 1) return;
    
    const newOrder = [...categories];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    categoryManager.reorderCategories(newOrder.map(cat => cat.id));
    loadCategories();
    onCategoryChange?.();
  };

  const handleResetToDefaults = () => {
    if (confirm('Är du säker på att du vill återställa alla kategorier till standardinställningar? Detta tar bort alla anpassade kategorier.')) {
      categoryManager.resetToDefaults();
      loadCategories();
      onCategoryChange?.();
    }
  };

  // Emoji picker (enkelt urval)
  const commonEmojis = [
    '🥛', '🍎', '🥩', '🥫', '🍞', '❄️', '🥤', '🍬', 
    '🧼', '🧹', '🐕', '📦', '🏪', '🛒', '🍕', '🥗',
    '💊', '🧴', '🧽', '🍼', '🎂', '🍫', '🥜', '🥚'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Hantera Kategorier</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error meddelande */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Kategori-lista */}
        <div className="flex-1 overflow-y-auto max-h-96 p-6">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
              >
                {/* Kategori info */}
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {editingId === category.id ? (
                    // Edit mode
                    <>
                      <select
                        value={editIcon}
                        onChange={(e) => setEditIcon(e.target.value)}
                        className="w-8 h-8 text-lg border-none bg-transparent"
                      >
                        {commonEmojis.map(emoji => (
                          <option key={emoji} value={emoji}>{emoji}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Kategorinamn"
                        maxLength={50}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                    </>
                  ) : (
                    // View mode
                    <>
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-gray-900 truncate">{category.name}</span>
                      {category.isCustom && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          Anpassad
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  {editingId === category.id ? (
                    // Edit actions
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Spara"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Avbryt"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    // Normal actions
                    <>
                      {/* Move up/down */}
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
                        title="Flytta upp"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === categories.length - 1}
                        className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
                        title="Flytta ner"
                      >
                        <ChevronDown size={14} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Redigera"
                      >
                        <Edit2 size={14} />
                      </button>

                      {/* Remove */}
                      {category.removable && (
                        <button
                          onClick={() => handleRemoveCategory(category.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Ta bort"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Add new kategori */}
            {isAddingNew ? (
              <div className="flex items-center space-x-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <select
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  className="w-8 h-8 text-lg border-none bg-transparent"
                >
                  <option value="">📦</option>
                  {commonEmojis.map(emoji => (
                    <option key={emoji} value={emoji}>{emoji}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Kategorinamn"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  maxLength={50}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCategory();
                    if (e.key === 'Escape') {
                      setIsAddingNew(false);
                      setNewCategoryName('');
                      setNewCategoryIcon('');
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={handleAddCategory}
                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewCategoryName('');
                    setNewCategoryIcon('');
                  }}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
              >
                <Plus size={16} />
                <span>Lägg till kategori</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleResetToDefaults}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Återställ till standard
            </button>
            
            <div className="text-xs text-gray-500">
              {categories.filter(c => c.isCustom).length} anpassade kategorier
            </div>
          </div>
          
          <div className="mt-3 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Stäng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;