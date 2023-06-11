const CACHE_NAME = 'V1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
    console.log(`Request of ${event.request.url}`, event.request.cache);

    if (event.request.cache === 'no-cache' || event.request.cache === 'no-store') {
        event.respondWith(fetch(event.request).catch(() => ({})));

        return;
    }

    // Cache-Update Strategy
    event.respondWith(
        caches
            .match(event.request)
            .then((cached) => cached || fetch(event.request).catch(() => ({})))
            .then((response) => cache(event.request, response).then(() => response)),
    );
    event.waitUntil(update(event.request));
});

async function cache(request, response) {
    if (response.type === 'error' || response.type === 'opaque') {
        return Promise.resolve();
    }

    return caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
}

async function update(request) {
    return fetch(request.url).then((response) => cache(request, response).then(() => response));
}
