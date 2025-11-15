 const CACHE_NAME = "neuroedge-cache-v1";
const OFFLINE_URL = "/offline.html";

// Install event: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        "/favicon.ico",
        "/neuroedge-logo.png",
        "/index.html",
        "/src/main.jsx",
        "/src/App.jsx",
        "/styles/globals.css",
        "/styles/splashscreen.css"
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
  console.log("NeuroEdge PWA Active");
});

// Fetch event: respond with cache first, fallback to network, offline page
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => cachedResponse || fetch(event.request))
    );
  }
});
