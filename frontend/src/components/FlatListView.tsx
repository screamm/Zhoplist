import React from 'react';
import type { Todo } from '../types/index.js';
import { SHOPPING_CATEGORIES } from '../types/categories.js';
import { getCategoryIcon } from './CategoryIcons.js';

interface FlatListViewProps {
  items: Todo[];
  onToggleItem: (itemId: string) => void;
}

export const FlatListView: React.FC<FlatListViewProps> = ({ items, onToggleItem }) => {
  // Get category info for each item
  const getItemCategoryInfo = (categoryId?: string) => {
    if (!categoryId) return { color: '#6b7280', icon: null };
    const category = SHOPPING_CATEGORIES.find(cat => cat.id === categoryId);
    return {
      color: category?.color || '#6b7280',
      icon: category ? getCategoryIcon(category.id, 'white') : null
    };
  };

  return (
    <div style={{ 
      padding: '20px 16px',
      paddingBottom: '140px',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      flex: 1
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => {
          const categoryInfo = getItemCategoryInfo(item.category);
          
          return (
            <div 
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: item.completed ? 0.5 : 1,
                transition: 'all 0.2s',
                cursor: 'pointer',
                borderLeft: `4px solid ${categoryInfo.color}`,
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flex: 1 
              }}>
                {/* Category icon */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${categoryInfo.color}, ${categoryInfo.color}dd)`,
                  flexShrink: 0,
                  opacity: item.completed ? 0.6 : 1,
                  transition: 'opacity 0.2s'
                }}>
                  {categoryInfo.icon}
                </div>

                {/* Checkmark circle */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${item.completed ? categoryInfo.color : 'rgba(255, 255, 255, 0.3)'}`,
                  backgroundColor: item.completed ? categoryInfo.color : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s'
                }}>
                  {item.completed && (
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
                
                <span style={{
                  color: item.completed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.85)',
                  textDecoration: item.completed ? 'line-through' : 'none',
                  fontSize: '16px',
                  fontWeight: '400',
                  transition: 'all 0.2s'
                }}>
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
        
        {items.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '16px',
            padding: '40px 20px'
          }}>
            Inga varor att visa
          </div>
        )}
      </div>
    </div>
  );
};