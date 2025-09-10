import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'sv' | 'en';

interface Translations {
  // Header
  shoppingList: string;
  settings: string;
  
  // Categories
  dairyProducts: string;
  fruits: string;
  vegetables: string;
  meat: string;
  fish: string;
  breadsAndPastries: string;
  pantry: string;
  frozen: string;
  drinks: string;
  snacks: string;
  household: string;
  personalCare: string;
  
  // Add Item Modal
  addItem: string;
  itemName: string;
  description: string;
  category: string;
  selectCategory: string;
  cancel: string;
  add: string;
  
  // Settings
  language: string;
  swedish: string;
  english: string;
  darkMode: string;
  about: string;
  close: string;
  loadSampleData: string;
  optional: string;
  
  // Menu items
  menu: string;
  saveList: string;
  openList: string;
  newList: string;
  deleteList: string;
  
  // Save/Open dialogs
  saveListAs: string;
  listName: string;
  overwriteList: string;
  savedLists: string;
  noSavedLists: string;
  maxListsReached: string;
  save: string;
  
  // Category Selection Modal
  whichCategory: string;
  addNewCategory: string;
}

const translations: Record<Language, Translations> = {
  sv: {
    // Header
    shoppingList: 'Inköpslista',
    settings: 'Inställningar',
    
    // Categories
    dairyProducts: 'Mejeriprodukter',
    fruits: 'Frukt',
    vegetables: 'Grönsaker',
    meat: 'Kött',
    fish: 'Fisk',
    breadsAndPastries: 'Bröd och bakverk',
    pantry: 'Skafferi',
    frozen: 'Frys',
    drinks: 'Drycker',
    snacks: 'Snacks',
    household: 'Hushåll',
    personalCare: 'Hygien',
    
    // Add Item Modal
    addItem: 'Lägg till vara',
    itemName: 'Varans namn',
    description: 'Beskrivning',
    category: 'Kategori',
    selectCategory: 'Välj kategori',
    cancel: 'Avbryt',
    add: 'Lägg till',
    
    // Settings
    language: 'Språk',
    swedish: 'Svenska',
    english: 'English',
    darkMode: 'Mörkt läge',
    about: 'Om appen',
    close: 'Stäng',
    loadSampleData: 'Ladda exempeldata',
    optional: 'valfri',
    
    // Menu items
    menu: 'Meny',
    saveList: 'Spara lista',
    openList: 'Öppna lista', 
    newList: 'Ny lista',
    deleteList: 'Ta bort lista',
    
    // Save/Open dialogs
    saveListAs: 'Spara lista som',
    listName: 'Listnamn',
    overwriteList: 'Skriv över befintlig lista?',
    savedLists: 'Sparade listor',
    noSavedLists: 'Inga sparade listor',
    maxListsReached: 'Max 5 listor kan sparas',
    save: 'Spara',
    
    // Category Selection Modal
    whichCategory: 'Vilken kategori hör "{item}" till?',
    addNewCategory: 'Lägg till ny kategori',
  },
  en: {
    // Header
    shoppingList: 'Shopping List',
    settings: 'Settings',
    
    // Categories
    dairyProducts: 'Dairy Products',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    meat: 'Meat',
    fish: 'Fish',
    breadsAndPastries: 'Breads and pastries',
    pantry: 'Pantry',
    frozen: 'Frozen',
    drinks: 'Drinks',
    snacks: 'Snacks',
    household: 'Household',
    personalCare: 'Personal Care',
    
    // Add Item Modal
    addItem: 'Add Item',
    itemName: 'Item name',
    description: 'Description',
    category: 'Category',
    selectCategory: 'Select category',
    cancel: 'Cancel',
    add: 'Add',
    
    // Settings
    language: 'Language',
    swedish: 'Svenska',
    english: 'English',
    darkMode: 'Dark Mode',
    about: 'About',
    close: 'Close',
    loadSampleData: 'Load Sample Data',
    optional: 'optional',
    
    // Menu items
    menu: 'Menu',
    saveList: 'Save List',
    openList: 'Open List',
    newList: 'New List', 
    deleteList: 'Delete List',
    
    // Save/Open dialogs
    saveListAs: 'Save List As',
    listName: 'List Name',
    overwriteList: 'Overwrite existing list?',
    savedLists: 'Saved Lists',
    noSavedLists: 'No saved lists',
    maxListsReached: 'Max 5 lists can be saved',
    save: 'Save',
    
    // Category Selection Modal
    whichCategory: 'Which category does "{item}" belong to?',
    addNewCategory: 'Add new category',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Swedish
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'sv';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};