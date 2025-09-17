// Unified Category Management System
// Handles both standard and custom categories with editing capabilities

import { SHOPPING_CATEGORIES } from '../types/categories';
import { customCategories } from './customCategories';

export interface EditableCategory {
  id: string;
  name: string;
  nameKey: string;
  icon: string;
  color: string;
  bgColor: string;
  order: number;
  isCustom: boolean;
  isStandardEdited?: boolean; // True if this was originally a standard category that has been edited
  createdAt: number;
}

class AllCategoriesManager {
  private readonly EDITED_STANDARDS_KEY = 'zhoplist_edited_standard_categories';
  private readonly REMOVED_STANDARDS_KEY = 'zhoplist_removed_standard_categories';

  private editedStandardCategories: Map<string, EditableCategory> = new Map();
  private removedStandardCategories: Set<string> = new Set();

  constructor() {
    this.loadEditedStandards();
    this.loadRemovedStandards();
  }

  // Load edited standard categories from storage
  private loadEditedStandards(): void {
    try {
      const stored = localStorage.getItem(this.EDITED_STANDARDS_KEY);
      if (stored) {
        const edited = JSON.parse(stored) as EditableCategory[];
        edited.forEach(cat => {
          this.editedStandardCategories.set(cat.id, cat);
        });
      }
    } catch (error) {
      console.warn('Could not load edited standard categories:', error);
    }
  }

  // Load removed standard categories from storage
  private loadRemovedStandards(): void {
    try {
      const stored = localStorage.getItem(this.REMOVED_STANDARDS_KEY);
      if (stored) {
        this.removedStandardCategories = new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Could not load removed standard categories:', error);
    }
  }

  // Save edited standard categories to storage
  private saveEditedStandards(): void {
    try {
      const edited = Array.from(this.editedStandardCategories.values());
      localStorage.setItem(this.EDITED_STANDARDS_KEY, JSON.stringify(edited));
    } catch (error) {
      console.warn('Could not save edited standard categories:', error);
    }
  }

  // Save removed standard categories to storage
  private saveRemovedStandards(): void {
    try {
      localStorage.setItem(this.REMOVED_STANDARDS_KEY, JSON.stringify(Array.from(this.removedStandardCategories)));
    } catch (error) {
      console.warn('Could not save removed standard categories:', error);
    }
  }

  // Get all categories (standard + custom, excluding removed)
  getAllCategories(): EditableCategory[] {
    const allCategories: EditableCategory[] = [];

    // Add standard categories (either original or edited versions)
    SHOPPING_CATEGORIES.forEach(standardCat => {
      // Skip if this standard category has been removed
      if (this.removedStandardCategories.has(standardCat.id)) {
        return;
      }

      // Use edited version if it exists, otherwise use original
      const editedVersion = this.editedStandardCategories.get(standardCat.id);
      if (editedVersion) {
        allCategories.push(editedVersion);
      } else {
        // Convert standard category to EditableCategory format
        allCategories.push({
          id: standardCat.id,
          name: standardCat.name,
          nameKey: standardCat.nameKey,
          icon: standardCat.icon,
          color: standardCat.color,
          bgColor: standardCat.bgColor,
          order: standardCat.order,
          isCustom: false,
          createdAt: 0
        });
      }
    });

    // Add custom categories
    const customCats = customCategories.getAllCategories();
    customCats.forEach(customCat => {
      allCategories.push({
        id: customCat.id,
        name: customCat.name,
        nameKey: customCat.nameKey,
        icon: customCat.icon,
        color: customCat.color,
        bgColor: customCat.bgColor,
        order: customCat.order,
        isCustom: true,
        createdAt: customCat.createdAt
      });
    });

    // Sort by order
    return allCategories.sort((a, b) => a.order - b.order);
  }

  // Update a category (works for both standard and custom)
  updateCategory(categoryId: string, updates: { name: string; icon: string; color: string }): void {
    // Check if it's a custom category first
    const customCategory = customCategories.getAllCategories().find(cat => cat.id === categoryId);
    if (customCategory) {
      // Update custom category
      customCategories.updateCategory(categoryId, updates);
      return;
    }

    // Check if it's a standard category
    const standardCategory = SHOPPING_CATEGORIES.find(cat => cat.id === categoryId);
    if (standardCategory) {
      // Create/update edited version of standard category
      const editedCategory: EditableCategory = {
        id: categoryId,
        name: updates.name,
        nameKey: standardCategory.nameKey,
        icon: updates.icon,
        color: updates.color,
        bgColor: this.colorToBgClass(updates.color),
        order: standardCategory.order,
        isCustom: false,
        isStandardEdited: true,
        createdAt: Date.now()
      };

      this.editedStandardCategories.set(categoryId, editedCategory);
      this.saveEditedStandards();
      return;
    }

    throw new Error(`Category ${categoryId} not found`);
  }

  // Remove a category (works for both standard and custom)
  removeCategory(categoryId: string): void {
    // Check if it's a custom category first
    const customCategory = customCategories.getAllCategories().find(cat => cat.id === categoryId);
    if (customCategory) {
      // Remove custom category
      customCategories.removeCategory(categoryId);
      return;
    }

    // Check if it's a standard category
    const standardCategory = SHOPPING_CATEGORIES.find(cat => cat.id === categoryId);
    if (standardCategory) {
      // Mark standard category as removed
      this.removedStandardCategories.add(categoryId);
      // Also remove any edited version
      this.editedStandardCategories.delete(categoryId);

      this.saveRemovedStandards();
      this.saveEditedStandards();
      return;
    }

    throw new Error(`Category ${categoryId} not found`);
  }

  // Check if a category can be removed (both standard and custom can be removed now)
  canRemoveCategory(_categoryId: string): boolean {
    return true; // All categories can now be removed
  }

  // Get a specific category
  getCategory(categoryId: string): EditableCategory | undefined {
    return this.getAllCategories().find(cat => cat.id === categoryId);
  }

  // Reset a standard category to its original state
  resetStandardCategory(categoryId: string): void {
    if (SHOPPING_CATEGORIES.some(cat => cat.id === categoryId)) {
      this.editedStandardCategories.delete(categoryId);
      this.removedStandardCategories.delete(categoryId);
      this.saveEditedStandards();
      this.saveRemovedStandards();
    }
  }

  // Utility function to convert color to background class
  private colorToBgClass(color: string): string {
    // Simple mapping from color to Tailwind background class
    const colorMap: { [key: string]: string } = {
      '#60A5FA': 'bg-blue-500',
      '#A855F7': 'bg-purple-500',
      '#22C55E': 'bg-green-500',
      '#EAB308': 'bg-yellow-500',
      '#F97316': 'bg-orange-500',
      '#EC4899': 'bg-pink-500',
      '#8B5CF6': 'bg-violet-500',
      '#06B6D4': 'bg-cyan-500',
      '#10B981': 'bg-emerald-500',
      '#F59E0B': 'bg-amber-500',
      '#6366F1': 'bg-indigo-500',
      '#EF4444': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  }
}

// Export singleton instance
export const allCategoriesManager = new AllCategoriesManager();
export default AllCategoriesManager;