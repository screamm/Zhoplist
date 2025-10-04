import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'sv' | 'en' | 'es' | 'hi' | 'zh';

interface Translations {
  // Splash Screen
  appTagline: string;

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
  spanish: string;
  hindi: string;
  chinese: string;
  darkMode: string;
  about: string;
  close: string;
  loadSampleData: string;
  optional: string;
  itemAdded: string;
  addedToCategory: string;

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
  addCategoryTitle: string;
  createNewCategory: string;
  
  // Add Category Modal
  createCategory: string;
  categoryName: string;
  chooseIcon: string;
  chooseColor: string;
  preview: string;
  yourCategory: string;
  createCategoryButton: string;
  creating: string;
  categoryDescription: string;
  categoryPlaceholder: string;
  charactersRemaining: string;

  // Edit Category Modal
  editCategory: string;
  editCategoryDescription: string;
  deleteCategory: string;
  deleteCategoryConfirm: string;
  deleteCategoryWarning: string;
  yesDelete: string;
  updating: string;
  saveChanges: string;

  // AddItemModal
  quantity: string;
  categorySelected: string;
  noCategorySelected: string;
  clickToSelect: string;

  // Settings/Menu
  settingsTitle: string;
  manageListsLanguage: string;
  saveCurrentList: string;
  openSavedList: string;
  createEmptyList: string;
  joinListCode: string;
  enterCodeForSharing: string;
  createListCode: string;
  forSharingWithOthers: string;
  removeAds: string;
  oneTimePurchase: string;
}

const translations: Record<Language, Translations> = {
  sv: {
    // Splash Screen
    appTagline: 'Din smarta handlingslista',

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
    spanish: 'Español',
    hindi: 'हिन्दी',
    chinese: '中文',
    darkMode: 'Mörkt läge',
    about: 'Om appen',
    close: 'Stäng',
    loadSampleData: 'Ladda exempeldata',
    optional: 'valfri',
    itemAdded: 'Vara tillagd',
    addedToCategory: 'lades till i',

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
    addCategoryTitle: 'Lägg till kategori',
    createNewCategory: 'Skapa ny kategori',
    
    // Add Category Modal
    createCategory: 'Skapa kategori',
    categoryName: 'Kategorinamn',
    chooseIcon: 'Välj ikon',
    chooseColor: 'Välj färg',
    preview: 'Förhandsvisning',
    yourCategory: 'Din kategori',
    createCategoryButton: 'Skapa kategori',
    creating: 'Skapar',
    categoryDescription: 'Skapa en egen kategori för dina varor',
    categoryPlaceholder: 't.ex. Husdjur, Sport, Elektronik',
    charactersRemaining: 'tecken',

    // Edit Category Modal
    editCategory: 'Redigera kategori',
    editCategoryDescription: 'Ändra namn, ikon eller färg för din kategori',
    deleteCategory: 'Ta bort',
    deleteCategoryConfirm: 'Ta bort kategori?',
    deleteCategoryWarning: 'Är du säker på att du vill ta bort kategorin',
    yesDelete: 'Ja, ta bort',
    updating: 'Uppdaterar',
    saveChanges: 'Spara ändringar',

    // AddItemModal
    quantity: 'Antal',
    categorySelected: 'Kategori vald',
    noCategorySelected: 'Ingen kategori vald',
    clickToSelect: 'Klicka för att välja',

    // Settings/Menu
    settingsTitle: 'Inställningar',
    manageListsLanguage: 'Hantera listor och språk',
    saveCurrentList: 'Spara aktuell lista',
    openSavedList: 'Öppna sparad lista',
    createEmptyList: 'Skapa ny tom lista',
    joinListCode: 'Gå med i lista',
    enterCodeForSharing: 'Ange listkod för delning',
    createListCode: 'Skapa listkod',
    forSharingWithOthers: 'För delning med andra',
    removeAds: 'Slipp reklam',
    oneTimePurchase: 'Endast 69 kr - engångsköp',
  },
  en: {
    // Splash Screen
    appTagline: 'Your smart shopping list',

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
    spanish: 'Español',
    hindi: 'हिन्दी',
    chinese: '中文',
    darkMode: 'Dark Mode',
    about: 'About',
    close: 'Close',
    loadSampleData: 'Load Sample Data',
    optional: 'optional',
    itemAdded: 'Item added',
    addedToCategory: 'added to',

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
    addCategoryTitle: 'Add category',
    createNewCategory: 'Create new category',
    
    // Add Category Modal
    createCategory: 'Create category',
    categoryName: 'Category name',
    chooseIcon: 'Choose icon',
    chooseColor: 'Choose color',
    preview: 'Preview',
    yourCategory: 'Your category',
    createCategoryButton: 'Create category',
    creating: 'Creating',
    categoryDescription: 'Create your own category for your items',
    categoryPlaceholder: 'e.g. Pets, Sports, Electronics',
    charactersRemaining: 'characters',

    // Edit Category Modal
    editCategory: 'Edit category',
    editCategoryDescription: 'Change name, icon or color for your category',
    deleteCategory: 'Delete',
    deleteCategoryConfirm: 'Delete category?',
    deleteCategoryWarning: 'Are you sure you want to delete the category',
    yesDelete: 'Yes, delete',
    updating: 'Updating',
    saveChanges: 'Save changes',

    // AddItemModal
    quantity: 'Quantity',
    categorySelected: 'Category selected',
    noCategorySelected: 'No category selected',
    clickToSelect: 'Click to select',

    // Settings/Menu
    settingsTitle: 'Settings',
    manageListsLanguage: 'Manage lists and language',
    saveCurrentList: 'Save current list',
    openSavedList: 'Open saved list',
    createEmptyList: 'Create new empty list',
    joinListCode: 'Join list',
    enterCodeForSharing: 'Enter list code for sharing',
    createListCode: 'Create list code',
    forSharingWithOthers: 'For sharing with others',
    removeAds: 'Remove ads',
    oneTimePurchase: 'Only $0.99 - one-time purchase',
  },
  es: {
    // Splash Screen
    appTagline: 'Tu lista de compras inteligente',

    // Header
    shoppingList: 'Lista de Compras',
    settings: 'Configuración',

    // Categories
    dairyProducts: 'Productos Lácteos',
    fruits: 'Frutas',
    vegetables: 'Verduras',
    meat: 'Carne',
    fish: 'Pescado',
    breadsAndPastries: 'Panes y Pasteles',
    pantry: 'Despensa',
    frozen: 'Congelados',
    drinks: 'Bebidas',
    snacks: 'Aperitivos',
    household: 'Hogar',
    personalCare: 'Cuidado Personal',

    // Add Item Modal
    addItem: 'Agregar Artículo',
    itemName: 'Nombre del artículo',
    description: 'Descripción',
    category: 'Categoría',
    selectCategory: 'Seleccionar categoría',
    cancel: 'Cancelar',
    add: 'Agregar',

    // Settings
    language: 'Idioma',
    swedish: 'Svenska',
    english: 'English',
    spanish: 'Español',
    hindi: 'हिन्दी',
    chinese: '中文',
    darkMode: 'Modo Oscuro',
    about: 'Acerca de',
    close: 'Cerrar',
    loadSampleData: 'Cargar Datos de Ejemplo',
    optional: 'opcional',
    itemAdded: 'Artículo agregado',
    addedToCategory: 'agregado a',

    // Menu items
    menu: 'Menú',
    saveList: 'Guardar Lista',
    openList: 'Abrir Lista',
    newList: 'Nueva Lista',
    deleteList: 'Eliminar Lista',

    // Save/Open dialogs
    saveListAs: 'Guardar Lista Como',
    listName: 'Nombre de Lista',
    overwriteList: '¿Sobrescribir lista existente?',
    savedLists: 'Listas Guardadas',
    noSavedLists: 'No hay listas guardadas',
    maxListsReached: 'Se pueden guardar máximo 5 listas',
    save: 'Guardar',

    // Category Selection Modal
    whichCategory: '¿A qué categoría pertenece "{item}"?',
    addNewCategory: 'Agregar nueva categoría',
    addCategoryTitle: 'Agregar categoría',
    createNewCategory: 'Crear nueva categoría',

    // Add Category Modal
    createCategory: 'Crear categoría',
    categoryName: 'Nombre de categoría',
    chooseIcon: 'Elegir icono',
    chooseColor: 'Elegir color',
    preview: 'Vista Previa',
    yourCategory: 'Tu categoría',
    createCategoryButton: 'Crear categoría',
    creating: 'Creando',
    categoryDescription: 'Crea tu propia categoría para tus artículos',
    categoryPlaceholder: 'ej. Mascotas, Deportes, Electrónica',
    charactersRemaining: 'caracteres',

    // Edit Category Modal
    editCategory: 'Editar categoría',
    editCategoryDescription: 'Cambiar nombre, icono o color de tu categoría',
    deleteCategory: 'Eliminar',
    deleteCategoryConfirm: '¿Eliminar categoría?',
    deleteCategoryWarning: '¿Estás seguro de que quieres eliminar la categoría',
    yesDelete: 'Sí, eliminar',
    updating: 'Actualizando',
    saveChanges: 'Guardar cambios',

    // AddItemModal
    quantity: 'Cantidad',
    categorySelected: 'Categoría seleccionada',
    noCategorySelected: 'Ninguna categoría seleccionada',
    clickToSelect: 'Haz clic para seleccionar',

    // Settings/Menu
    settingsTitle: 'Configuración',
    manageListsLanguage: 'Gestionar listas e idioma',
    saveCurrentList: 'Guardar lista actual',
    openSavedList: 'Abrir lista guardada',
    createEmptyList: 'Crear nueva lista vacía',
    joinListCode: 'Unirse a lista',
    enterCodeForSharing: 'Ingresa código para compartir',
    createListCode: 'Crear código de lista',
    forSharingWithOthers: 'Para compartir con otros',
    removeAds: 'Quitar anuncios',
    oneTimePurchase: 'Solo 69 kr - compra única',
  },
  hi: {
    // Splash Screen
    appTagline: 'आपकी स्मार्ट खरीदारी सूची',

    // Header
    shoppingList: 'खरीदारी सूची',
    settings: 'सेटिंग्स',

    // Categories
    dairyProducts: 'डेयरी उत्पाद',
    fruits: 'फल',
    vegetables: 'सब्जियां',
    meat: 'मांस',
    fish: 'मछली',
    breadsAndPastries: 'ब्रेड और पेस्ट्री',
    pantry: 'भंडार',
    frozen: 'फ्रोजन',
    drinks: 'पेय',
    snacks: 'स्नैक्स',
    household: 'घरेलू',
    personalCare: 'व्यक्तिगत देखभाल',

    // Add Item Modal
    addItem: 'आइटम जोड़ें',
    itemName: 'आइटम का नाम',
    description: 'विवरण',
    category: 'श्रेणी',
    selectCategory: 'श्रेणी चुनें',
    cancel: 'रद्द करें',
    add: 'जोड़ें',

    // Settings
    language: 'भाषा',
    swedish: 'Svenska',
    english: 'English',
    spanish: 'Español',
    hindi: 'हिन्दी',
    chinese: '中文',
    darkMode: 'डार्क मोड',
    about: 'के बारे में',
    close: 'बंद करें',
    loadSampleData: 'नमूना डेटा लोड करें',
    optional: 'वैकल्पिक',
    itemAdded: 'आइटम जोड़ा गया',
    addedToCategory: 'में जोड़ा गया',

    // Menu items
    menu: 'मेनू',
    saveList: 'सूची सहेजें',
    openList: 'सूची खोलें',
    newList: 'नई सूची',
    deleteList: 'सूची हटाएं',

    // Save/Open dialogs
    saveListAs: 'सूची इस रूप में सहेजें',
    listName: 'सूची का नाम',
    overwriteList: 'मौजूदा सूची को ओवरराइट करें?',
    savedLists: 'सहेजी गई सूचियां',
    noSavedLists: 'कोई सहेजी गई सूची नहीं',
    maxListsReached: 'अधिकतम 5 सूचियां सहेजी जा सकती हैं',
    save: 'सहेजें',

    // Category Selection Modal
    whichCategory: '"{item}" किस श्रेणी से संबंधित है?',
    addNewCategory: 'नई श्रेणी जोड़ें',
    addCategoryTitle: 'श्रेणी जोड़ें',
    createNewCategory: 'नई श्रेणी बनाएं',

    // Add Category Modal
    createCategory: 'श्रेणी बनाएं',
    categoryName: 'श्रेणी का नाम',
    chooseIcon: 'आइकन चुनें',
    chooseColor: 'रंग चुनें',
    preview: 'पूर्वावलोकन',
    yourCategory: 'आपकी श्रेणी',
    createCategoryButton: 'श्रेणी बनाएं',
    creating: 'बनाया जा रहा है',
    categoryDescription: 'अपनी वस्तुओं के लिए अपनी श्रेणी बनाएं',
    categoryPlaceholder: 'जैसे पालतू जानवर, खेल, इलेक्ट्रॉनिक्स',
    charactersRemaining: 'वर्ण',

    // Edit Category Modal
    editCategory: 'श्रेणी संपादित करें',
    editCategoryDescription: 'अपनी श्रेणी का नाम, आइकन या रंग बदलें',
    deleteCategory: 'हटाएं',
    deleteCategoryConfirm: 'श्रेणी हटाएं?',
    deleteCategoryWarning: 'क्या आप वाकई श्रेणी को हटाना चाहते हैं',
    yesDelete: 'हां, हटाएं',
    updating: 'अपडेट किया जा रहा है',
    saveChanges: 'परिवर्तन सहेजें',

    // AddItemModal
    quantity: 'मात्रा',
    categorySelected: 'श्रेणी चुनी गई',
    noCategorySelected: 'कोई श्रेणी नहीं चुनी गई',
    clickToSelect: 'चुनने के लिए क्लिक करें',

    // Settings/Menu
    settingsTitle: 'सेटिंग्स',
    manageListsLanguage: 'सूचियों और भाषा का प्रबंधन करें',
    saveCurrentList: 'वर्तमान सूची सहेजें',
    openSavedList: 'सहेजी गई सूची खोलें',
    createEmptyList: 'नई खाली सूची बनाएं',
    joinListCode: 'सूची में शामिल हों',
    enterCodeForSharing: 'साझा करने के लिए कोड दर्ज करें',
    createListCode: 'सूची कोड बनाएं',
    forSharingWithOthers: 'दूसरों के साथ साझा करने के लिए',
    removeAds: 'विज्ञापन हटाएं',
    oneTimePurchase: 'केवल 69 kr - एक बार की खरीद',
  },
  zh: {
    // Splash Screen
    appTagline: '您的智能购物清单',

    // Header
    shoppingList: '购物清单',
    settings: '设置',

    // Categories
    dairyProducts: '乳制品',
    fruits: '水果',
    vegetables: '蔬菜',
    meat: '肉类',
    fish: '鱼类',
    breadsAndPastries: '面包和糕点',
    pantry: '储藏室',
    frozen: '冷冻食品',
    drinks: '饮料',
    snacks: '零食',
    household: '家居用品',
    personalCare: '个人护理',

    // Add Item Modal
    addItem: '添加物品',
    itemName: '物品名称',
    description: '描述',
    category: '类别',
    selectCategory: '选择类别',
    cancel: '取消',
    add: '添加',

    // Settings
    language: '语言',
    swedish: 'Svenska',
    english: 'English',
    spanish: 'Español',
    hindi: 'हिन्दी',
    chinese: '中文',
    darkMode: '深色模式',
    about: '关于',
    close: '关闭',
    loadSampleData: '加载示例数据',
    optional: '可选',
    itemAdded: '物品已添加',
    addedToCategory: '已添加到',

    // Menu items
    menu: '菜单',
    saveList: '保存清单',
    openList: '打开清单',
    newList: '新清单',
    deleteList: '删除清单',

    // Save/Open dialogs
    saveListAs: '另存为清单',
    listName: '清单名称',
    overwriteList: '覆盖现有清单？',
    savedLists: '已保存的清单',
    noSavedLists: '没有已保存的清单',
    maxListsReached: '最多可以保存5个清单',
    save: '保存',

    // Category Selection Modal
    whichCategory: '"{item}" 属于哪个类别？',
    addNewCategory: '添加新类别',
    addCategoryTitle: '添加类别',
    createNewCategory: '创建新类别',

    // Add Category Modal
    createCategory: '创建类别',
    categoryName: '类别名称',
    chooseIcon: '选择图标',
    chooseColor: '选择颜色',
    preview: '预览',
    yourCategory: '你的类别',
    createCategoryButton: '创建类别',
    creating: '正在创建',
    categoryDescription: '为您的商品创建自己的类别',
    categoryPlaceholder: '例如 宠物、运动、电子产品',
    charactersRemaining: '字符',

    // Edit Category Modal
    editCategory: '编辑类别',
    editCategoryDescription: '更改类别的名称、图标或颜色',
    deleteCategory: '删除',
    deleteCategoryConfirm: '删除类别？',
    deleteCategoryWarning: '您确定要删除该类别吗',
    yesDelete: '是的，删除',
    updating: '正在更新',
    saveChanges: '保存更改',

    // AddItemModal
    quantity: '数量',
    categorySelected: '已选择类别',
    noCategorySelected: '未选择类别',
    clickToSelect: '点击选择',

    // Settings/Menu
    settingsTitle: '设置',
    manageListsLanguage: '管理列表和语言',
    saveCurrentList: '保存当前列表',
    openSavedList: '打开已保存的列表',
    createEmptyList: '创建新空列表',
    joinListCode: '加入列表',
    enterCodeForSharing: '输入代码进行共享',
    createListCode: '创建列表代码',
    forSharingWithOthers: '用于与他人共享',
    removeAds: '移除广告',
    oneTimePurchase: '仅 69 kr - 一次性购买',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to English
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
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