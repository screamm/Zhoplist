import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext.js';
import { useLanguage } from '../context/LanguageContext.js';
import type { Category } from '../types/categories.js';
import { Settings, Save, FolderOpen, FileText, Languages } from 'lucide-react';
import type { Todo } from '../types/index.js';
import { AddItemModal } from './AddItemModal.js';
import { AddCategoryModal } from './AddCategoryModal.js';
import { EditCategoryModal } from './EditCategoryModal.js';
// import { generateShoppingMockData } from '../utils/shoppingMockData.js'; // Not needed anymore
import { getCategoryIcon } from './CategoryIcons.js';
import { CustomIcon } from './AddCategoryModal.js';
import { BottomNavbar } from './BottomNavbar.js';
import { FlatListView } from './FlatListView.js';
import { customCategories, type CustomCategory } from '../utils/customCategories.js';
import { allCategoriesManager, type EditableCategory } from '../utils/allCategoriesManager.js';

interface CategoryRowProps {
  category: Category;
  items: Todo[];
  onCategoryClick: () => void;
  isExpanded: boolean;
  onToggleItem: (itemId: string) => void;
  customCategoryList: CustomCategory[];
  onEditCategory?: (categoryId: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ 
  category, 
  items, 
  onCategoryClick, 
  isExpanded,
  onToggleItem,
  customCategoryList,
  onEditCategory
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
          {category.isStandardEdited ? (
            // For edited standard categories, use the custom icon
            category.icon && ['dairy', 'fruits', 'vegetables', 'meat', 'fish', 'bread', 'pantry', 'frozen', 'drinks', 'snacks', 'household', 'personal'].includes(category.icon)
              ? getCategoryIcon(category.icon, 'white', customCategoryList)
              : <CustomIcon type={category.icon} color="white" />
          ) : (
            // For unedited standard and custom categories, use normal logic
            getCategoryIcon(category.id, 'white', customCategoryList)
          )}
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
          }}>{category.isStandardEdited ? category.name : (t[category.nameKey as keyof typeof t] || category.name)}</h3>
        </div>
        
        {/* Edit Button for All Categories */}
        {isExpanded && onEditCategory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditCategory(category.id);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              marginRight: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              zIndex: 3
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <Settings size={16} color="white" />
          </button>
        )}
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
    // createTodo, // Not used anymore with mock data removed
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
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(null);
  const [customCategoryList, setCustomCategoryList] = useState<CustomCategory[]>([]);
  const [allCategories, setAllCategories] = useState<EditableCategory[]>([]);
  // const [isLoadingMockData, setIsLoadingMockData] = useState(false); // Commented out - not needed anymore

  // Load all categories on component mount
  useEffect(() => {
    setCustomCategoryList(customCategories.getAllCategories());
    setAllCategories(allCategoriesManager.getAllCategories());
  }, []);
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [saveListName, setSaveListName] = useState('');
  const [savedLists, setSavedLists] = useState<Array<{id: string, name: string, date: string, todos: Todo[]}>>([]);
  const [currentListName, setCurrentListName] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleEditCategory = (categoryId: string) => {
    const category = allCategories.find(cat => cat.id === categoryId);
    if (category) {
      // Convert EditableCategory to CustomCategory format for the modal
      const editableCategory: CustomCategory = {
        id: category.id,
        name: category.name,
        nameKey: category.id,
        icon: category.icon,
        color: category.color,
        bgColor: category.bgColor,
        order: category.order,
        isCustom: category.isCustom as true,
        createdAt: category.createdAt
      };
      setEditingCategory(editableCategory);
      setShowEditCategoryModal(true);
    }
  };


  const handleUpdateCategory = (updates: { name: string; icon: string; color: string }) => {
    if (editingCategory) {
      allCategoriesManager.updateCategory(editingCategory.id, updates);
      setCustomCategoryList(customCategories.getAllCategories());
      setAllCategories(allCategoriesManager.getAllCategories());
      setShowEditCategoryModal(false);
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = () => {
    if (editingCategory) {
      allCategoriesManager.removeCategory(editingCategory.id);
      setCustomCategoryList(customCategories.getAllCategories());
      setAllCategories(allCategoriesManager.getAllCategories());
      setShowEditCategoryModal(false);
      setEditingCategory(null);
    }
  };

  const getItemsByCategory = (categoryId: string) => {
    return filteredTodos.filter(todo => todo.category === categoryId);
  };

  // Hämta items utan kategori (tomma eller null)
  const getItemsWithoutCategory = () => {
    return filteredTodos.filter(todo => !todo.category || todo.category.trim() === '');
  };

  // Commented out - mock data loading not needed anymore
  // const loadMockData = async () => {
  //   setIsLoadingMockData(true);
  //   const mockItems = generateShoppingMockData();
  //
  //   for (const item of mockItems) {
  //     await createTodo({
  //       title: item.title,
  //       description: item.description,
  //       category: item.category,
  //       priority: item.priority
  //     });
  //   }
  //
  //   setIsLoadingMockData(false);
  // };

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
            {allCategories.map(category => {
              const items = getItemsByCategory(category.id);

              return (
                <CategoryRow
                  key={category.id}
                  category={category}
                  items={items}
                  isExpanded={expandedCategories.has(category.id)}
                  onCategoryClick={() => toggleCategory(category.id)}
                  onToggleItem={toggleTodo}
                  customCategoryList={customCategoryList}
                  onEditCategory={handleEditCategory}
                />
              );
            })}

            {/* Items utan kategori */}
            {(() => {
              const itemsWithoutCategory = getItemsWithoutCategory();
              if (itemsWithoutCategory.length > 0) {
                // Skapa en falsk kategori för items utan kategori
                const uncategorizedCategory: Category = {
                  id: 'uncategorized',
                  name: 'Utan kategori',
                  nameKey: 'uncategorized',
                  icon: 'list',
                  color: '#6B7280',
                  bgColor: 'bg-gray-500',
                  order: 999
                };

                return (
                  <CategoryRow
                    key="uncategorized"
                    category={uncategorizedCategory}
                    items={itemsWithoutCategory}
                    isExpanded={expandedCategories.has('uncategorized')}
                    onCategoryClick={() => toggleCategory('uncategorized')}
                    onToggleItem={toggleTodo}
                    customCategoryList={customCategoryList}
                  />
                );
              }
              return null;
            })()}

            {/* Add Category Button */}
            <div 
              onClick={() => setShowAddCategoryModal(true)}
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
                  backgroundColor: 'rgba(255, 255, 255, 1)',
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
            items={filteredTodos}
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
          backgroundColor: 'rgba(0, 17, 34, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000
        }} onClick={() => setShowMenu(false)}>
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: '20px',
              right: '20px',
              maxWidth: '320px',
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div style={{
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                letterSpacing: '-0.02em'
              }}>
                Inställningar
              </h3>
              <p style={{
                margin: '4px 0 0',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Hantera listor och språk
              </p>
              {/* Close button */}
              <button
                onClick={() => setShowMenu(false)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Menu Items */}
            <div style={{ marginBottom: '20px' }}>
              {/* Save List */}
              <button
                onClick={() => {
                  setShowSaveDialog(true);
                  setShowMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  margin: '0 0 8px 0',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Save style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                </div>
                <div>
                  <div>{t.saveList}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                    Spara aktuell lista
                  </div>
                </div>
              </button>

              {/* Open List */}
              <button
                onClick={() => {
                  setShowOpenDialog(true);
                  setShowMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  margin: '0 0 8px 0',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FolderOpen style={{ width: '18px', height: '18px', color: '#3b82f6' }} />
                </div>
                <div>
                  <div>{t.openList}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                    Öppna sparad lista
                  </div>
                </div>
              </button>

              {/* New List */}
              <button
                onClick={createNewList}
                style={{
                  width: '100%',
                  padding: '16px',
                  margin: '0 0 8px 0',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText style={{ width: '18px', height: '18px', color: '#a855f7' }} />
                </div>
                <div>
                  <div>{t.newList}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                    Skapa ny tom lista
                  </div>
                </div>
              </button>

              {/* Delete Lists - Only show if there are saved lists */}
              {savedLists.length > 0 && (
                <button
                  onClick={() => {
                    setShowDeleteDialog(true);
                    setShowMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    margin: '0 0 8px 0',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '18px', color: '#ef4444' }}>🗑️</span>
                  </div>
                  <div>
                    <div>Ta bort listor</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                      Hantera sparade listor
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              margin: '8px 16px'
            }} />
            
            {/* Language Selection */}
            <div style={{
              padding: '16px 0 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '15px',
                fontWeight: '500',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(251, 146, 60, 0.2)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Languages style={{ width: '12px', height: '12px', color: '#fb923c' }} />
                </div>
                {t.language}
              </div>

              {/* Language Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setLanguage('sv')}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: language === 'sv' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: language === 'sv' ? '#22c55e' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: language === 'sv' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (language !== 'sv') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'sv') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  Svenska
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: language === 'en' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: language === 'en' ? '#22c55e' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: language === 'en' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (language !== 'en') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'en') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  English
                </button>
              </div>
              
              {/* Ladda exempeldata-knappen är bortkommenterad
              {filteredTodos.length === 0 && (
                <button
                  onClick={() => {
                    loadMockData();
                    setShowMenu(false);
                  }}
                  disabled={isLoadingMockData}
                  style={{
                    width: '100%',
                    padding: '16px',
                    margin: '8px 0 0',
                    backgroundColor: isLoadingMockData ? 'rgba(255, 255, 255, 0.03)' : 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '16px',
                    color: isLoadingMockData ? 'rgba(255, 255, 255, 0.4)' : '#3b82f6',
                    textAlign: 'left',
                    cursor: isLoadingMockData ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                    border: '1px solid ' + (isLoadingMockData ? 'rgba(255, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.3)')
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoadingMockData) {
                      e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoadingMockData) {
                      e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: isLoadingMockData ? 'rgba(255, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles style={{
                      width: '18px',
                      height: '18px',
                      color: isLoadingMockData ? 'rgba(255, 255, 255, 0.3)' : '#3b82f6'
                    }} />
                  </div>
                  <div>
                    <div>{t.loadSampleData}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                      {isLoadingMockData ? 'Laddar...' : 'Lägg till exempelvaror'}
                    </div>
                  </div>
                </button>
              )} */}
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

      {/* Delete Lists Dialog */}
      {showDeleteDialog && (
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
                Ta bort listor
              </h3>
              <button
                onClick={() => setShowDeleteDialog(false)}
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

            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              Klicka på papperskorgen för att ta bort en lista permanent.
            </p>

            {savedLists.length === 0 ? (
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                textAlign: 'center',
                margin: '20px 0'
              }}>
                Inga sparade listor att ta bort
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
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
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
                      onClick={() => {
                        deleteList(list.id);
                        if (savedLists.length === 1) {
                          setShowDeleteDialog(false);
                        }
                      }}
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '8px',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px'
            }}>
              <button
                onClick={() => setShowDeleteDialog(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Stäng
              </button>
            </div>
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

      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAdd={(categoryData) => {
          // Add the new category
          customCategories.addCategory(
            categoryData.name,
            categoryData.icon,
            categoryData.color
          );

          // Update both category lists
          setCustomCategoryList(customCategories.getAllCategories());
          setAllCategories(allCategoriesManager.getAllCategories());

          // Close the modal
          setShowAddCategoryModal(false);
        }}
      />

      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => {
          setShowEditCategoryModal(false);
          setEditingCategory(null);
        }}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
        category={editingCategory || undefined}
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