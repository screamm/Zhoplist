// Product Manager - Handles language-specific product databases
import type { Language } from '../context/LanguageContext';
import * as swedishProducts from '../data/swedishProducts';
import * as englishProducts from '../data/englishProducts';

// Export types
export type { Product } from '../data/swedishProducts';

interface ProductDatabase {
  PRODUCT_DATABASE: any[];
  getCategoryForProduct: (productName: string) => string | null;
  getProductSuggestions: (searchTerm: string, limit?: number) => any[];
  findProduct: (searchTerm: string) => any | undefined;
}

// Map of language to product database
const productDatabases: Record<Language, ProductDatabase> = {
  'sv': swedishProducts as unknown as ProductDatabase,
  'en': englishProducts as unknown as ProductDatabase,
  'es': swedishProducts as unknown as ProductDatabase, // TODO: Add Spanish database
  'hi': swedishProducts as unknown as ProductDatabase, // TODO: Add Hindi database
  'zh': swedishProducts as unknown as ProductDatabase, // TODO: Add Chinese database
};

/**
 * Get the product database for a specific language
 */
export function getProductDatabase(language: Language): ProductDatabase {
  return productDatabases[language] || productDatabases['en'];
}

/**
 * Get category for a product in the current language
 */
export function getCategoryForProduct(productName: string, language: Language): string | null {
  const db = getProductDatabase(language);
  return db.getCategoryForProduct(productName);
}

/**
 * Get product suggestions in the current language
 */
export function getProductSuggestions(searchTerm: string, language: Language, limit: number = 5): any[] {
  const db = getProductDatabase(language);
  return db.getProductSuggestions(searchTerm, limit);
}

/**
 * Find a product in the current language
 */
export function findProduct(searchTerm: string, language: Language): any | undefined {
  const db = getProductDatabase(language);
  return db.findProduct(searchTerm);
}

/**
 * Get all products for a language
 */
export function getAllProducts(language: Language): any[] {
  const db = getProductDatabase(language);
  return db.PRODUCT_DATABASE;
}
