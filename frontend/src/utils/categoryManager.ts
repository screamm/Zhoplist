// Kategorihantering - användare kan anpassa kategorier
import { DEFAULT_CATEGORIES, type Category } from '../data/swedishProducts';

export interface CustomCategory extends Category {
  isCustom: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface CategorySettings {
  categories: CustomCategory[];
  hiddenCategories: string[]; // IDs på dolda kategorier
  categoryOrder: string[]; // Custom ordning på kategorier
}

export class CategoryManager {
  private static instance: CategoryManager;
  private categories: Map<string, CustomCategory>;
  private readonly SETTINGS_KEY = 'zhoplist_category_settings';

  constructor() {
    this.categories = new Map();
    this.loadCategories();
  }

  static getInstance(): CategoryManager {
    if (!CategoryManager.instance) {
      CategoryManager.instance = new CategoryManager();
    }
    return CategoryManager.instance;
  }

  // Ladda kategorier från localStorage
  private loadCategories(): void {
    try {
      // Börja med default-kategorier
      this.resetToDefaults();

      // Ladda sparade anpassningar
      const storedSettings = localStorage.getItem(this.SETTINGS_KEY);
      if (storedSettings) {
        const settings: CategorySettings = JSON.parse(storedSettings);
        
        // Applicera anpassade kategorier
        settings.categories.forEach(category => {
          this.categories.set(category.id, category);
        });
      }
    } catch (error) {
      console.warn('Could not load categories:', error);
      this.resetToDefaults();
    }
  }

  // Spara kategorier till localStorage
  private saveCategories(): void {
    try {
      const settings: CategorySettings = {
        categories: Array.from(this.categories.values()),
        hiddenCategories: this.getHiddenCategories(),
        categoryOrder: this.getCategoryOrder()
      };

      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Could not save categories:', error);
    }
  }

  // Återställ till standardkategorier
  resetToDefaults(): void {
    this.categories.clear();
    
    DEFAULT_CATEGORIES.forEach(category => {
      this.categories.set(category.id, {
        ...category,
        isCustom: false
      });
    });
  }

  // Få alla kategorier (inklusive anpassade)
  getAllCategories(): CustomCategory[] {
    return Array.from(this.categories.values())
      .sort((a, b) => a.order - b.order);
  }

  // Få endast synliga kategorier
  getVisibleCategories(): CustomCategory[] {
    return this.getAllCategories().filter(cat => !cat.removable || this.categories.has(cat.id));
  }

  // Få kategori efter ID
  getCategory(id: string): CustomCategory | undefined {
    return this.categories.get(id);
  }

  // Få kategori efter namn (fallback för äldre data)
  getCategoryByName(name: string): CustomCategory | undefined {
    return Array.from(this.categories.values())
      .find(cat => cat.name.toLowerCase() === name.toLowerCase());
  }

  // Lägg till ny anpassad kategori
  addCustomCategory(name: string, icon: string, order?: number): CustomCategory {
    // Generera unikt ID
    const id = this.generateCategoryId(name);
    
    // Kontrollera att namnet inte redan finns
    if (this.getCategoryByName(name)) {
      throw new Error(`Kategorin "${name}" finns redan`);
    }

    const newCategory: CustomCategory = {
      id,
      name: name.trim(),
      icon: icon.trim() || '📦',
      order: order || this.getNextOrder(),
      removable: true,
      isCustom: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.categories.set(id, newCategory);
    this.saveCategories();

    return newCategory;
  }

  // Uppdatera befintlig kategori
  updateCategory(id: string, updates: Partial<Pick<CustomCategory, 'name' | 'icon' | 'order'>>): CustomCategory {
    const category = this.categories.get(id);
    if (!category) {
      throw new Error(`Kategorin med ID "${id}" hittades inte`);
    }

    // Kontrollera om namnet redan används (om namnet ändras)
    if (updates.name && updates.name !== category.name) {
      const existing = this.getCategoryByName(updates.name);
      if (existing && existing.id !== id) {
        throw new Error(`Kategorin "${updates.name}" finns redan`);
      }
    }

    const updatedCategory: CustomCategory = {
      ...category,
      ...updates,
      updatedAt: Date.now()
    };

    this.categories.set(id, updatedCategory);
    this.saveCategories();

    return updatedCategory;
  }

  // Ta bort kategori (endast removable)
  removeCategory(id: string): boolean {
    const category = this.categories.get(id);
    if (!category) {
      return false;
    }

    if (!category.removable) {
      throw new Error(`Kategorin "${category.name}" kan inte tas bort`);
    }

    this.categories.delete(id);
    this.saveCategories();

    return true;
  }

  // Ändra ordning på kategorier
  reorderCategories(categoryIds: string[]): void {
    categoryIds.forEach((id, index) => {
      const category = this.categories.get(id);
      if (category) {
        category.order = index + 1;
        category.updatedAt = Date.now();
      }
    });

    this.saveCategories();
  }

  // Kontrollera om en kategori kan tas bort
  canRemoveCategory(id: string): boolean {
    const category = this.categories.get(id);
    return category ? category.removable : false;
  }

  // Få alla items som tillhör en kategori (för migration när kategori tas bort)
  getItemsInCategory(_categoryId: string): string[] {
    // Denna funktion skulle behöva integration med todo-systemet
    // För nu returnerar vi tom array
    return [];
  }

  // Migrera items från en kategori till en annan
  migrateItemsToCategory(fromCategoryId: string, toCategoryId: string): void {
    // Implementation skulle behöva todo-system integration
    console.log(`Migrating items from ${fromCategoryId} to ${toCategoryId}`);
  }


  // Generera unikt ID för kategori
  private generateCategoryId(name: string): string {
    const baseId = name.toLowerCase()
      .replace(/[åäö]/g, (match) => ({ 'å': 'a', 'ä': 'a', 'ö': 'o' }[match] || match))
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    let id = baseId;
    let counter = 1;

    while (this.categories.has(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    return id;
  }

  // Få nästa ordningsnummer
  private getNextOrder(): number {
    const maxOrder = Math.max(
      ...Array.from(this.categories.values()).map(cat => cat.order),
      0
    );
    return maxOrder + 1;
  }

  // Få dolda kategorier
  private getHiddenCategories(): string[] {
    const allDefaultIds = DEFAULT_CATEGORIES.map(cat => cat.id);
    const visibleIds = Array.from(this.categories.keys());
    return allDefaultIds.filter(id => !visibleIds.includes(id));
  }

  // Få kategori-ordning
  private getCategoryOrder(): string[] {
    return this.getAllCategories().map(cat => cat.id);
  }

  // Export för backup
  exportCategories(): CategorySettings {
    return {
      categories: Array.from(this.categories.values()),
      hiddenCategories: this.getHiddenCategories(),
      categoryOrder: this.getCategoryOrder()
    };
  }

  // Import från backup
  importCategories(settings: CategorySettings): void {
    this.categories.clear();
    
    // Lägg till importerade kategorier
    settings.categories.forEach(category => {
      this.categories.set(category.id, category);
    });

    this.saveCategories();
  }

  // Få statistik
  getStats(): {
    totalCategories: number;
    customCategories: number;
    hiddenCategories: number;
    defaultCategories: number;
  } {
    const all = this.getAllCategories();
    const custom = all.filter(cat => cat.isCustom);
    const hidden = this.getHiddenCategories();
    const defaults = all.filter(cat => !cat.isCustom);

    return {
      totalCategories: all.length,
      customCategories: custom.length,
      hiddenCategories: hidden.length,
      defaultCategories: defaults.length
    };
  }

  // Sök kategorier
  searchCategories(query: string): CustomCategory[] {
    const normalizedQuery = query.toLowerCase().trim();
    
    return this.getAllCategories().filter(category =>
      category.name.toLowerCase().includes(normalizedQuery) ||
      category.id.toLowerCase().includes(normalizedQuery)
    );
  }
}

// Export singleton
export const categoryManager = CategoryManager.getInstance();

export default CategoryManager;