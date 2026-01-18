import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 1. Precache App Shell (HTML, CSS, JS Bundles)
// Otomatis diisi oleh Vite saat build
precacheAndRoute(self.__WB_MANIFEST);

// 2. Caching Strategy untuk API Stories (Offline Dynamic Data)
// Gunakan StaleWhileRevalidate: Tampilkan cache dulu, lalu update background.
registerRoute(
  ({ url }) => url.href.startsWith('https://story-api.dicoding.dev/v1/stories'),
  new StaleWhileRevalidate({
    cacheName: 'stories-api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache respons sukses
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Batasi jumlah cerita yg dicache
        maxAgeSeconds: 60 * 60 * 24 * 7, // Cache selama 1 minggu
      }),
    ],
  })
);

// 3. Caching untuk Gambar (Stories Photos)
// Gunakan CacheFirst: Sekali load gambar, simpan terus. Hemat kuota.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
      }),
    ],
  })
);

// 4. Caching untuk Map Tiles (Leaflet/OpenStreetMap)
registerRoute(
  ({ url }) => url.href.includes('openstreetmap.org'),
  new CacheFirst({
    cacheName: 'map-tiles-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
        maxEntries: 1000,
      }),
    ],
  })
);

// 5. Setup Listener untuk Push Notification
self.addEventListener('push', (event) => {
  let data = { title: 'Dicoding Story', body: 'Ada cerita baru nih!' };
  
  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  const options = {
    body: data.body,
    icon: '/images/icon-192x192.png',
    badge: '/images/icon-192x192.png',
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

  // Navigasi ke halaman detail
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Jika tab sudah terbuka, fokuskan
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika belum, buka window baru
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});