const CACHE_NAME = 'bar-app-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  // We must cache the Quagga barcode library so it works offline
  'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js'
];

// Install Event: Caches the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('BAR Brain: Caching files...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serves files from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
