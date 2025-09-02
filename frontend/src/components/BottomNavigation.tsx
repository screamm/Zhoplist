import React from 'react';
import { Home, List, BarChart3, Settings, Plus } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  itemCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  onAddClick,
  itemCounts 
}) => {
  const tabs = [
    { id: 'categories', icon: Home, label: 'Kategorier' },
    { id: 'list', icon: List, label: 'Lista', badge: itemCounts.pending },
    { id: 'completed', icon: BarChart3, label: 'Klart', badge: itemCounts.completed },
    { id: 'settings', icon: Settings, label: 'Inställningar' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur */}
      <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50">
        {/* Safe area padding */}
        <div className="px-4 pt-2 pb-safe">
          <div className="flex items-center justify-around relative">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                {/* Add button in the middle */}
                {index === 2 && (
                  <button
                    onClick={onAddClick}
                    className="relative -top-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full shadow-lg shadow-purple-600/30 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                )}
                
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[4rem] relative
                    ${activeTab === tab.id 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <div className="relative">
                    <tab.icon className="w-5 h-5 mb-1" />
                    {tab.badge && tab.badge > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{tab.badge > 99 ? '99+' : tab.badge}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
