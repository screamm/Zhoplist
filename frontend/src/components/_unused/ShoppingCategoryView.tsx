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
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div style={{ marginBottom: '8px' }}>
      {/* Category Header */}
      <div 
        onClick={onCategoryClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          cursor: 'pointer',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          borderRadius: '12px',
          transition: 'background-color 0.3s'
        }}
      >
        {/* Color Bar */}
        <div 
          style={{ 
            width: '3px',
            height: '48px',
            borderRadius: '2px',
            marginRight: '16px',
            flexShrink: 0,
            backgroundColor: category.color
          }}
        />
        
        {/* Icon */}
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            marginRight: '16px',
            flexShrink: 0,
            backgroundColor: category.color + '30'
          }}
        >
          {category.icon}
        </div>
        
        {/* Category Name */}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: 'white',
            fontWeight: '500',
            fontSize: '18px',
            margin: 0
          }}>{category.name}</h3>
        </div>
        
        {/* Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddItem(category.id);
          }}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <Plus style={{ width: '20px', height: '20px', color: 'rgba(255, 255, 255, 0.7)' }} />
        </button>
      </div>

      {/* Expanded Items */}
      {isExpanded && items.length > 0 && (
        <div style={{ paddingLeft: '67px', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map(item => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleItem(item.id);
                    }}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: item.completed ? '2px solid #22C55E' : '2px solid rgba(255, 255, 255, 0.4)',
                      backgroundColor: item.completed ? '#22C55E' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {item.completed && <Check style={{ width: '16px', height: '16px', color: 'white' }} />}
                  </button>
                  <span style={{
                    color: item.completed ? 'rgba(255, 255, 255, 0.4)' : 'white',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    fontSize: '16px'
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  <Plus style={{ width: '16px', height: '16px', color: 'rgba(255, 255, 255, 0.5)' }} />
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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '24px', height: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ width: '16px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '24px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '16px', height: '2px', backgroundColor: 'white' }}></div>
            </div>
          </div>
          <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '500', letterSpacing: '0.5px' }}>SHOPPING LIST</h1>
          {filteredTodos.length === 0 && (
            <button
              onClick={loadMockData}
              disabled={isLoadingMockData}
              style={{
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <Sparkles style={{ width: '16px', height: '16px' }} />
            </button>
          )}
          {filteredTodos.length > 0 && <div style={{ width: '24px' }}></div>}
        </div>
      </div>

      {/* Categories List */}
      <div style={{ padding: '0 16px' }}>
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