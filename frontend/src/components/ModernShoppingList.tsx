import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { useLanguage } from '../context/LanguageContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { Plus, Sparkles, Settings } from 'lucide-react';
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
}

const CategoryRow: React.FC<CategoryRowProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onAddItem
}) => {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <div style={{ 
      marginBottom: '2px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Expansion */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, ${category.color}15 0%, transparent 100%)`,
          transform: isExpanded ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 0
        }}
      />
      
      {/* Category Header */}
      <div 
        onClick={onCategoryClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Expanding Color Bar */}
        <div 
          style={{ 
            position: 'absolute',
            left: '16px',
            top: isExpanded ? '12px' : '50%',
            transform: isExpanded ? 'translateY(0%)' : 'translateY(-50%)',
            width: isExpanded ? '8px' : '5px',
            height: isExpanded ? `${72 + (items.length * 45)}px` : '52px',
            borderRadius: '25px',
            backgroundColor: category.color,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1,
            boxShadow: isExpanded ? `0 0 20px ${category.color}60` : 'none'
          }}
        />
        
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
            flexShrink: 0,
            transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 3
          }}
        >
          {getCategoryIcon(category.id, 'white')}
        </div>
        
        {/* Category Name */}
        <div style={{ flex: 1, zIndex: 2 }}>
          <h3 style={{ 
            color: 'white',
            fontWeight: isExpanded ? '600' : '500',
            fontSize: isExpanded ? '19px' : '17px',
            margin: 0,
            letterSpacing: '0.2px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>{t[category.nameKey as keyof typeof t]}</h3>
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
            flexShrink: 0,
            zIndex: 3
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

      {/* Expanded Items with Animation */}
      <div 
        style={{
          maxHeight: isExpanded ? `${items.length * 45 + 20}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ 
          paddingLeft: '88px', 
          paddingRight: '16px', 
          paddingBottom: '12px',
          transform: isExpanded ? 'translateY(0px)' : 'translateY(-10px)',
          opacity: isExpanded ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
        }}>
          {items.map((item) => (
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
                transition: 'opacity 0.2s',
                borderLeft: `2px solid ${category.color}30`,
                paddingLeft: '12px',
                marginLeft: '-12px'
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
                  backgroundColor: hoveredItem === item.id ? `${category.color}30` : 'transparent',
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
                  color: hoveredItem === item.id ? category.color : 'rgba(255, 255, 255, 0.5)' 
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ModernShoppingList: React.FC = () => {
  const { filteredTodos, createTodo } = useTodo();
  const { t, language, setLanguage } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoadingMockData, setIsLoadingMockData] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
      background: 'linear-gradient(180deg, #001122 0%, #1e3a8a 100%)',
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
          }}>{t.shoppingList}</h1>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            <Settings style={{ width: '20px', height: '20px', color: 'white' }} />
          </button>
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
            />
          );
        })}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '24px',
            width: '300px',
            maxWidth: '90vw'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>{t.settings}</h2>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                fontWeight: '500',
                display: 'block',
                marginBottom: '8px'
              }}>
                {t.language}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'sv' | 'en')}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: '#334155',
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                <option value="sv">Svenska</option>
                <option value="en">English</option>
              </select>
            </div>
            
            {filteredTodos.length === 0 && (
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => {
                    loadMockData();
                    setShowSettings(false);
                  }}
                  disabled={isLoadingMockData}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: isLoadingMockData ? 'not-allowed' : 'pointer',
                    opacity: isLoadingMockData ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles style={{ width: '16px', height: '16px' }} />
                  {t.loadSampleData}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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