import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { Plus, Check, Menu, Sparkles } from 'lucide-react';
import type { Todo } from '../types/index.js';
import { AddItemModal } from './AddItemModal.js';
import { generateShoppingMockData } from '../utils/shoppingMockData.js';
import { getCategoryIcon } from './CategoryIcons.js';

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <div style={{ marginBottom: '2px' }}>
      {/* Category Header */}
      <div 
        onClick={onCategoryClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Rounded Color Bar */}
        {!isExpanded && (
          <div 
            style={{ 
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '5px',
              height: '52px',
              borderRadius: '25px',
              backgroundColor: category.color,
              transition: 'all 0.3s ease',
              zIndex: 2
            }}
          />
        )}
        
        {/* Icon with gradient background */}
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '24px',
            marginRight: '16px',
            background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
            boxShadow: `0 4px 12px ${category.color}40`,
            flexShrink: 0
          }}
        >
          {getCategoryIcon(category.id, 'white')}
        </div>
        
        {/* Category Name */}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: 'white',
            fontWeight: '500',
            fontSize: '17px',
            margin: 0,
            letterSpacing: '0.2px'
          }}>{category.name}</h3>
        </div>
        
        {/* Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddItem(category.id);
          }}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Plus style={{ width: '18px', height: '18px', color: 'rgba(255, 255, 255, 0.8)' }} />
        </button>
      </div>

      {/* Expanded Items */}
      {isExpanded && (
        <div style={{ position: 'relative' }}>
          {/* Continuous Color Bar */}
          <div 
            style={{ 
              position: 'absolute',
              left: '16px',
              top: '-48px',
              width: '5px',
              height: `calc(100% + 48px)`,
              backgroundColor: category.color,
              borderRadius: '25px',
              zIndex: 1
            }}
          />
          
          <div style={{ paddingLeft: '88px', paddingRight: '16px', paddingBottom: '12px' }}>
            {items.map((item, index) => (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  opacity: item.completed ? 0.5 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  flex: 1 
                }}>
                  <span style={{
                    color: item.completed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.85)',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}>
                    {item.title}
                  </span>
                </div>
                
                {/* Add button for individual items */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddItem(category.id);
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: hoveredItem === item.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Plus style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: 'rgba(255, 255, 255, 0.5)' 
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ModernShoppingList: React.FC = () => {
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
      // Close all others and open this one
      newExpanded.clear();
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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a0033 0%, #2d1b69 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '0 16px',
        paddingTop: '48px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
            <div style={{ width: '14px', height: '2px', backgroundColor: 'white' }}></div>
          </button>
          
          <h1 style={{ 
            color: 'white', 
            fontSize: '17px', 
            fontWeight: '600', 
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            margin: 0
          }}>Shopping List</h1>
          
          {filteredTodos.length === 0 ? (
            <button
              onClick={loadMockData}
              disabled={isLoadingMockData}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: isLoadingMockData ? 'not-allowed' : 'pointer',
                opacity: isLoadingMockData ? 0.5 : 1
              }}
            >
              <Sparkles style={{ width: '20px', height: '20px', color: 'white' }} />
            </button>
          ) : (
            <div style={{ width: '36px' }}></div>
          )}
        </div>
      </div>

      {/* Categories List */}
      <div style={{ padding: '20px 0' }}>
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