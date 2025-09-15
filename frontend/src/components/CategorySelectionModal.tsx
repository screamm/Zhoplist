import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories';
import { getCategoryIcon } from './CategoryIcons';
import { useLanguage } from '../context/LanguageContext';
import { AddCategoryModal } from './AddCategoryModal';
import { customCategories, type CustomCategory } from '../utils/customCategories';

interface CategorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (categoryId: string) => void;
  itemName: string;
  availableCategories?: string[]; // Categories available in current list context
}

export const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  itemName,
  availableCategories
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [customCategoryList, setCustomCategoryList] = useState<CustomCategory[]>([]);
  const { t } = useLanguage();

  // Load custom categories when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomCategoryList(customCategories.getAllCategories());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Combine default and custom categories
  const allCategories: (Category | CustomCategory)[] = [
    ...SHOPPING_CATEGORIES,
    ...customCategoryList
  ];

  // Use provided categories or all categories
  const categoriesToShow = availableCategories 
    ? allCategories.filter(cat => availableCategories.includes(cat.id))
    : allCategories;

  const handleSelect = () => {
    if (selectedCategory) {
      onSelect(selectedCategory);
      onClose();
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg h-[95vh] sm:h-[85vh] sm:max-h-[750px] shadow-2xl border-t sm:border border-gray-700 overflow-hidden flex flex-col">
        
        {/* Mobile handle bar */}
        <div className="sm:hidden w-12 h-1 bg-gray-600 rounded-full mx-auto mt-3 mb-2"></div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{t.selectCategory}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {t.whichCategory?.replace('{item}', itemName) || `Which category does "${itemName}" belong to?`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-800 transition-colors touch-target"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {categoriesToShow.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  p-4 sm:p-3 rounded-xl border-2 transition-all duration-200 touch-target
                  flex flex-col items-center space-y-2 min-h-[100px] sm:min-h-[85px]
                  ${selectedCategory === category.id
                    ? `border-2 bg-opacity-20 shadow-lg`
                    : `border-gray-700 hover:border-gray-600 bg-gray-800/50`
                  }
                `}
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? category.color + '20' 
                    : undefined,
                  borderColor: selectedCategory === category.id 
                    ? category.color 
                    : undefined
                }}
              >
                {/* Category Icon */}
                <div 
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: category.color + '30' }}
                >
                  {getCategoryIcon(category.id, category.color, customCategoryList)}
                </div>
                
                {/* Category Name */}
                <span className="text-white font-medium text-sm sm:text-xs text-center leading-tight">
                  {t[category.nameKey as keyof typeof t] || category.name}
                </span>
              </button>
            ))}
          </div>

          {/* Add New Category Button */}
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="w-full p-3 rounded-xl border-2 border-dashed border-gray-600 hover:border-gray-500 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 touch-target flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 font-medium text-sm">{t.addNewCategory}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-4 border-t border-gray-800 flex gap-3 flex-shrink-0 pb-safe">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-4 sm:py-3 bg-gray-800/50 text-gray-300 rounded-2xl hover:bg-gray-700 transition-all font-medium touch-target text-base"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedCategory}
            className="flex-2 px-6 py-4 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-600/30 touch-target text-base"
          >
            {t.selectCategory}
          </button>
        </div>
      </div>
      
      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAdd={(categoryData) => {
          // Add the new category
          const newCategory = customCategories.addCategory(
            categoryData.name,
            categoryData.icon,
            categoryData.color
          );
          
          // Refresh the custom categories list
          setCustomCategoryList(customCategories.getAllCategories());
          
          // Auto-select the new category
          setSelectedCategory(newCategory.id);
          
          // Close the add category modal
          setShowAddCategoryModal(false);
        }}
      />
    </div>
  );
};