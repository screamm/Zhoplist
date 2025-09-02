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
    id: 'produce',
    name: 'Frukt & Grönt',
    icon: '🥬',
    color: '#4ADE80',
    bgColor: 'bg-green-500',
    order: 1
  },
  {
    id: 'dairy',
    name: 'Mejeri',
    icon: '🥛',
    color: '#60A5FA',
    bgColor: 'bg-blue-500',
    order: 2
  },
  {
    id: 'meat',
    name: 'Kött & Fisk',
    icon: '🥩',
    color: '#FB923C',
    bgColor: 'bg-orange-500',
    order: 3
  },
  {
    id: 'bread',
    name: 'Bröd & Bakverk',
    icon: '🍞',
    color: '#F472B6',
    bgColor: 'bg-pink-500',
    order: 4
  },
  {
    id: 'pantry',
    name: 'Skafferi',
    icon: '🥫',
    color: '#C084FC',
    bgColor: 'bg-purple-500',
    order: 5
  },
  {
    id: 'frozen',
    name: 'Frys',
    icon: '🧊',
    color: '#38BDF8',
    bgColor: 'bg-sky-500',
    order: 6
  },
  {
    id: 'drinks',
    name: 'Drycker',
    icon: '🥤',
    color: '#FBBF24',
    bgColor: 'bg-yellow-500',
    order: 7
  },
  {
    id: 'snacks',
    name: 'Snacks & Godis',
    icon: '🍿',
    color: '#FB7185',
    bgColor: 'bg-rose-500',
    order: 8
  },
  {
    id: 'household',
    name: 'Hushåll',
    icon: '🧹',
    color: '#94A3B8',
    bgColor: 'bg-slate-500',
    order: 9
  },
  {
    id: 'personal',
    name: 'Hygien',
    icon: '🧼',
    color: '#86EFAC',
    bgColor: 'bg-emerald-400',
    order: 10
  },
  {
    id: 'other',
    name: 'Övrigt',
    icon: '📦',
    color: '#A78BFA',
    bgColor: 'bg-indigo-400',
    order: 11
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