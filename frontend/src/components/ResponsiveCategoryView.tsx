import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { 
  ChevronRight, 
  Plus, 
  Check, 
  ShoppingCart, 
  Sparkles, 
  Grid3X3,
  List,
  Search,
  Filter
} from 'lucide-react';
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
  viewMode: 'grid' | 'list';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onAddItem,
  onToggleItem,
  viewMode
}) => {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="mb-4">
      <div 
        onClick={onCategoryClick}
        className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ 
          background: `linear-gradient(135deg, ${category.color}10 0%, ${category.color}25 100%)`,
          borderLeft: `4px solid ${category.color}`
        }}
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-md"
                style={{ backgroundColor: category.color + '30' }}
              >
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg truncate">{category.name}</h3>
                <p className="text-gray-300 text-sm">
                  {totalCount === 0 ? 'Tom' : 
                   completedCount === totalCount && totalCount > 0 ? '✓ Klart!' :
                   `${completedCount}/${totalCount} klara`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {totalCount > 0 && (
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 transform -rotate-90">
                    <circle
                      cx={viewMode === 'grid' ? '24' : '28'}
                      cy={viewMode === 'grid' ? '24' : '28'}
                      r={viewMode === 'grid' ? '18' : '20'}
                      stroke="#ffffff20"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx={viewMode === 'grid' ? '24' : '28'}
                      cy={viewMode === 'grid' ? '24' : '28'}
                      r={viewMode === 'grid' ? '18' : '20'}
                      stroke={category.color}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * (viewMode === 'grid' ? 18 : 20)}`}
                      strokeDashoffset={`${2 * Math.PI * (viewMode === 'grid' ? 18 : 20) * (1 - progressPercentage / 100)}`}
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

      {/* Expanded Items */}
      {isExpanded && (
        <div className="mt-3 bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 space-y-2 animate-fade-in-up">
          {items.map(item => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 transition-colors group"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(item.id);
                  }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95
                    ${item.completed 
                      ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' 
                      : 'border-gray-400 hover:border-white hover:bg-gray-700/20'}`}
                  style={{ borderColor: item.completed ? category.color : undefined }}
                >
                  {item.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <span className={`block truncate transition-all duration-300 ${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="block text-gray-400 text-sm truncate">{item.description}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddItem(category.id);
            }}
            className="w-full p-3 rounded-lg border-2 border-dashed border-gray-600 hover:border-white hover:bg-gray-700/20 transition-all flex items-center justify-center space-x-2 group"
          >
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-gray-400 group-hover:text-white transition-colors">Lägg till vara</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const ResponsiveCategoryView: React.FC = () => {
  const { filteredTodos, toggleTodo, createTodo } = useTodo();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoadingMockData, setIsLoadingMockData] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-expand categories with items on mobile
  useEffect(() => {
    const categoriesWithItems = SHOPPING_CATEGORIES
      .filter(cat => getItemsByCategory(cat.id).length > 0)
      .map(cat => cat.id);
    
    // On mobile, auto-expand first category with items
    if (window.innerWidth <= 768 && categoriesWithItems.length > 0) {
      setExpandedCategories(new Set([categoriesWithItems[0]]));
    }
  }, [filteredTodos]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    
    // On mobile, only one category open at a time
    if (window.innerWidth <= 768) {
      newExpanded.clear();
      if (!expandedCategories.has(categoryId)) {
        newExpanded.add(categoryId);
      }
    } else {
      // On desktop, multiple can be open
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
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

  const uncategorizedItems = filteredTodos.filter(todo => 
    !todo.category || !SHOPPING_CATEGORIES.find(cat => cat.id === todo.category)
  );

  const categoriesWithItems = SHOPPING_CATEGORIES.filter(cat => 
    getItemsByCategory(cat.id).length > 0
  );

  const categoriesWithoutItems = SHOPPING_CATEGORIES.filter(cat => 
    getItemsByCategory(cat.id).length === 0
  );

  const filteredCategories = searchQuery 
    ? SHOPPING_CATEGORIES.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getItemsByCategory(cat.id).some(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : SHOPPING_CATEGORIES;

  const totalItems = filteredTodos.length;
  const completedItems = filteredTodos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Zhoplist</h1>
                <p className="text-gray-300 text-sm hidden sm:block">Smart inköpslista</p>
              </div>
            </div>
            
            {/* Desktop view controls */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
              
              {filteredTodos.length === 0 && (
                <button
                  onClick={loadMockData}
                  disabled={isLoadingMockData}
                  className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg flex items-center gap-2 transition-all border border-purple-600/30 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoadingMockData ? 'Laddar...' : 'Fyll med exempeldata'}
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          {totalItems > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-300">
                  <span className="font-semibold text-white">{totalItems}</span> varor
                </span>
                <span className="text-gray-300">
                  <span className="font-semibold text-green-400">{completedItems}</span> klara
                </span>
                <span className="text-gray-300">
                  <span className="font-semibold text-purple-400">{totalItems - completedItems}</span> kvar
                </span>
              </div>
              
              {/* Mobile view toggle */}
              <div className="lg:hidden flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-all backdrop-blur-sm"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 pb-32">
        {/* Empty state */}
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
              <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">Din inköpslista är tom</h2>
            <p className="text-gray-400 text-center mb-8 max-w-sm">Börja lägg till varor eller fyll listan med exempeldata</p>
            <button
              onClick={loadMockData}
              disabled={isLoadingMockData}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/30"
            >
              <Sparkles className="w-5 h-5" />
              {isLoadingMockData ? 'Laddar...' : 'Fyll med exempeldata'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Categories with items */}
            <div className={viewMode === 'grid' ? 
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 
              'space-y-4'
            }>
              {categoriesWithItems.map(category => {
                const items = getItemsByCategory(category.id);
                return (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    items={items}
                    isExpanded={expandedCategories.has(category.id)}
                    onCategoryClick={() => toggleCategory(category.id)}
                    onAddItem={handleAddItem}
                    onToggleItem={toggleTodo}
                    viewMode={viewMode}
                  />
                );
              })}
            </div>

            {/* Add to empty categories */}
            {categoriesWithoutItems.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-300">Lägg till i kategori</h3>
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors lg:hidden"
                  >
                    {showAllCategories ? 'Visa färre' : 'Visa alla'}
                  </button>
                </div>
                
                <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 transition-all duration-300 ${!showAllCategories ? 'lg:grid-cols-6' : ''}`}>
                  {categoriesWithoutItems
                    .slice(0, showAllCategories || window.innerWidth >= 1024 ? undefined : 6)
                    .map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleAddItem(category.id)}
                      className="p-3 sm:p-4 rounded-xl flex flex-col items-center space-y-2 transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
                      style={{ 
                        background: `linear-gradient(135deg, ${category.color}08 0%, ${category.color}15 100%)`,
                        border: `1px solid ${category.color}30`
                      }}
                    >
                      <span className="text-2xl sm:text-3xl">{category.icon}</span>
                      <span className="text-white text-xs sm:text-sm font-medium text-center leading-tight">{category.name}</span>
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Uncategorized items */}
            {uncategorizedItems.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Okategoriserat</h3>
                <div className="bg-gray-800/40 rounded-xl p-4 space-y-2 backdrop-blur-sm border border-gray-700/50">
                  {uncategorizedItems.map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleTodo(item.id)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95
                            ${item.completed 
                              ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' 
                              : 'border-gray-400 hover:border-white'}`}
                        >
                          {item.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span className={`block truncate ${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="block text-gray-400 text-sm truncate">{item.description}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button - Mobile only */}
      <button
        onClick={() => {
          setSelectedCategory(null);
          setIsAddModalOpen(true);
        }}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full shadow-lg shadow-purple-600/30 flex items-center justify-center z-30 transition-all transform hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Item Modal */}
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