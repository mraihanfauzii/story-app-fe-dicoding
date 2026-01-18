import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 1. Bersihkan cache lama agar tidak menumpuk
cleanupOutdatedCaches();

// 2. Precache App Shell (Termasuk index.html)
precacheAndRoute(self.__WB_MANIFEST);

// 3. API Stories Caching (StaleWhileRevalidate)
registerRoute(
  ({ url }) => url.href.startsWith('https://story-api.dicoding.dev/v1/stories'),
  new StaleWhileRevalidate({
    cacheName: 'stories-api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 7, 
      }),
    ],
  })
);

// 4. Image Caching
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);

// 5. Map Tiles Caching
registerRoute(
  ({ url }) => url.href.includes('openstreetmap.org'),
  new CacheFirst({
    cacheName: 'map-tiles-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 1000,
      }),
    ],
  })
);

// 6. Push Notification Listener
self.addEventListener('push', (event) => {
  let data = { title: 'Dicoding Story', body: 'Ada cerita baru nih!' };
  
  if (event.data) {
    try {
      // 1. Coba ubah data menjadi JSON (Standar API Dicoding)
      data = JSON.parse(event.data.text());
    } catch (error) {
      // 2. JIKA ERROR (Misal Anda test manual ketik teks biasa di DevTools)
      // Maka kita paksa teks tersebut menjadi body notifikasi
      data = { 
        title: 'Dicoding Story', 
        body: event.data.text() 
      };
    }
  }

  const options = {
    body: data.body,
    icon: './images/icon-192x192.png',
    badge: './images/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '#/' // URL tujuan saat diklik
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});