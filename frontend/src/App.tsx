// React import not needed in React 19
import { useEffect, useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import { ModernShoppingList } from './components/ModernShoppingList';
import { EditTodoModal } from './components/EditTodoModal';
import { useTodo } from './context/TodoContext';
import { 
  registerServiceWorker, 
  setupInstallPrompt, 
  setupOfflineHandling,
  handleAppShortcuts,
  handleShareTarget,
  isPWA,
  isFromPlayStore
} from './utils/pwa';

function AppContent() {
  const { state, dispatch } = useTodo();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    // Registrera Service Worker
    registerServiceWorker();
    
    // Setup PWA install prompt
    setupInstallPrompt();
    
    // Setup offline handling
    const online = setupOfflineHandling();
    setIsOffline(!online);
    
    // Hantera app shortcuts
    const shortcutAction = handleAppShortcuts();
    if (shortcutAction) {
      if (shortcutAction.action === 'new-list') {
        // Öppna ny lista modal
        dispatch({ type: 'SET_ADD_MODAL_OPEN', payload: true });
      } else if (shortcutAction.action === 'recent') {
        // Ladda senaste listan - för nu bara öppna add modal
        dispatch({ type: 'SET_ADD_MODAL_OPEN', payload: true });
      }
    }
    
    // Hantera Share Target
    handleShareTarget().then(sharedData => {
      if (sharedData?.items) {
        // Lägg till delade items i listan
        sharedData.items.forEach(item => {
          dispatch({ 
            type: 'ADD_TODO', 
            payload: { 
              id: `shared-${Date.now()}-${Math.random()}`,
              title: item,
              completed: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              category: 'pantry',
              priority: 1,
              tags: [],
              userSession: 'shared'
            }
          });
        });
      }
    });
    
    // Lyssna på online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Log PWA status
    if (isPWA()) {
      console.log('App körs som PWA!');
      if (isFromPlayStore()) {
        console.log('Installerad från Google Play Store!');
        // Aktivera Google Sign-In automatiskt
        // handleGoogleAuth();
      }
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);
  
  return (
    <div className="min-h-screen">
      {/* Offline-indikator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
          Du är offline - ändringar sparas lokalt
        </div>
      )}
      
      
      <ModernShoppingList />
      {state.editingTodo && <EditTodoModal todo={state.editingTodo} />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </LanguageProvider>
  );
}

export default App;
