import React, { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryById, SHOPPING_CATEGORIES } from '../types/categories';
import { X, Plus, ShoppingBag, Minus, Edit3 } from 'lucide-react';
import SmartAutocomplete from './SmartAutocomplete';
import { type Suggestion } from '../utils/smartAutocomplete';
import { getCategoryIcon } from './CategoryIcons';
import { CategorySelectionModal } from './CategorySelectionModal';
import { customProducts } from '../utils/customProducts';
import { allCategoriesManager } from '../utils/allCategoriesManager';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, defaultCategory }) => {
  const { createTodo } = useTodo();
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(defaultCategory || '');
  const [detectedCategory, setDetectedCategory] = useState<string>(''); // Kategori som detekterades från produktdatabasen
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<{title: string, quantity: number} | null>(null);

  useEffect(() => {
    if (defaultCategory) {
      setCategory(defaultCategory);
    } else if (!isOpen) {
      // Återställ kategori när modal stängs
      setCategory('');
    }
  }, [defaultCategory, isOpen]);

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setTitle(suggestion.name);
    // Automatically set category based on suggestion if available
    if (suggestion.category) {
      // Map swedish category to app category
      const categoryMapping: { [key: string]: string } = {
        'mejeri': 'dairy',
        'frukt': 'frukt',
        'vegetables': 'vegetables',
        'meat': 'meat',
        'fish': 'fish',
        'skafferi': 'pantry',
        'brod': 'bread',
        'frys': 'frozen',
        'dryck': 'drinks',
        'godis-snacks': 'snacks',
        'hygien': 'personal',
        'stad': 'household',
        'husdjur': 'personal',
        'ovrigt': 'pantry'
      };
      const mappedCategory = categoryMapping[suggestion.category] || suggestion.category;
      setCategory(mappedCategory);
      setDetectedCategory(mappedCategory);
    }
  };

  // Funktion för att hantera kategorival
  const handleCategoryChange = (newCategoryId: string) => {
    setCategory(newCategoryId);
  };

  // Hämta aktuell kategorisektion
  const currentCategoryData = category ? allCategoriesManager.getCategory(category) : null;

  // Funktion för att få översatt kategorinamn
  const getCategoryName = (categoryId: string): string => {
    const categoryMapping: { [key: string]: keyof typeof t } = {
      'dairy': 'dairyProducts',
      'frukt': 'fruits',
      'vegetables': 'vegetables',
      'meat': 'meat',
      'fish': 'fish',
      'bread': 'breadsAndPastries',
      'pantry': 'pantry',
      'frozen': 'frozen',
      'drinks': 'drinks',
      'snacks': 'snacks',
      'household': 'household',
      'personal': 'personalCare'
    };
    const translationKey = categoryMapping[categoryId];
    return translationKey ? t[translationKey] : (currentCategoryData?.name || categoryId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      // Lägg till antalet i titeln om det är mer än 1
      const itemTitle = quantity > 1 ? `${title.trim()} (${quantity}st)` : title.trim();
      
      // Om ingen kategori är satt, använd defaultCategory eller försök hitta rätt kategori
      let finalCategory = category || defaultCategory || '';
      
      // Om vi fortfarande inte har kategori, försök hitta från produktdatabasen eller custom products
      if (!finalCategory) {
        // Kolla först i custom products (användarlärda produkter)
        const customProduct = customProducts.findProduct(title.trim());
        if (customProduct) {
          finalCategory = customProduct.category;
          customProducts.incrementUsage(title.trim()); // Öka usage count
        } else {
          // Importera produktdatabasen för att kunna söka
          const { PRODUCT_DATABASE } = await import('../data/swedishProducts');
          const product = PRODUCT_DATABASE.find(p => 
            p.name.toLowerCase() === title.trim().toLowerCase() ||
            p.aliases?.some(alias => alias.toLowerCase() === title.trim().toLowerCase())
          );
          
          if (product) {
            const categoryMapping: { [key: string]: string } = {
              'mejeri': 'dairy',
              'frukt': 'frukt',
              'vegetables': 'vegetables',
              'meat': 'meat',
              'fish': 'fish',
              'skafferi': 'pantry',
              'brod': 'bread',
              'frys': 'frozen',
              'dryck': 'drinks',
              'godis-snacks': 'snacks',
              'hygien': 'personal',
              'stad': 'household',
              'husdjur': 'personal',
              'ovrigt': 'pantry'
            };
            finalCategory = categoryMapping[product.category] || product.category;
          } else {
            // Produkten finns inte i någon databas - visa category modal
            setPendingItem({ title: itemTitle, quantity });
            setShowCategoryModal(true);
            setIsSubmitting(false);
            return; // Avbryt här och vänta på kategori-val
          }
        }
      }
      
      await createTodo({
        title: itemTitle,
        description: '',
        category: finalCategory,
        priority: 0
      });
      
      // Lägg till i autocomplete för framtiden
      const { smartAutocomplete } = await import('../utils/smartAutocomplete');
      smartAutocomplete.learn(title.trim());
      
      setTitle('');
      setQuantity(1);
      setCategory('');
      onClose();
    } catch (error) {
      console.error('Failed to create item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelected = async (selectedCategoryId: string) => {
    if (!pendingItem) return;
    
    setIsSubmitting(true);
    try {
      await createTodo({
        title: pendingItem.title,
        description: '',
        category: selectedCategoryId,
        priority: 0
      });
      
      // Lägg till i autocomplete för framtiden
      const { smartAutocomplete } = await import('../utils/smartAutocomplete');
      smartAutocomplete.learn(title.trim());
      
      // Spara produkten i custom products för framtida användning
      const productName = pendingItem.title.replace(/\s\(\d+st\)$/, ''); // Remove quantity
      customProducts.addProduct(productName, selectedCategoryId);
      
      setTitle('');
      setQuantity(1);
      setCategory('');
      setPendingItem(null);
      setShowCategoryModal(false);
      onClose();
    } catch (error) {
      console.error('Failed to create item after category selection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryModalClose = () => {
    setShowCategoryModal(false);
    setPendingItem(null);
    setIsSubmitting(false);
  };

  // Hantera kategorival när användaren ändrar kategori manuellt
  const handleManualCategorySelect = (selectedCategoryId: string) => {
    setCategory(selectedCategoryId);
    setShowCategoryModal(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCategoryData = category ? getCategoryById(category) : null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-2xl w-full max-w-md shadow-2xl border-t border-gray-700 sm:border border-gray-800 transform transition-all duration-300 ease-out">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          {/* Handle bar for mobile */}
          <div className="sm:hidden w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedCategoryData ? (
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: selectedCategoryData.color + '30' }}
                >
                  {getCategoryIcon(selectedCategoryData.id, selectedCategoryData.color)}
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{t.addItem}</h2>
                {selectedCategoryData && (
                  <p className="text-sm text-gray-400">{t[selectedCategoryData.nameKey as keyof typeof t]}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-800 transition-colors touch-target"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              {t.itemName} *
            </label>
            <SmartAutocomplete
              value={title}
              onChange={setTitle}
              onSelect={handleSuggestionSelect}
              placeholder={t.itemName}
              className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-800 focus:outline-none transition-all text-base touch-target"
              showCategoryHints={true}
              maxSuggestions={5}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Antal
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-gray-800/50 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-all touch-target"
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, Math.min(99, val)));
                }}
                className="w-20 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white text-center text-lg font-semibold focus:border-purple-500 focus:bg-gray-800 focus:outline-none transition-all"
                min="1"
                max="99"
              />
              
              <button
                type="button"
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="w-12 h-12 bg-gray-800/50 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-all touch-target"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Kategori-sektion */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Kategori
            </label>
            <div
              className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-600 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => setShowCategoryModal(true)}
            >
              <div className="flex items-center space-x-3">
                {currentCategoryData ? (
                  <>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: currentCategoryData.color + '30' }}
                    >
                      {getCategoryIcon(currentCategoryData.id, currentCategoryData.color)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{getCategoryName(category)}</p>
                      <p className="text-sm text-gray-400">Kategori vald</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">Ingen kategori vald</p>
                      <p className="text-sm text-gray-500">Klicka för att välja</p>
                    </div>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="p-2 rounded-xl hover:bg-gray-700 transition-colors touch-target"
              >
                <Edit3 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-4 bg-gray-800/50 text-gray-300 rounded-2xl hover:bg-gray-700 transition-all text-base font-medium touch-target"
              disabled={isSubmitting}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-purple-600/30 touch-target"
              disabled={!title.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.add}...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  {t.add}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={showCategoryModal}
        onClose={handleCategoryModalClose}
        onSelect={pendingItem ? handleCategorySelected : handleManualCategorySelect}
        itemName={pendingItem?.title.replace(/\s\(\d+st\)$/, '') || title} // Remove quantity from display
        availableCategories={allCategoriesManager.getAllCategories().map(cat => cat.id)} // Show all categories including custom
      />
    </div>
  );
};