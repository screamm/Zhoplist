import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { ListManager } from './ListManager';
import { 
  FoodIcon, 
  MeatIcon, 
  DairyIcon, 
  FruitIcon, 
  VegetableIcon, 
  HouseholdIcon, 
  NoteIcon,
  SearchIcon,
  BackIcon,
  MoreIcon,
  CloseIcon,
  MenuIcon
} from './icons/Icons';

// Category configuration type
interface CategoryConfig {
  color: string;
  icon: React.FC<{ size: number; color: string }>;
  bgColor: string;
  featured?: boolean;
}

const categoryConfig: Record<string, CategoryConfig> = {
  'Mat': { color: 'from-orange-500 to-orange-600', icon: FoodIcon, bgColor: 'bg-orange-500' },
  'Kött': { color: 'from-yellow-500 to-yellow-600', icon: MeatIcon, bgColor: 'bg-yellow-500' },
  'Mejeri': { color: 'from-cyan-400 to-cyan-500', icon: DairyIcon, bgColor: 'bg-cyan-400', featured: true },
  'Frukt': { color: 'from-purple-500 to-purple-600', icon: FruitIcon, bgColor: 'bg-purple-500' },
  'Grönsaker': { color: 'from-green-500 to-green-600', icon: VegetableIcon, bgColor: 'bg-green-500' },
  'Hushåll': { color: 'from-blue-500 to-blue-600', icon: HouseholdIcon, bgColor: 'bg-blue-500' },
  'Övrigt': { color: 'from-gray-500 to-gray-600', icon: NoteIcon, bgColor: 'bg-gray-500' },
};

export const Header: React.FC = () => {
  const { state, setSearchQuery } = useTodo();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showListManager, setShowListManager] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Group todos by category
  const todosByCategory = React.useMemo(() => {
    const categories: Record<string, { todos: typeof state.todos, completed: number, total: number }> = {};
    if (!state?.todos) return categories;
    
    (state.todos || []).forEach(todo => {
      // Safety check for undefined/null todos
      if (!todo || typeof todo !== 'object') {
        return;
      }
      
      const category = todo.category || 'Övrigt';
      if (!categories[category]) {
        categories[category] = { todos: [], completed: 0, total: 0 };
      }
      categories[category].todos.push(todo);
      categories[category].total++;
      if (todo.completed) {
        categories[category].completed++;
      }
    });

    return categories;
  }, [state]);

  // Safety check for state
  if (!state) {
    return (
      <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
        <div className="flex items-center justify-center py-8">
          <div className="text-white">Laddar...</div>
        </div>
      </header>
    );
  }

  if (selectedCategory) {
    // Detail view for selected category
    const categoryData = todosByCategory[selectedCategory];
    const config = categoryConfig[selectedCategory as keyof typeof categoryConfig] || categoryConfig['Övrigt'];
    
    return (
      <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
        {/* Category Detail Header */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 text-white/80 hover:text-white"
            >
              <BackIcon size={18} color="currentColor" />
              <span className="text-sm font-medium">Tillbaka</span>
            </button>
            <button className="text-white/80 hover:text-white">
              <MoreIcon size={18} color="currentColor" />
            </button>
          </div>
          
          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
              <config.icon size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{selectedCategory}</h1>
            <p className="text-white/70">
              {categoryData?.completed || 0}/{categoryData?.total || 0} klara
            </p>
          </div>

          {/* Search in category */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <span className="text-white/60">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Sök i kategori..."
                value={state.searchQuery || ''}
                onChange={handleSearchChange}
                className="
                  w-full 
                  pl-12 pr-4
                  py-4
                  bg-white/10
                  backdrop-blur-xl
                  border border-white/20
                  rounded-2xl
                  text-white
                  placeholder-white/50
                  text-sm
                  outline-none
                  focus:border-white/40
                  focus:bg-white/20
                  transition-all duration-200
                "
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Main category list view (like the inspiration image)
  return (
    <header className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
      <div className="px-6 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setShowListManager(true)}
            className="text-white/80 hover:text-white transition-colors p-2 -m-2"
            title="Hantera Lista"
          >
            <MenuIcon size={20} color="currentColor" />
          </button>
          <h1 className="text-lg font-bold text-white tracking-wider">SHOPPING LIST</h1>
          <div className="w-6"></div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className={`
            relative
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            rounded-2xl
            transition-all duration-200
            ${isSearchFocused ? 'border-white/40 bg-white/20' : ''}
          `}>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className={`transition-colors duration-200 ${
                isSearchFocused ? 'text-white' : 'text-white/60'
              }`}>
                <SearchIcon size={16} color="currentColor" />
              </div>
            </div>

            <input
              type="text"
              placeholder="Vad letar du efter?"
              value={state.searchQuery || ''}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="
                w-full 
                pl-12 pr-4
                py-4
                bg-transparent
                text-white
                placeholder-white/50
                text-sm
                rounded-2xl
                outline-none
              "
            />

            {state.searchQuery && (
              <button
                onClick={handleClearSearch}
                className="
                  absolute right-4 top-1/2 transform -translate-y-1/2
                  w-6 h-6
                  bg-white/20
                  hover:bg-white/30
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-200
                "
              >
                <CloseIcon size={12} color="white" />
              </button>
            )}
          </div>
        </div>

        {/* Vertical Category List */}
        <div className="space-y-4">
          {Object.entries(todosByCategory).map(([category, data]) => {
            // Safety check for data
            if (!data || typeof data !== 'object' || !data.todos) {
              return null;
            }

            const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig['Övrigt'];
            const progress = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  relative
                  w-full
                  flex items-center
                  p-6
                  rounded-2xl
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  ${config.featured 
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-2xl shadow-cyan-500/25' 
                    : 'bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20'
                  }
                `}
                style={{
                  ...(config.featured && {
                    height: '120px',
                    backgroundImage: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  })
                }}
              >
                {/* Category Icon */}
                <div className={`
                  w-14 h-14 
                  ${config.featured ? 'bg-white/20' : config.bgColor}
                  rounded-full 
                  flex items-center justify-center 
                  mr-4
                  shadow-lg
                `}>
                  <config.icon size={24} color="white" />
                </div>

                {/* Category Content */}
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {category}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {data.total} {data.total === 1 ? 'artikel' : 'artiklar'}
                  </p>
                  
                  {config.featured && (
                    <div className="mt-2">
                      <div className="w-32 bg-white/20 rounded-full h-1">
                        <div
                          className="bg-white rounded-full h-1 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress indicator */}
                {!config.featured && (
                  <div className="text-right">
                    <div className="text-white/80 text-sm font-medium">
                      {progress}%
                    </div>
                    <div className="text-white/60 text-xs">
                      klar
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ListManager Modal */}
      <ListManager 
        isOpen={showListManager} 
        onClose={() => setShowListManager(false)} 
      />
    </header>
  );
}; 