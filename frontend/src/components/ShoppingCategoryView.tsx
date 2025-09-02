import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { Plus, Check, Sparkles } from 'lucide-react';
import type { Todo } from '../types/index.js';
import { AddItemModal } from './AddItemModal.js';
import { generateShoppingMockData } from '../utils/shoppingMockData.js';

interface CategoryRowProps {
  category: Category;
  items: Todo[];
  onCategoryClick: () => void;
  isExpanded: boolean;
  onAddItem: (categoryId: string) => void;
  onToggleItem: (id: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onAddItem,
  onToggleItem
}) => {
  return (
    <div className="mb-1">
      {/* Category Header */}
      <div 
        onClick={onCategoryClick}
        className="flex items-center p-4 cursor-pointer hover:bg-gray-700/30 transition-colors rounded-lg"
      >
        {/* Color Bar */}
        <div 
          className="w-2 h-12 rounded-full mr-4 flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />
        
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 flex-shrink-0"
          style={{ backgroundColor: category.color + '20' }}
        >
          {category.icon}
        </div>
        
        {/* Category Name */}
        <div className="flex-1">
          <h3 className="text-white font-medium text-lg">{category.name}</h3>
        </div>
        
        {/* Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddItem(category.id);
          }}
          className="w-8 h-8 rounded-full bg-gray-600/50 hover:bg-gray-500/50 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <Plus className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Expanded Items */}
      {isExpanded && items.length > 0 && (
        <div className="pl-6 pb-4">
          {/* Color Bar continues */}
          <div 
            className="w-2 ml-1 rounded-b-full relative"
            style={{ backgroundColor: category.color + '40', height: `${items.length * 56}px` }}
          />
          
          <div className="ml-6 space-y-2">
            {items.map(item => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleItem(item.id);
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${item.completed 
                        ? 'border-green-500' 
                        : 'border-gray-400 hover:border-white'}`}
                    style={{ 
                      backgroundColor: item.completed ? '#22C55E' : 'transparent'
                    }}
                  >
                    {item.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <span className={`${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {item.title}
                  </span>
                </div>
                
                {/* Add button for individual items */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem(category.id);
                  }}
                  className="w-6 h-6 rounded-full bg-gray-600/30 hover:bg-gray-500/50 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ShoppingCategoryView: React.FC = () => {
  const { filteredTodos, toggleTodo, createTodo } = useTodo();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['dairy'])); // Default dairy expanded like in image
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoadingMockData, setIsLoadingMockData] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddItem = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsAddModalOpen(true);
  };

  const getItemsByCategory = (categoryId: string) => {
    return filteredTodos.filter(todo => todo.category === categoryId);
  };

  const loadMockData = async () => {
    setIsLoadingMockData(true);
    const mockItems = generateShoppingMockData();
    
    for (const item of mockItems) {
      await createTodo({
        title: item.title,
        description: item.description,
        category: item.category,
        priority: item.priority
      });
    }
    
    setIsLoadingMockData(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <div className="pt-safe-top px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6">
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-4 h-0.5 bg-white"></div>
            </div>
          </div>
          <h1 className="text-white text-lg font-medium">SHOPPING LIST</h1>
          {filteredTodos.length === 0 && (
            <button
              onClick={loadMockData}
              disabled={isLoadingMockData}
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
          {filteredTodos.length > 0 && <div className="w-6"></div>}
        </div>
      </div>

      {/* Categories List */}
      <div className="px-4">
        {SHOPPING_CATEGORIES.map(category => {
          const items = getItemsByCategory(category.id);
          
          return (
            <CategoryRow
              key={category.id}
              category={category}
              items={items}
              isExpanded={expandedCategories.has(category.id)}
              onCategoryClick={() => toggleCategory(category.id)}
              onAddItem={handleAddItem}
              onToggleItem={toggleTodo}
            />
          );
        })}
      </div>

      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedCategory(null);
        }}
        defaultCategory={selectedCategory || undefined}
      />
    </div>
  );
};