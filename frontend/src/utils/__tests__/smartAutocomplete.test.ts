// Tests för Smart Autocomplete System
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SmartAutocomplete from '../smartAutocomplete';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('SmartAutocomplete', () => {
  let autocomplete: SmartAutocomplete;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    autocomplete = new SmartAutocomplete();
  });

  describe('Performance Tests', () => {
    it('should return suggestions within 50ms for common products', () => {
      const startTime = performance.now();
      const suggestions = autocomplete.getSuggestions('mjölk');
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions[0].name).toBe('mjölk');
    });

    it('should handle fuzzy search within performance threshold', () => {
      const startTime = performance.now();
      const suggestions = autocomplete.getSuggestions('mj'); // Fuzzy match
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(s => s.name === 'mjölk')).toBe(true);
    });

    it('should handle empty input quickly', () => {
      const startTime = performance.now();
      const suggestions = autocomplete.getSuggestions('');
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(10);
      expect(suggestions.length).toBeGreaterThan(0); // Should return popular items
    });

    it('should handle complex search queries efficiently', () => {
      const startTime = performance.now();
      const suggestions = autocomplete.getSuggestions('havre');
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50);
      expect(suggestions.some(s => s.name.includes('havre'))).toBe(true);
    });
  });

  describe('Functionality Tests', () => {
    it('should return exact matches first', () => {
      const suggestions = autocomplete.getSuggestions('mjölk');
      expect(suggestions[0].name).toBe('mjölk');
      expect(suggestions[0].score).toBeCloseTo(1.0, 5); // Allow floating point precision
    });

    it('should return suggestions that start with input before partial matches', () => {
      const suggestions = autocomplete.getSuggestions('m');
      const startsWithM = suggestions.filter(s => s.name.toLowerCase().startsWith('m'));
      const partialMatches = suggestions.filter(s => 
        !s.name.toLowerCase().startsWith('m') && s.name.toLowerCase().includes('m')
      );
      
      // All items that start with 'm' should come before partial matches
      if (startsWithM.length > 0 && partialMatches.length > 0) {
        const startsWithIndices = suggestions
          .map((s, i) => s.name.toLowerCase().startsWith('m') ? i : -1)
          .filter(i => i !== -1);
        const lastStartsWithIndex = startsWithIndices.length > 0 
          ? startsWithIndices[startsWithIndices.length - 1] 
          : -1;
        const firstPartialIndex = suggestions.findIndex(s => 
          !s.name.toLowerCase().startsWith('m') && s.name.toLowerCase().includes('m')
        );
        
        if (firstPartialIndex !== -1) {
          expect(lastStartsWithIndex).toBeLessThan(firstPartialIndex);
        }
      }
    });

    it('should limit results to maximum suggestions', () => {
      const suggestions = autocomplete.getSuggestions('a');
      expect(suggestions.length).toBeLessThanOrEqual(6); // MAX_SUGGESTIONS = 6
    });

    it('should include category information', () => {
      const suggestions = autocomplete.getSuggestions('mjölk');
      expect(suggestions[0].category).toBeDefined();
      expect(suggestions[0].category).toBe('mejeri');
    });

    it('should handle aliases correctly', () => {
      const suggestions = autocomplete.getSuggestions('mellanmjölk');
      const mjölkSuggestion = suggestions.find(s => s.name === 'mjölk');
      expect(mjölkSuggestion).toBeDefined();
    });
  });

  describe('Learning System Tests', () => {
    it('should learn from user selections', () => {
      // Learn that user frequently selects 'makaroner'
      autocomplete.learn('makaroner');
      autocomplete.learn('makaroner');
      autocomplete.learn('makaroner');

      const suggestions = autocomplete.getSuggestions('m');
      const makaronerSuggestion = suggestions.find(s => s.name === 'makaroner');
      
      expect(makaronerSuggestion).toBeDefined();
      expect(makaronerSuggestion?.reason).toBe('history');
    });

    it('should prioritize learned items', () => {
      // Learn some items
      autocomplete.learn('potatis');
      autocomplete.learn('potatis');
      autocomplete.learn('peppar');

      const suggestions = autocomplete.getSuggestions('p');
      const historyItems = suggestions.filter(s => s.reason === 'history');
      
      expect(historyItems.length).toBeGreaterThan(0);
      // History items should have higher scores
      const maxHistoryScore = Math.max(...historyItems.map(s => s.score));
      const maxOtherScore = Math.max(
        ...suggestions.filter(s => s.reason !== 'history').map(s => s.score)
      );
      
      expect(maxHistoryScore).toBeGreaterThan(maxOtherScore);
    });

    it('should save learning data to localStorage', () => {
      autocomplete.learn('test-product');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'zhoplist_user_history',
        expect.any(String)
      );
    });

    it('should load learning data from localStorage', () => {
      const mockHistory = JSON.stringify({
        'testproduct': {
          count: 5,
          lastUsed: Date.now(),
          category: 'ovrigt'
        }
      });
      
      localStorageMock.getItem.mockReturnValue(mockHistory);
      
      const newAutocomplete = new SmartAutocomplete();
      const suggestions = newAutocomplete.getSuggestions('test');
      
      expect(suggestions.some(s => s.name === 'testproduct')).toBe(true);
    });
  });

  describe('Category Detection Tests', () => {
    it('should correctly categorize known products', () => {
      const suggestions = autocomplete.getSuggestions('mjölk');
      expect(suggestions[0].category).toBe('mejeri');

      const breadSuggestions = autocomplete.getSuggestions('bröd');
      expect(breadSuggestions[0].category).toBe('brod');
    });

    it('should provide fallback category for unknown products', () => {
      autocomplete.learn('unknown-product');
      const suggestions = autocomplete.getSuggestions('unknown');
      const unknownProduct = suggestions.find(s => s.name === 'unknown-product');
      
      expect(unknownProduct?.category).toBeDefined();
      // Should fallback to 'ovrigt'
      expect(unknownProduct?.category).toBe('ovrigt');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in search', () => {
      const suggestions = autocomplete.getSuggestions('mjölk & ägg');
      expect(suggestions.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle very long search queries', () => {
      const longQuery = 'a'.repeat(100);
      const suggestions = autocomplete.getSuggestions(longQuery);
      expect(suggestions.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle numbers in search', () => {
      const suggestions = autocomplete.getSuggestions('1% mjölk');
      expect(suggestions.length).toBeGreaterThanOrEqual(0);
    });

    it('should be case insensitive', () => {
      const lowerCase = autocomplete.getSuggestions('mjölk');
      const upperCase = autocomplete.getSuggestions('MJÖLK');
      const mixedCase = autocomplete.getSuggestions('MjÖlK');
      
      expect(lowerCase[0].name).toBe('mjölk');
      expect(upperCase[0].name).toBe('mjölk');
      expect(mixedCase[0].name).toBe('mjölk');
    });
  });

  describe('Statistics and Analytics', () => {
    it('should provide usage statistics', () => {
      autocomplete.learn('mjölk');
      autocomplete.learn('bröd');
      autocomplete.learn('mjölk'); // mjölk used twice
      
      const stats = autocomplete.getStats();
      
      expect(stats.totalProducts).toBe(2);
      expect(stats.totalUsage).toBe(3);
      expect(stats.topProducts[0].name).toBe('mjölk');
      expect(stats.topProducts[0].count).toBe(2);
    });

    it('should export and import history correctly', () => {
      autocomplete.learn('test1');
      autocomplete.learn('test2');
      
      const exported = autocomplete.exportHistory();
      expect(Object.keys(exported)).toContain('test1');
      expect(Object.keys(exported)).toContain('test2');
      
      const newAutocomplete = new SmartAutocomplete();
      newAutocomplete.importHistory(exported);
      
      const suggestions = newAutocomplete.getSuggestions('test');
      expect(suggestions.some(s => s.name === 'test1')).toBe(true);
      expect(suggestions.some(s => s.name === 'test2')).toBe(true);
    });
  });

  describe('Memory Management', () => {
    it('should cleanup old entries', () => {
      const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
      
      // Mock old entry
      const mockOldHistory = JSON.stringify({
        'old-product': {
          count: 1,
          lastUsed: sixMonthsAgo - 1000,
          category: 'ovrigt'
        },
        'recent-product': {
          count: 5,
          lastUsed: Date.now(),
          category: 'ovrigt'
        }
      });
      
      localStorageMock.getItem.mockReturnValue(mockOldHistory);
      
      const newAutocomplete = new SmartAutocomplete();
      newAutocomplete.cleanupHistory();
      
      const stats = newAutocomplete.getStats();
      expect(stats.totalProducts).toBe(1); // Only recent product should remain
    });
  });
});