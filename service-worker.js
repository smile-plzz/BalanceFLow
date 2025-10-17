const CACHE_NAME = 'work-break-balance-cache-v3'; // Increment version to force update
const urlsToCache = [
    './',
    './index.html',
    // 1. Updated Tailwind CSS URL to match the one used in the new index.html
    'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.3/dist/tailwind.min.css',
    // 2. Add PWA related assets (manifest and icon)
    './manifest.json', 
    './icon-192.png'
    // 3. If you have a dedicated offline page (e.g., './offline.html'), add it here.
];

// Self is the ServiceWorkerGlobalScope
self.addEventListener('install', event => {
    // Forces the waiting service worker to become the active service worker
    self.skipWaiting(); 
    console.log('[Service Worker] Install event: Caching Shell assets.');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Ensure all critical assets are added. If any fail, the install fails.
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[Service Worker] Cache addAll failed:', error);
                // The install event will fail here, preventing an unstable SW from activating.
                throw error;
            })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate event: Cleaning up old caches.');
    
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                // Delete caches that are not the current one (CACHE_NAME)
                if (key !== CACHE_NAME) {
                    console.log(`[Service Worker] Deleting old cache: ${key}`);
                    return caches.delete(key);
                }
            })
        )).then(() => {
            // Take control of the page immediately, so updates apply faster
            return self.clients.claim(); 
        })
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;
    
    // Skip requests that aren't GET or are for extensions we don't care about (e.g., analytics)
    if (request.method !== 'GET' || request.url.includes('google-analytics')) {
        return;
    }

    // Cache-First, then Network for all requests
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached data immediately if available (Cache-First)
                if (cachedResponse) {
                    // Optional: Fetch the newest version in the background (Stale-While-Revalidate)
                    // This updates the cache for the next visit
                    const fetchAndCache = fetch(request)
                        .then(networkResponse => {
                            if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
                                caches.open(CACHE_NAME).then(cache => {
                                    cache.put(request, networkResponse.clone());
                                });
                            }
                            return networkResponse;
                        })
                        .catch(error => {
                             // Log or handle network error if needed
                             console.log('[Service Worker] Fetch failed while revalidating:', error);
                        });
                    
                    return cachedResponse;
                }

                // If no cache, go to network and cache the response
                return fetch(request)
                    .then(networkResponse => {
                        if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, networkResponse.clone());
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        // Fallback logic for when network fails and no cache exists.
                        console.error('[Service Worker] Network and Cache failed for:', request.url, error);
                        // Optional: Return a dedicated offline response here if possible
                        // return caches.match('/offline.html'); 
                        throw error;
                    });
            })
    );
});
