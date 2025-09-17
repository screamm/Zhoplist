// Category types and configuration for shopping list

export interface Category {
  id: string;
  name: string;
  nameKey: string; // Translation key for the name
  icon: string;
  color: string;
  bgColor: string;
  order: number;
  isStandardEdited?: boolean; // Whether a standard category has been edited
}

export const SHOPPING_CATEGORIES: Category[] = [
  {
    id: 'dairy',
    name: 'Dairy Products',
    nameKey: 'dairyProducts',
    icon: '🥛',
    color: '#60A5FA',
    bgColor: 'bg-blue-500',
    order: 1
  },
  {
    id: 'fruits',
    name: 'Fruits',
    nameKey: 'fruits',
    icon: '🍎',
    color: '#A855F7',
    bgColor: 'bg-purple-500',
    order: 2
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    nameKey: 'vegetables',
    icon: '🥬',
    color: '#22C55E',
    bgColor: 'bg-green-500',
    order: 3
  },
  {
    id: 'meat',
    name: 'Meat',
    nameKey: 'meat',
    icon: '🥩',
    color: '#EAB308',
    bgColor: 'bg-yellow-500',
    order: 4
  },
  {
    id: 'fish',
    name: 'Fish',
    nameKey: 'fish',
    icon: '🐟',
    color: '#F97316',
    bgColor: 'bg-orange-500',
    order: 5
  },
  {
    id: 'bread',
    name: 'Breads and pastries',
    nameKey: 'breadsAndPastries',
    icon: '🍞',
    color: '#EC4899',
    bgColor: 'bg-pink-500',
    order: 6
  },
  {
    id: 'pantry',
    name: 'Pantry',
    nameKey: 'pantry',
    icon: '🥫',
    color: '#8B5CF6',
    bgColor: 'bg-violet-500',
    order: 7
  },
  {
    id: 'frozen',
    name: 'Frozen',
    nameKey: 'frozen',
    icon: '🧊',
    color: '#06B6D4',
    bgColor: 'bg-cyan-500',
    order: 8
  },
  {
    id: 'drinks',
    name: 'Drinks',
    nameKey: 'drinks',
    icon: '🥤',
    color: '#10B981',
    bgColor: 'bg-emerald-500',
    order: 9
  },
  {
    id: 'snacks',
    name: 'Snacks',
    nameKey: 'snacks',
    icon: '🍿',
    color: '#F59E0B',
    bgColor: 'bg-amber-500',
    order: 10
  },
  {
    id: 'household',
    name: 'Household',
    nameKey: 'household',
    icon: '🧽',
    color: '#6366F1',
    bgColor: 'bg-indigo-500',
    order: 11
  },
  {
    id: 'personal',
    name: 'Personal Care',
    nameKey: 'personalCare',
    icon: '🧴',
    color: '#EF4444',
    bgColor: 'bg-red-500',
    order: 12
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  // First check default categories
  const defaultCategory = SHOPPING_CATEGORIES.find(cat => cat.id === id);
  if (defaultCategory) return defaultCategory;
  
  // Then check custom categories
  try {
    const { customCategories } = require('../utils/customCategories');
    const customCategory = customCategories.findCategory(id);
    if (customCategory) {
      // Convert CustomCategory to Category format
      return {
        id: customCategory.id,
        name: customCategory.name,
        nameKey: customCategory.nameKey,
        icon: customCategory.icon,
        color: customCategory.color,
        bgColor: customCategory.bgColor,
        order: customCategory.order
      };
    }
  } catch (error) {
    // Ignore error if customCategories not available
  }
  
  return undefined;
};

export const getCategoryColor = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.color || '#6B7280';
};

export const getCategoryIcon = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.icon || '📋';
};