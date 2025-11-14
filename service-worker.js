self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("NeuroEdge PWA Active");
});

self.addEventListener("fetch", () => {});
