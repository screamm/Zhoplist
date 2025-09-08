# Frontend Komponenter Dokumentation

## Översikt

Zhoplists frontend är byggd som en modern React PWA (Progressive Web App) med TypeScript och Tailwind CSS. Applikationen använder komponentbaserad arkitektur med hooks, context och utilities för state management och funktionalitet.

## Huvudkomponenter

### 1. App.tsx (`/src/App.tsx`)
**Syfte**: Huvudapplikationskomponent som hanterar PWA-funktionalitet och övergripande state.

**Funktioner**:
- `AppContent()`: Hanterar PWA-initialisering och offline-status
- `App()`: Root-komponent med providers för context

**Nyckelfunktionalitet**:
- Service Worker-registrering
- PWA installationsprompt
- Offline-hantering med visuell indikator
- App shortcuts hantering
- Share Target API för delning av listor
- Play Store detektering

**Använder**:
- `TodoProvider` och `LanguageProvider` för state management
- PWA utilities från `utils/pwa.ts`
- `ModernShoppingList` och `EditTodoModal` komponenter

### 2. ModernShoppingList.tsx (`/src/components/ModernShoppingList.tsx`)
**Syfte**: Huvudkomponent för inköpslistvisning med kategoriserad layout.

**Funktioner**:
- `CategoryRow`: Visar kategorirubriker med expanderbar lista
- `ModernShoppingList`: Huvudkomponent för listhantering

**Nyckelfunktionalitet**:
- Kategoriserad visning av inköpslistor
- Animerade bakgrundseffekter
- Expandera/kollaps kategorier
- Quick-add funktionalitet
- Integration med `AddItemModal`

**Props och State**:
```typescript
interface CategoryRowProps {
  category: Category;
  items: Todo[];
  onCategoryClick: () => void;
  isExpanded: boolean;
  onToggleItem: (itemId: string) => void;
}
```

### 3. AddItemModal.tsx (`/src/components/AddItemModal.tsx`)
**Syfte**: Modal för att lägga till nya items med smart autocomplete.

**Nyckelfunktionalitet**:
- Smart autocomplete med Fuse.js
- Användarhistorik och popularitetsspårning
- Produktkategorisering
- Offline-support med lokal lagring

### 4. EditTodoModal.tsx (`/src/components/EditTodoModal.tsx`)
**Syfte**: Modal för redigering av befintliga todos.

**Nyckelfunktionalitet**:
- Formulärhantering för todo-uppdateringar
- Prioritering och kategorisering
- Taggar och beskrivningar
- Datum och tid hantering

## Context och State Management

### TodoContext.tsx (`/src/context/TodoContext.tsx`)
**Syfte**: Centraliserad state management för todos med offline-support.

**State Interface**:
```typescript
interface TodoState {
  todos: Todo[];
  editingTodo: Todo | null;
  isAddModalOpen: boolean;
  filter: TodoFilter;
  sort: TodoSort;
  isLoading: boolean;
  error: string | null;
  toasts: ToastNotification[];
}
```

**Actions**:
- `ADD_TODO`: Lägg till ny todo
- `UPDATE_TODO`: Uppdatera befintlig todo
- `DELETE_TODO`: Ta bort todo
- `TOGGLE_TODO`: Växla completed status
- `SET_FILTER`: Sätt filter för visning
- `SET_SORT`: Sätt sorteringsordning
- `SET_LOADING`: Hantera loading state
- `SET_ERROR`: Hantera felmeddelanden

**Funktioner**:
- `saveToStorage()`: Spara till localStorage för offline
- `loadFromStorage()`: Ladda från localStorage
- `syncWithAPI()`: Synkronisera med backend API

### LanguageContext.tsx (`/src/context/LanguageContext.tsx`)
**Syfte**: Flerspråkigt stöd och översättningshantering.

**Funktioner**:
- `t(key: string)`: Översättningsfunktion
- `setLanguage(lang: string)`: Byt språk
- Automatisk språkdetektering baserat på browser

## Hooks (Anpassade React Hooks)

### useSwipeGestures.ts (`/src/hooks/useSwipeGestures.ts`)
**Syfte**: Hantera touch-gester för mobil interaktion.

**Konfiguration**:
```typescript
interface SwipeConfig {
  minDistance?: number;    // Minimum swipe distance (50px)
  threshold?: number;      // Velocity threshold (0.5)
  preventScroll?: boolean; // Prevent scroll during swipe
}
```

**Callbacks**:
```typescript
interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipeMove?: (deltaX: number, deltaY: number) => void;
  onSwipeEnd?: () => void;
}
```

**Returnerar**:
- `swipeProps`: Touch event handlers
- `isTracking`: Pågående swipe status
- `swipeDirection`: Riktning för swipe
- `swipeProgress`: Progress (0-1) för swipe

### usePullToRefresh.ts (`/src/hooks/usePullToRefresh.ts`)
**Syfte**: Pull-to-refresh funktionalitet för mobilenheter.

**Funktioner**:
- Detekterar pull-down gest
- Visuell feedback under drag
- Trigger refresh callback vid release
- Anpassningsbar threshold och animationer

### useSwipe.ts (`/src/hooks/useSwipe.ts`)
**Syfte**: Enklare swipe-detektion för grundläggande gester.

## Utilities

### api.ts (`/src/utils/api.ts`)
**Syfte**: Centraliserad API-kommunikation med fallback till mock data.

**Nyckelfunktioner**:
- `fetchWithTimeout()`: HTTP requests med timeout
- `shouldUseMockData()`: Bestäm om mock data ska användas
- API availability tracking med cache

**API Metoder**:
```typescript
export const api = {
  getTodos(): Promise<APIResponse<Todo[]>>
  createTodo(data: TodoFormData): Promise<APIResponse<Todo>>
  updateTodo(id: string, data: TodoFormData): Promise<APIResponse<Todo>>
  deleteTodo(id: string): Promise<APIResponse<void>>
  deleteCompleted(): Promise<APIResponse<DeleteCompletedResponse>>
  toggleTodo(id: string): Promise<APIResponse<Todo>>
}
```

### smartAutocomplete.ts (`/src/utils/smartAutocomplete.ts`)
**Syfte**: Intelligent autocomplete med machine learning och användarhistorik.

**Funktioner**:
- `getSuggestions(query: string)`: Hämta förslag baserat på input
- `recordUsage(productName: string)`: Spåra användarhistorik
- `updateUserHistory()`: Uppdatera popularitetsdata

**Algoritmer**:
- Fuse.js för fuzzy search
- Popularity scoring baserat på användning
- Kategorisering av produkter
- Cache för prestanda

### sessionManager.ts (`/src/utils/sessionManager.ts`)
**Syfte**: Hantera användarsessioner för multi-user support.

**Funktioner**:
- `getSessionId()`: Hämta eller skapa session ID
- `createNewSession()`: Skapa ny session
- `switchSession(id: string)`: Byt till annan session
- Persistent lagring i localStorage

### pwa.ts (`/src/utils/pwa.ts`)
**Syfte**: PWA-funktionalitet och service worker hantering.

**Funktioner**:
- `registerServiceWorker()`: Registrera SW för offline-support
- `setupInstallPrompt()`: Hantera PWA installationsprompt
- `setupOfflineHandling()`: Konfigurera offline-läge
- `handleAppShortcuts()`: App shortcuts från hemskärm
- `handleShareTarget()`: Share Target API
- `isPWA()`: Detektera om app körs som PWA
- `isFromPlayStore()`: Detektera Google Play installation

### animations.ts (`/src/utils/animations.ts`)
**Syfte**: Animationsutilities för smooth UI-övergångar.

**Funktioner**:
- Easing functions för naturliga animationer
- Fade in/out utilities
- Slide animationer
- Spring physics för interaktioner

## Typdefinitioner

### index.ts (`/src/types/index.ts`)
**Todo Interface**:
```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 0 | 1 | 2;
  category?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  userSession: string;
}
```

**Form och UI Typer**:
```typescript
interface TodoFormData {
  title: string;
  description?: string;
  priority?: 0 | 1 | 2;
  category?: string;
  dueDate?: string;
  tags?: string[];
}

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface SwipeGesture {
  direction: 'left' | 'right';
  distance: number;
  velocity: number;
}
```

### categories.ts (`/src/types/categories.ts`)
**Kategoridefinitioner**:
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}
```

## Data och Mock-funktionalitet

### swedishProducts.ts (`/src/data/swedishProducts.ts`)
**Syfte**: Databas över svenska produkter för autocomplete.

**Struktur**:
```typescript
interface Product {
  name: string;
  category: string;
  aliases?: string[];
  popularity?: number;
}
```

### mockData.ts (`/src/utils/mockData.ts`)
**Syfte**: Mock API för utveckling och offline-läge.

**Funktioner**:
- `createMockAPI()`: Skapa mock API instans
- Simulera API delays och errors
- Persistent mock data i localStorage

### shoppingMockData.ts (`/src/utils/shoppingMockData.ts`)
**Syfte**: Generera realistisk testdata för shopping listor.

## Testning

### Test Setup (`/src/test/setup.ts`)
**Konfiguration för Vitest och React Testing Library**:
- jsdom environment setup
- Custom matchers från @testing-library/jest-dom
- Global test utilities

### Testfiler
- `__tests__/SimpleApp.test.tsx`: Grundläggande app-testning
- `utils/__tests__/`: Utility function testing
- `components/__tests__/`: Komponentspecifika tester

## Byggprocess och Development

### Vite Konfiguration
- TypeScript compilation
- Hot Module Replacement (HMR)
- PWA manifest generation
- Asset optimization

### PWA Funktioner
- Service Worker för offline-support
- Web App Manifest för installation
- Icons för olika plattformar
- Background sync för data

### Mobile Integration (Capacitor)
- Native Android build support
- AdMob integration för intäkter
- Device-specific optimizations
- Play Store deployment

## Prestandaoptimering

1. **Lazy Loading**: Komponenter laddas vid behov
2. **Memoization**: React.memo för dyra re-renders
3. **Virtual Scrolling**: För långa listor
4. **Image Optimization**: Responsiva bilder med lazy loading
5. **Bundle Splitting**: Code splitting för mindre initial load
6. **Service Worker Caching**: Aggressiv caching för snabb startup

## Säkerhet

1. **Input Sanitization**: XSS-skydd för användarinput
2. **HTTPS Only**: Alla API-anrop över säkra anslutningar
3. **Session Management**: Säker hantering av session tokens
4. **Content Security Policy**: CSP headers för säkerhet

---

*Frontend-dokumentation uppdaterad: 2025-09-07*