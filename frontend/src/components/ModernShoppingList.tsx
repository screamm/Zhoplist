import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { useLanguage } from '../context/LanguageContext.js';
import { SHOPPING_CATEGORIES, type Category } from '../types/categories.js';
import { Sparkles } from 'lucide-react';
import type { Todo } from '../types/index.js';
import { AddItemModal } from './AddItemModal.js';
import { generateShoppingMockData } from '../utils/shoppingMockData.js';
import { getCategoryIcon } from './CategoryIcons.js';
import { BottomNavbar } from './BottomNavbar.js';
import { FlatListView } from './FlatListView.js';

interface CategoryRowProps {
  category: Category;
  items: Todo[];
  onCategoryClick: () => void;
  isExpanded: boolean;
  onToggleItem: (itemId: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onToggleItem
}) => {
  const { t } = useLanguage();
  
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
      </div>

      {/* Expanded Items with Animation */}
      <div 
        style={{
          maxHeight: isExpanded ? `${items.length * 55 + 40}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
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
              onClick={() => onToggleItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                opacity: item.completed ? 0.5 : 1,
                transition: 'all 0.2s',
                borderLeft: `2px solid ${category.color}30`,
                paddingLeft: '12px',
                marginLeft: '-12px',
                cursor: 'pointer',
                borderRadius: '8px',
                marginRight: '8px'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flex: 1 
              }}>
                {/* Checkmark circle */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${item.completed ? category.color : 'rgba(255, 255, 255, 0.3)'}`,
                  backgroundColor: item.completed ? category.color : 'transparent',
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
          ))}
        </div>
      </div>
    </div>
  );
};

export const ModernShoppingList: React.FC = () => {
  const { 
    filteredTodos, 
    createTodo, 
    setTodos, 
    showToast, 
    toggleTodo, 
    deleteCompleted,
    state,
    toggleViewMode,
    uncrossedCount,
    completedCount
  } = useTodo();
  const { t, language, setLanguage } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoadingMockData, setIsLoadingMockData] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [saveListName, setSaveListName] = useState('');
  const [savedLists, setSavedLists] = useState<Array<{id: string, name: string, date: string, todos: Todo[]}>>([]);
  const [currentListName, setCurrentListName] = useState('');
  
  // Debug logging
  
  // Load saved lists on component mount
  const loadSavedLists = () => {
    const saved = localStorage.getItem('savedShoppingLists');
    if (saved) {
      setSavedLists(JSON.parse(saved));
    }
  };

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

  const saveCurrentList = () => {
    if (saveListName.trim() === '') return;
    
    const newList = {
      id: Date.now().toString(),
      name: saveListName.trim(),
      date: new Date().toISOString(),
      todos: [...filteredTodos]
    };
    
    const currentSaved = [...savedLists];
    const existingIndex = currentSaved.findIndex(list => list.name === saveListName.trim());
    
    if (existingIndex >= 0) {
      currentSaved[existingIndex] = newList;
    } else {
      if (currentSaved.length >= 5) {
        // Remove oldest list if we have 5
        currentSaved.shift();
      }
      currentSaved.push(newList);
    }
    
    setSavedLists(currentSaved);
    localStorage.setItem('savedShoppingLists', JSON.stringify(currentSaved));
    setCurrentListName(saveListName.trim());
    setSaveListName('');
    setShowSaveDialog(false);
    setShowMenu(false);
  };

  const openList = (listId: string) => {
    const listToOpen = savedLists.find(list => list.id === listId);
    if (listToOpen) {
      // Replace current todos with the selected list's todos
      setTodos(listToOpen.todos);
      setCurrentListName(listToOpen.name);
      setShowOpenDialog(false);
      setShowMenu(false);
      showToast({
        type: 'success',
        title: t.openList,
        message: `Lista "${listToOpen.name}" öppnad`,
        duration: 3000
      });
    }
  };

  const deleteList = (listId: string) => {
    const updatedLists = savedLists.filter(list => list.id !== listId);
    setSavedLists(updatedLists);
    localStorage.setItem('savedShoppingLists', JSON.stringify(updatedLists));
  };

  const createNewList = () => {
    // Clear all current todos to create a new empty list
    setTodos([]);
    setCurrentListName('');
    setShowMenu(false);
    showToast({
      type: 'success',
      title: t.newList,
      message: 'Ny tom lista skapad',
      duration: 3000
    });
  };

  // Load saved lists on mount
  React.useEffect(() => {
    loadSavedLists();
  }, []);

  // Get active (uncrossed) todos for flat view - only show uncompleted items
  const activeTodos = filteredTodos.filter(todo => !todo.completed);

  return (
    <div style={{ 
      height: '100dvh', // Dynamic viewport height - prevents mobile browser bar issues
      width: '100%', // Explicit full width for mobile
      maxWidth: '100vw', // Prevent horizontal overflow
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
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
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              position: 'relative'
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
          }}>{currentListName || t.shoppingList}</h1>
          
          <div style={{ width: '36px' }}></div>
        </div>
      </div>

      {/* Main Content Area - Toggle between categorized and flat view */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {state.viewMode === 'categorized' ? (
          <div style={{ 
            flex: 1,
            overflowY: 'auto',
            padding: '20px 0',
            paddingBottom: '140px',
            WebkitOverflowScrolling: 'touch'
          }}>
            {SHOPPING_CATEGORIES.map(category => {
              const items = getItemsByCategory(category.id);
              
              return (
                <CategoryRow
                  key={category.id}
                  category={category}
                  items={items}
                  isExpanded={expandedCategories.has(category.id)}
                  onCategoryClick={() => toggleCategory(category.id)}
                  onToggleItem={toggleTodo}
                />
              );
            })}
            
            {/* Add Category Button */}
            <div 
              onClick={() => {
                alert('Funktion för att lägga till ny kategori kommer snart!');
              }}
              style={{ 
                marginBottom: '2px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderLeft: '4px solid #6b7280',
                borderRight: '4px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'linear-gradient(90deg, rgba(107, 114, 128, 0.1) 0%, transparent 100%)',
                border: '2px dashed rgba(107, 114, 128, 0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(107, 114, 128, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  border: '2px dashed rgba(107, 114, 128, 0.5)'
                }}>
                  ➕
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    Lägg till kategori
                  </h3>
                  <p style={{ 
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                    marginTop: '2px'
                  }}>
                    Skapa ny kategori
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <FlatListView 
            items={activeTodos} 
            onToggleItem={toggleTodo}
          />
        )}
      </div>

      {/* Hamburger Menu */}
      {showMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }} onClick={() => setShowMenu(false)}>
          <div 
            style={{
              position: 'absolute',
              top: '60px',
              left: '16px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              padding: '12px 0',
              minWidth: '200px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Save List */}
            <button
              onClick={() => {
                setShowSaveDialog(true);
                setShowMenu(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              💾 {t.saveList}
            </button>
            
            {/* Open List */}
            <button
              onClick={() => {
                setShowOpenDialog(true);
                setShowMenu(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              📂 {t.openList}
            </button>
            
            {/* New List */}
            <button
              onClick={createNewList}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              📝 {t.newList}
            </button>
            
            <div style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              margin: '8px 16px'
            }} />
            
            {/* Settings */}
            <div style={{ padding: '8px 16px' }}>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                fontWeight: '500',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t.settings}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '13px',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  {t.language}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'sv' | 'en')}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: '#334155',
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  <option value="sv">Svenska</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              {filteredTodos.length === 0 && (
                <button
                  onClick={() => {
                    loadMockData();
                    setShowMenu(false);
                  }}
                  disabled={isLoadingMockData}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: isLoadingMockData ? 'not-allowed' : 'pointer',
                    opacity: isLoadingMockData ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles style={{ width: '14px', height: '14px' }} />
                  {t.loadSampleData}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save List Dialog */}
      {showSaveDialog && (
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
          zIndex: 1100
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '24px',
            width: '300px',
            maxWidth: '90vw'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 16px 0'
            }}>
              {t.saveListAs}
            </h3>
            <input
              type="text"
              value={saveListName}
              onChange={(e) => setSaveListName(e.target.value)}
              placeholder={t.listName}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: '#334155',
                color: 'white',
                fontSize: '14px',
                marginBottom: '16px'
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveCurrentList();
                if (e.key === 'Escape') setShowSaveDialog(false);
              }}
            />
            {savedLists.length >= 5 && (
              <p style={{
                color: '#f59e0b',
                fontSize: '12px',
                margin: '0 0 16px 0'
              }}>
                {t.maxListsReached}
              </p>
            )}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowSaveDialog(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={saveCurrentList}
                disabled={saveListName.trim() === ''}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '14px',
                  cursor: saveListName.trim() === '' ? 'not-allowed' : 'pointer',
                  opacity: saveListName.trim() === '' ? 0.5 : 1
                }}
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Open List Dialog */}
      {showOpenDialog && (
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
          zIndex: 1100
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '24px',
            width: '350px',
            maxWidth: '90vw',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>
                {t.savedLists}
              </h3>
              <button
                onClick={() => setShowOpenDialog(false)}
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
            
            {savedLists.length === 0 ? (
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                textAlign: 'center',
                margin: '20px 0'
              }}>
                {t.noSavedLists}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {savedLists.map((list) => (
                  <div
                    key={list.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => openList(list.id)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <div>
                      <div style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '2px'
                      }}>
                        {list.name}
                      </div>
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '12px'
                      }}>
                        {new Date(list.date).toLocaleDateString()} • {list.todos.length} items
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteList(list.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
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
      
      {/* Bottom Navigation */}
      <BottomNavbar
        onAddItem={() => setIsAddModalOpen(true)}
        onDeleteCompleted={deleteCompleted}
        onToggleView={toggleViewMode}
        completedCount={completedCount}
        uncrossedCount={uncrossedCount}
        viewMode={state.viewMode}
      />
    </div>
  );
};