// Smart Autocomplete med Machine Learning och användarhistorik
import Fuse from 'fuse.js';
import { customProducts } from './customProducts';
import { getProductDatabase, type Product } from './productManager';
import type { Language } from '../context/LanguageContext';

export interface Suggestion {
  name: string;
  category: string;
  score: number; // 0-1, högre = bättre match
  reason: 'fuzzy' | 'history' | 'popularity';
  aliases?: string[];
}

export interface UserHistory {
  [productName: string]: {
    count: number;
    lastUsed: number;
    category?: string;
  };
}

// Fuse.js konfiguration för optimal prestanda
const FUSE_OPTIONS = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'aliases', weight: 0.3 }
  ],
  threshold: 0.4, // 0 = perfect match, 1 = match anything
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  includeScore: true,
  includeMatches: false,
  shouldSort: true,
};

export class SmartAutocomplete {
  private fuse: Fuse<Product> | null = null;
  private userHistory: Map<string, UserHistory[string]>;
  private readonly STORAGE_KEY = 'zhoplist_user_history';
  private readonly MAX_SUGGESTIONS = 6;
  private readonly HISTORY_WEIGHT = 2.0; // Multiplier för historiska träffar
  private currentLanguage: Language = 'en';

  constructor() {
    this.userHistory = new Map();
    this.loadUserHistory();
  }

  // Initialize or update Fuse with language-specific database
  private initializeFuse(language: Language): void {
    if (this.currentLanguage !== language || !this.fuse) {
      const db = getProductDatabase(language);
      this.fuse = new Fuse(db.PRODUCT_DATABASE, FUSE_OPTIONS);
      this.currentLanguage = language;
    }
  }

  // Huvudfunktion - returnerar förslag baserat på input
  getSuggestions(input: string, language: Language = 'en'): Suggestion[] {
    if (!input || input.length < 1) {
      return []; // Returnera inga förslag när input är tomt
    }

    // Initialize Fuse with correct language database
    this.initializeFuse(language);

    const normalizedInput = input.toLowerCase().trim();
    const suggestions: Suggestion[] = [];

    // 1. Sök i custom products först (högsta prioritet)
    const customResults = this.getCustomProductMatches(normalizedInput);
    suggestions.push(...customResults);

    // 2. Fuzzy search i produktdatabas
    const fuzzyResults = this.getFuzzyMatches(normalizedInput, language);
    suggestions.push(...fuzzyResults);

    // 3. Sök i användarhistorik
    const historyResults = this.getHistoryMatches(normalizedInput, language);
    suggestions.push(...historyResults);

    // 4. Kombinera och ranka resultaten
    const rankedSuggestions = this.rankSuggestions(suggestions, normalizedInput);

    // 5. Ta bort dubletter och begränsa antal
    const uniqueSuggestions = this.removeDuplicates(rankedSuggestions);

    return uniqueSuggestions.slice(0, this.MAX_SUGGESTIONS);
  }

  // Sök i custom products (användarinlärda produkter)
  private getCustomProductMatches(input: string): Suggestion[] {
    const customProductList = customProducts.getAllProducts();
    const matches: Suggestion[] = [];

    for (const product of customProductList) {
      const productName = product.name.toLowerCase();
      
      // Exact match eller starts with har högsta prioritet
      if (productName === input || productName.startsWith(input)) {
        matches.push({
          name: product.name,
          category: product.category,
          score: 1.0 + (product.usageCount * 0.1), // Bonus för användning
          reason: 'history'
        });
      }
      // Substring match har lägre prioritet
      else if (productName.includes(input) && input.length >= 2) {
        matches.push({
          name: product.name,
          category: product.category,
          score: 0.8 + (product.usageCount * 0.05),
          reason: 'history'
        });
      }
    }

    return matches.sort((a, b) => b.score - a.score);
  }

  // Fuzzy search med Fuse.js
  private getFuzzyMatches(input: string, language: Language): Suggestion[] {
    if (!this.fuse) {
      this.initializeFuse(language);
    }

    if (!this.fuse) return [];

    const results = this.fuse.search(input);

    // Performance logging removed for production

    return results.map((result) => ({
      name: result.item.name,
      category: result.item.category,
      score: 1 - (result.score || 0), // Fuse returnerar 0 = perfect, vi vill ha 1 = perfect
      reason: 'fuzzy' as const,
      aliases: result.item.aliases
    }));
  }

  // Sök i användarens historik
  private getHistoryMatches(input: string, language: Language): Suggestion[] {
    const matches: Suggestion[] = [];
    const db = getProductDatabase(language);

    for (const [productName, data] of this.userHistory) {
      const normalizedProduct = productName.toLowerCase();

      // Enkel substring-match för historiska produkter
      if (normalizedProduct.includes(input) || normalizedProduct.startsWith(input)) {
        // Beräkna score baserat på användningsfrekvens och tid
        const recencyScore = this.calculateRecencyScore(data.lastUsed);
        const frequencyScore = Math.min(data.count / 10, 1); // Max score vid 10+ användningar
        const baseScore = (recencyScore + frequencyScore) / 2;

        matches.push({
          name: productName,
          category: data.category || db.getCategoryForProduct(productName) || 'ovrigt',
          score: baseScore * this.HISTORY_WEIGHT,
          reason: 'history' as const
        });
      }
    }

    return matches;
  }


  // Ranka förslag baserat på relevans
  private rankSuggestions(suggestions: Suggestion[], input: string): Suggestion[] {
    return suggestions.sort((a, b) => {
      // 1. Exakt match får högst prioritet
      if (a.name.toLowerCase() === input) return -1;
      if (b.name.toLowerCase() === input) return 1;

      // 2. Börjar med input får näst högst prioritet
      const aStartsWith = a.name.toLowerCase().startsWith(input);
      const bStartsWith = b.name.toLowerCase().startsWith(input);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // 3. Historiska träffar får prioritet
      if (a.reason === 'history' && b.reason !== 'history') return -1;
      if (a.reason !== 'history' && b.reason === 'history') return 1;

      // 4. Sortera på score
      return b.score - a.score;
    });
  }

  // Ta bort dubletter (behåller den med högst score)
  private removeDuplicates(suggestions: Suggestion[]): Suggestion[] {
    const seen = new Map<string, Suggestion>();
    
    for (const suggestion of suggestions) {
      const key = suggestion.name.toLowerCase();
      const existing = seen.get(key);
      
      if (!existing || suggestion.score > existing.score) {
        seen.set(key, suggestion);
      }
    }
    
    return Array.from(seen.values());
  }

  // Beräkna relevans baserat på när produkten senast användes
  private calculateRecencyScore(lastUsed: number): number {
    const now = Date.now();
    const daysSince = (now - lastUsed) / (1000 * 60 * 60 * 24);
    
    // Exponentiell decay: nyligen använt = hög score
    if (daysSince <= 1) return 1.0;
    if (daysSince <= 7) return 0.8;
    if (daysSince <= 30) return 0.6;
    if (daysSince <= 90) return 0.4;
    return 0.2;
  }

  // Lär sig från användarens val
  learn(selectedProduct: string, language: Language = 'en'): void {
    const key = selectedProduct.toLowerCase();
    const existing = this.userHistory.get(key);
    const db = getProductDatabase(language);

    if (existing) {
      existing.count += 1;
      existing.lastUsed = Date.now();
    } else {
      this.userHistory.set(key, {
        count: 1,
        lastUsed: Date.now(),
        category: db.getCategoryForProduct(selectedProduct) || 'ovrigt'
      });
    }

    // Spara till localStorage
    this.saveUserHistory();
  }

  // Ladda användarhistorik från localStorage
  private loadUserHistory(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data: UserHistory = JSON.parse(stored);
        this.userHistory = new Map(Object.entries(data));
      }
    } catch (error) {
      console.warn('Could not load user history:', error);
      this.userHistory = new Map();
    }
  }

  // Spara användarhistorik till localStorage
  private saveUserHistory(): void {
    try {
      const data: UserHistory = Object.fromEntries(this.userHistory);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Could not save user history:', error);
    }
  }

  // Rensa gammal historik (kan användas för att hålla storleken nere)
  cleanupHistory(): void {
    const now = Date.now();
    const sixMonthsAgo = now - (6 * 30 * 24 * 60 * 60 * 1000); // 6 månader

    for (const [key, data] of this.userHistory) {
      if (data.lastUsed < sixMonthsAgo && data.count < 3) {
        // Ta bort sällan använda, gamla produkter
        this.userHistory.delete(key);
      }
    }

    this.saveUserHistory();
  }

  // Exportera historik för debugging/analys
  exportHistory(): UserHistory {
    return Object.fromEntries(this.userHistory);
  }

  // Importera historik (t.ex. från backup)
  importHistory(history: UserHistory): void {
    this.userHistory = new Map(Object.entries(history));
    this.saveUserHistory();
  }

  // Få statistik över användning
  getStats(): {
    totalProducts: number;
    totalUsage: number;
    topProducts: Array<{ name: string; count: number; lastUsed: Date }>;
  } {
    const entries = Array.from(this.userHistory.entries());
    
    return {
      totalProducts: entries.length,
      totalUsage: entries.reduce((sum, [, data]) => sum + data.count, 0),
      topProducts: entries
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 10)
        .map(([name, data]) => ({
          name,
          count: data.count,
          lastUsed: new Date(data.lastUsed)
        }))
    };
  }
}

// Export singleton instance
export const smartAutocomplete = new SmartAutocomplete();

// Export class för testing
export default SmartAutocomplete;