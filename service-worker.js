const CACHE_NAME = "neuroedge-cache-v1";
// It's good practice to list all assets you want to cache on install,
// including the offline page and core application shell assets.
const ASSETS_TO_CACHE = [
    CACHE_NAME,
    "/offline.html",
    "/favicon.ico",
    "/neuroedge-logo.png",
    "/index.html",
    "/app.js",
    "/app.css"
    // Add other critical application files here
];

// --- 🛠️ Install Event: Cache Core Assets ---
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing and caching shell assets.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use cache.addAll() to ensure all necessary files are cached.
      // If any file fails to download, the entire install process fails.
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Forces the waiting service worker to become the active worker.
  self.skipWaiting();
});

// --- 🧹 Activate Event: Clean up old caches ---
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating and cleaning old caches.");
  event.waitUntil(
    caches.keys().then((keys) => {
      // Use Promise.all to wait for all deletion promises to resolve.
      return Promise.all(
        keys.map((key) => {
          // Check if the key is NOT the current cache name.
          if (key !== CACHE_NAME) {
            console.log(`Deleting old cache: ${key}`);
            return caches.delete(key);
          }
        })
        // The map function can return 'undefined' for the current cache,
        // so we filter out undefined values to avoid issues with Promise.all.
        .filter(Boolean) 
      );
    })
  );
  // Takes control of clients on first load.
  self.clients.claim();
  console.log("NeuroEdge PWA Active");
});

// --- 🌐 Fetch Event: Caching and Offline Strategy ---
self.addEventListener("fetch", (event) => {
  // Strategy: Cache-First for most assets (images, CSS, JS)
  // Strategy: Network-First/Offline-Fallback for HTML navigation
  
  if (event.request.mode === "navigate") {
    // 1. Try the Network (fetch(event.request))
    // 2. If Network fails (.catch()), serve the Offline Page.
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html"))
    );
  } else {
    // For non-navigation requests (assets like images, scripts, styles):
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 1. Return cached response if available.
        if (response) {
          return response;
        }
        
        // 2. If not in cache, go to the network.
        return fetch(event.request).then((fetchResponse) => {
          // OPTIONAL: If the asset is a new one (not explicitly pre-cached) 
          // and you want to cache it on the fly, you would add the logic here.
          // This is often called "Cache-Then-Network" or "Stale-While-Revalidate".
          // Example:
          // if (fetchResponse.ok && event.request.method === "GET") {
          //   const responseToCache = fetchResponse.clone();
          //   caches.open(CACHE_NAME).then((cache) => {
          //     cache.put(event.request, responseToCache);
          //   });
          // }
          return fetchResponse;
        });
      })
    );
  }
});
