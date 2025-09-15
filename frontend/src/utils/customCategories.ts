// Custom Category Storage Management

export interface CustomCategory {
  id: string;
  name: string;
  nameKey: string;
  icon: string;
  color: string;
  bgColor: string;
  order: number;
  isCustom: true;
  createdAt: number;
}

class CustomCategoriesManager {
  private categories: CustomCategory[] = [];
  private readonly STORAGE_KEY = 'zhoplist_custom_categories';

  constructor() {
    this.loadFromStorage();
  }

  // Add a new custom category
  addCategory(name: string, icon: string, color: string): CustomCategory {
    // Generate unique ID
    const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create category object
    const category: CustomCategory = {
      id,
      name: name.trim(),
      nameKey: id, // Use ID as nameKey for custom categories
      icon,
      color,
      bgColor: this.colorToBgClass(color),
      order: 1000 + this.categories.length, // Custom categories come after default ones
      isCustom: true,
      createdAt: Date.now()
    };

    // Check for duplicates
    const existingIndex = this.categories.findIndex(c => 
      c.name.toLowerCase() === name.toLowerCase().trim()
    );

    if (existingIndex >= 0) {
      // Update existing category
      this.categories[existingIndex] = category;
    } else {
      // Add new category
      this.categories.push(category);
    }

    this.saveToStorage();
    return category;
  }

  // Remove a custom category
  removeCategory(id: string): boolean {
    const index = this.categories.findIndex(c => c.id === id);
    if (index >= 0) {
      this.categories.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get all custom categories
  getAllCategories(): CustomCategory[] {
    return [...this.categories].sort((a, b) => a.order - b.order);
  }

  // Find a specific category
  findCategory(id: string): CustomCategory | undefined {
    return this.categories.find(c => c.id === id);
  }

  // Get category by name
  findByName(name: string): CustomCategory | undefined {
    const normalizedName = name.toLowerCase().trim();
    return this.categories.find(c => c.name.toLowerCase() === normalizedName);
  }

  // Check if category exists
  categoryExists(name: string): boolean {
    return this.findByName(name) !== undefined;
  }

  // Update category
  updateCategory(id: string, updates: Partial<Pick<CustomCategory, 'name' | 'icon' | 'color'>>): boolean {
    const index = this.categories.findIndex(c => c.id === id);
    if (index >= 0) {
      const category = this.categories[index];
      this.categories[index] = {
        ...category,
        ...updates,
        bgColor: updates.color ? this.colorToBgClass(updates.color) : category.bgColor
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Convert hex color to Tailwind bg class (approximation)
  private colorToBgClass(color: string): string {
    // Simple mapping - in a real app you might want more sophisticated color matching
    const colorMap: { [key: string]: string } = {
      '#EF4444': 'bg-red-500',
      '#F97316': 'bg-orange-500',
      '#F59E0B': 'bg-amber-500',
      '#EAB308': 'bg-yellow-500',
      '#84CC16': 'bg-lime-500',
      '#22C55E': 'bg-green-500',
      '#10B981': 'bg-emerald-500',
      '#06B6D4': 'bg-cyan-500',
      '#0EA5E9': 'bg-sky-500',
      '#3B82F6': 'bg-blue-500',
      '#6366F1': 'bg-indigo-500',
      '#8B5CF6': 'bg-violet-500',
      '#A855F7': 'bg-purple-500',
      '#D946EF': 'bg-fuchsia-500',
      '#EC4899': 'bg-pink-500',
      '#F43F5E': 'bg-rose-500',
    };

    return colorMap[color] || 'bg-gray-500';
  }

  // Clear all custom categories
  clearAll(): void {
    this.categories = [];
    this.saveToStorage();
  }

  // Export for backup
  exportCategories(): CustomCategory[] {
    return this.getAllCategories();
  }

  // Import from backup
  importCategories(categories: CustomCategory[]): void {
    // Validate categories before importing
    const validCategories = categories.filter(cat => 
      cat && 
      typeof cat.id === 'string' && 
      typeof cat.name === 'string' && 
      typeof cat.icon === 'string' && 
      typeof cat.color === 'string'
    );

    this.categories = validCategories;
    this.saveToStorage();
  }

  // Get usage statistics
  getStats(): {
    totalCategories: number;
    categoriesByMonth: Array<{ name: string; createdAt: Date }>;
  } {
    return {
      totalCategories: this.categories.length,
      categoriesByMonth: this.categories
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(cat => ({
          name: cat.name,
          createdAt: new Date(cat.createdAt)
        }))
    };
  }

  // Load from localStorage
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data: CustomCategory[] = JSON.parse(stored);
        // Validate data structure
        if (Array.isArray(data)) {
          this.categories = data.filter(cat => 
            cat && 
            typeof cat.id === 'string' && 
            typeof cat.name === 'string'
          );
        }
      }
    } catch (error) {
      console.warn('Could not load custom categories:', error);
      this.categories = [];
    }
  }

  // Save to localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.categories));
    } catch (error) {
      console.warn('Could not save custom categories:', error);
    }
  }
}

// Export singleton instance
export const customCategories = new CustomCategoriesManager();

// Export class for testing
export default CustomCategoriesManager;