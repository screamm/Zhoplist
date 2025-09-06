import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { ChevronRight, Plus, Check, ShoppingCart, Sparkles } from 'lucide-react';
import type { Todo } from '../types/index.js';
import { AddItemModal } from './AddItemModal.js';
import { generateShoppingMockData } from '../utils/shoppingMockData.js';

interface CategoryCardProps {
  category: Category;
  items: Todo[];
  onCategoryClick: () => void;
  isExpanded: boolean;
  onAddItem: (categoryId: string) => void;
  onToggleItem: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onAddItem,
  onToggleItem
}) => {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="mb-3">
      <div 
        onClick={onCategoryClick}
        className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
        style={{ 
          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}25 100%)`,
          borderLeft: `4px solid ${category.color}`
        }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md"
                style={{ backgroundColor: category.color + '30' }}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                <p className="text-gray-300 text-sm">
                  {totalCount === 0 ? 'Inga varor' : 
                   completedCount === totalCount ? '✓ Klart!' :
                   `${completedCount}/${totalCount} klara`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {totalCount > 0 && (
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="24"
                      stroke="#ffffff20"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="24"
                      stroke={category.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - progressPercentage / 100)}`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
              )}
              <ChevronRight 
                className={`w-5 h-5 text-white transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 space-y-2">
          {items.map(item => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(item.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${item.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-400 hover:border-white'}`}
                  style={{ borderColor: item.completed ? category.color : undefined }}
                >
                  {item.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span className={`${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                  {item.title}
                </span>
              </div>
              {item.description && (
                <span className="text-gray-400 text-sm">{item.description}</span>
              )}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddItem(category.id);
            }}
            className="w-full p-2 rounded-lg border-2 border-dashed border-gray-600 hover:border-white hover:bg-gray-700/30 transition-all flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Lägg till vara</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const CategoryView: React.FC = () => {
  const { filteredTodos, toggleTodo, createTodo } = useTodo();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
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

  const uncategorizedItems = filteredTodos.filter(todo => !todo.category || !SHOPPING_CATEGORIES.find(cat => cat.id === todo.category));

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
    <div className="p-4 pb-20">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="w-7 h-7 mr-2" />
            Inköpslista
          </h2>
          {filteredTodos.length === 0 && (
            <button
              onClick={loadMockData}
              disabled={isLoadingMockData}
              className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg flex items-center gap-2 transition-all border border-purple-600/30"
            >
              <Sparkles className="w-4 h-4" />
              {isLoadingMockData ? 'Laddar...' : 'Fyll med exempeldata'}
            </button>
          )}
        </div>
        <p className="text-gray-400">Organiserad efter kategori</p>
      </div>

      <div className="space-y-2">
        {SHOPPING_CATEGORIES.map(category => {
          const items = getItemsByCategory(category.id);
          if (items.length === 0 && !expandedCategories.has(category.id)) {
            return null;
          }
          
          return (
            <CategoryCard
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

        {/* Show categories without items that can be expanded */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm mb-3">Lägg till i kategori:</p>
          <div className="grid grid-cols-2 gap-2">
            {SHOPPING_CATEGORIES.filter(cat => getItemsByCategory(cat.id).length === 0).map(category => (
              <button
                key={category.id}
                onClick={() => handleAddItem(category.id)}
                className="p-3 rounded-xl flex items-center space-x-2 transition-all hover:shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}10 0%, ${category.color}20 100%)`,
                  border: `1px solid ${category.color}40`
                }}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-white text-sm">{category.name}</span>
                <Plus className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Uncategorized items */}
        {uncategorizedItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-400 text-sm mb-2">Okategoriserat</h3>
            <div className="bg-gray-800/50 rounded-xl p-3 space-y-2">
              {uncategorizedItems.map(item => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTodo(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${item.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-400 hover:border-white'}`}
                    >
                      {item.completed && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <span className={`${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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