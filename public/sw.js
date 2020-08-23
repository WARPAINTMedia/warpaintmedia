const CACHE_NAME = 'PWA-v1';
const expectedCaches = [CACHE_NAME];

// the list of files that need to be cached
const staticFiles = [
  './',
  './css/style.min.css',
  './js/script.min.js',
  './manifest.json',
  './favicon.ico',
  './favicons/favicon-16x16.png',
  './favicons/favicon-32x32.png',
  './favicons/favicon-96x96.png',
  './favicons/android-icon-192x192.png',
  './img/bg.jpg',
  './img/lets-get-creative.png',
  './img/lets-get-creative-2x.png',
  './img/lets-get-creative-3x.png'
];

/**
 * Performs install steps.
 */
addEventListener('install', (event) => {
  // install this service worker as soon as a new one is available
  skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(staticFiles)));
});

/**
 * Handles requests: responds with cache or else network.
 */
addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request)));
});

/**
 * Cleans up static cache and activates the Service Worker.
 */
addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map((key) => {
    if (!expectedCaches.includes(key)) {
      return caches.delete(key);
    }
  }))).then(() => {
    console.log(`${CACHE_NAME} now ready to handle fetches!`);
    return clients.claim();
  }));
});
