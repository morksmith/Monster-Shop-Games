const cacheName = "Monster Shop Games-Undercrawl 2-0.0.4";
const contentToCache = [
    "Build/Undercrawl 2 WebGL 0.0.4.loader.js",
    "Build/Undercrawl 2 WebGL 0.0.4.framework.js.gz",
    "Build/Undercrawl 2 WebGL 0.0.4.data.gz",
    "Build/Undercrawl 2 WebGL 0.0.4.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
