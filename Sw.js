// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('barscan-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});