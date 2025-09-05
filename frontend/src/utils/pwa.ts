// PWA utilities för Zhoplist

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

// Registrera Service Worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrerad:', registration.scope);
      
      // Kolla efter uppdateringar
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Ny version tillgänglig
              if (confirm('Ny version tillgänglig! Vill du uppdatera?')) {
                window.location.reload();
              }
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}

// Hantera PWA-installation
export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    
    // Visa installationsknapp (implementeras i UI)
    showInstallButton();
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('PWA installerad!');
    deferredPrompt = null;
    hideInstallButton();
  });
}

// Trigga installation
export async function installPWA() {
  if (!deferredPrompt) {
    return false;
  }
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`User response to install prompt: ${outcome}`);
  deferredPrompt = null;
  
  return outcome === 'accepted';
}

// Kolla om appen körs som PWA
export function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://');
}

// Kolla om appen är installerad från Play Store
export function isFromPlayStore() {
  return document.referrer.includes('android-app://com.android.vending');
}

// Hantera app shortcuts
export function handleAppShortcuts() {
  const params = new URLSearchParams(window.location.search);
  const action = params.get('action');
  
  if (action === 'new-list') {
    // Öppna modal för ny lista
    return { action: 'new-list' };
  } else if (action === 'recent') {
    // Öppna senaste listan
    return { action: 'recent' };
  }
  
  return null;
}

// Share Target API hantering
export async function handleShareTarget() {
  if (!('share' in navigator)) return;
  
  const params = new URLSearchParams(window.location.search);
  const sharedText = params.get('text');
  const sharedUrl = params.get('url');
  
  if (sharedText || sharedUrl) {
    // Parsa delad text som lista-items
    const items = parseSharedContent(sharedText || '');
    return { items, url: sharedUrl };
  }
  
  return null;
}

function parseSharedContent(text: string): string[] {
  // Parsa text som lista (radbrytningar eller kommaseparerat)
  return text.split(/[\n,]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

// Offline-status hantering
export function setupOfflineHandling() {
  let isOnline = navigator.onLine;
  
  window.addEventListener('online', () => {
    if (!isOnline) {
      isOnline = true;
      showNotification('Du är online igen! Synkroniserar...');
      syncOfflineData();
    }
  });
  
  window.addEventListener('offline', () => {
    if (isOnline) {
      isOnline = false;
      showNotification('Du är offline. Ändringar sparas lokalt.');
    }
  });
  
  return isOnline;
}

// Synka offline-data
async function syncOfflineData() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if ('sync' in registration) {
        await (registration as any).sync.register('sync-todos');
        console.log('Bakgrundssynk schemalagd');
      } else {
        manualSync();
      }
    } catch (error) {
      console.error('Bakgrundssynk misslyckades:', error);
      // Fallback: synka direkt
      manualSync();
    }
  } else {
    // Ingen serviceWorker-support, synka direkt
    manualSync();
  }
}

async function manualSync() {
  // Implementeras med faktisk synk-logik
  const pendingChanges = localStorage.getItem('pendingChanges');
  if (pendingChanges) {
    try {
      const changes = JSON.parse(pendingChanges);
      // Skicka till API
      for (const change of changes) {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(change)
        });
      }
      localStorage.removeItem('pendingChanges');
      showNotification('Synkronisering klar!');
    } catch (error) {
      console.error('Synk misslyckades:', error);
    }
  }
}

// Visa notifikationer (implementeras i UI)
function showNotification(message: string) {
  // Trigga toast notification
  const event = new CustomEvent('app-notification', { detail: { message } });
  window.dispatchEvent(event);
}

function showInstallButton() {
  const event = new CustomEvent('pwa-installable');
  window.dispatchEvent(event);
}

function hideInstallButton() {
  const event = new CustomEvent('pwa-installed');
  window.dispatchEvent(event);
}

// Premium-status (för ads)
export function isPremiumUser(): boolean {
  return localStorage.getItem('premium') === 'true';
}

export function setPremiumUser(isPremium: boolean) {
  localStorage.setItem('premium', isPremium ? 'true' : 'false');
}

// Device ID för anonym auth
export function getDeviceId(): string {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

function generateDeviceId(): string {
  return 'zhop_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Export all PWA utilities
export default {
  registerServiceWorker,
  setupInstallPrompt,
  installPWA,
  isPWA,
  isFromPlayStore,
  handleAppShortcuts,
  handleShareTarget,
  setupOfflineHandling,
  isPremiumUser,
  setPremiumUser,
  getDeviceId
};