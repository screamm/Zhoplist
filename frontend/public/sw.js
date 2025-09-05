// Service Worker för Zhoplist PWA
const CACHE_NAME = 'zhoplist-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/app-icon.svg'
];

// Dynamisk cache för API-svar
const API_CACHE = 'zhoplist-api-v1';
const API_CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minuter

// Installera Service Worker och cacha statiska resurser
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Aktivera Service Worker och rensa gamla cacher
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('zhoplist-') &&
                   cacheName !== CACHE_NAME &&
                   cacheName !== API_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Hantera fetch requests med offline-first strategi
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API-anrop - Network first, fall back to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Klona responsen innan vi cachear
          const responseToCache = response.clone();
          
          caches.open(API_CACHE).then((cache) => {
            // Lägg till timestamp för cache-validering
            const headers = new Headers(responseToCache.headers);
            headers.append('sw-fetched-on', new Date().getTime());
            
            const responseWithHeaders = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers
            });
            
            cache.put(request, responseWithHeaders);
          });
          
          return response;
        })
        .catch(() => {
          // Om offline, använd cachad data
          return caches.match(request).then((response) => {
            if (response) {
              const fetchedOn = response.headers.get('sw-fetched-on');
              if (fetchedOn) {
                const age = Date.now() - parseInt(fetchedOn);
                if (age < API_CACHE_MAX_AGE) {
                  return response;
                }
              }
            }
            // Returnera offline-meddelande
            return new Response(
              JSON.stringify({ 
                offline: true, 
                message: 'Du är offline. Visar cachad data.' 
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Statiska resurser - Cache first, fall back to network
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(request).then((response) => {
          // Cacha endast GET-requests och lyckade svar
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // Visa offline-sida om ingen cache finns
        if (request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Hantera bakgrundssynkronisering
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-todos') {
    event.waitUntil(syncTodos());
  }
});

async function syncTodos() {
  try {
    // Hämta väntande ändringar från IndexedDB
    const pendingChanges = await getPendingChanges();
    
    // Synka med servern
    for (const change of pendingChanges) {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(change)
      });
      
      // Markera som synkad
      await markAsSynced(change.id);
    }
    
    // Meddela klienten om lyckad synk
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SYNC_COMPLETE',
          timestamp: Date.now()
        });
      });
    });
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Hjälpfunktioner för IndexedDB (implementeras senare med faktisk DB-kod)
async function getPendingChanges() {
  // Implementeras med IndexedDB
  return [];
}

async function markAsSynced(id) {
  // Implementeras med IndexedDB
  return true;
}

// Push-notiser
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Ny uppdatering i din lista!',
      icon: '/icon-192.svg',
      badge: '/icon-192.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        url: data.url || '/'
      },
      actions: [
        { action: 'open', title: 'Öppna' },
        { action: 'close', title: 'Stäng' }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Zhoplist', options)
    );
  }
});

// Hantera klick på notiser
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});