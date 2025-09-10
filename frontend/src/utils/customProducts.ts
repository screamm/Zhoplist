// Custom products learned by user - stored in localStorage
interface CustomProduct {
  name: string;
  category: string;
  addedAt: number;
  usageCount: number;
}

const STORAGE_KEY = 'zhoplist-custom-products';

class CustomProductsManager {
  private products: CustomProduct[] = [];

  constructor() {
    this.loadFromStorage();
  }

  // Load custom products from localStorage
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.products = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load custom products from storage:', error);
      this.products = [];
    }
  }

  // Save custom products to localStorage
  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
    } catch (error) {
      console.warn('Failed to save custom products to storage:', error);
    }
  }

  // Add a new custom product
  addProduct(name: string, category: string) {
    const existingIndex = this.products.findIndex(p => 
      p.name.toLowerCase() === name.toLowerCase()
    );

    if (existingIndex >= 0) {
      // Update existing product
      this.products[existingIndex].category = category;
      this.products[existingIndex].usageCount += 1;
    } else {
      // Add new product
      this.products.push({
        name: name.trim(),
        category,
        addedAt: Date.now(),
        usageCount: 1
      });
    }

    this.saveToStorage();
  }

  // Find a custom product by name
  findProduct(name: string): CustomProduct | undefined {
    return this.products.find(p => 
      p.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Get all custom products for a specific category
  getProductsByCategory(category: string): CustomProduct[] {
    return this.products.filter(p => p.category === category);
  }

  // Get all custom products
  getAllProducts(): CustomProduct[] {
    return [...this.products];
  }

  // Get products sorted by usage for autocomplete
  getPopularProducts(limit: number = 20): CustomProduct[] {
    return this.products
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }

  // Increment usage count when product is selected
  incrementUsage(name: string) {
    const product = this.findProduct(name);
    if (product) {
      product.usageCount += 1;
      this.saveToStorage();
    }
  }

  // Clear all custom products (for debugging)
  clear() {
    this.products = [];
    this.saveToStorage();
  }
}

// Export singleton instance
export const customProducts = new CustomProductsManager();

// Export types
export type { CustomProduct };