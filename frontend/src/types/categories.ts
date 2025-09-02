// Category types and configuration for shopping list

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  order: number;
}

export const SHOPPING_CATEGORIES: Category[] = [
  {
    id: 'dairy',
    name: 'Dairy Products',
    icon: '🥛',
    color: '#60A5FA',
    bgColor: 'bg-blue-500',
    order: 1
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '🍎',
    color: '#A855F7',
    bgColor: 'bg-purple-500',
    order: 2
  },
  {
    id: 'vegetables',
    name: 'Vegetable',
    icon: '🥬',
    color: '#22C55E',
    bgColor: 'bg-green-500',
    order: 3
  },
  {
    id: 'meat',
    name: 'Meat',
    icon: '🥩',
    color: '#EAB308',
    bgColor: 'bg-yellow-500',
    order: 4
  },
  {
    id: 'fish',
    name: 'Fish',
    icon: '🐟',
    color: '#F97316',
    bgColor: 'bg-orange-500',
    order: 5
  },
  {
    id: 'bread',
    name: 'Breads and pastries',
    icon: '🍞',
    color: '#EC4899',
    bgColor: 'bg-pink-500',
    order: 6
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return SHOPPING_CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryColor = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.color || '#6B7280';
};

export const getCategoryIcon = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category?.icon || '📋';
};