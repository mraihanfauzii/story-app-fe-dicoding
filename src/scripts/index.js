import '../sass/main.scss';

import './components/nav-bar';
import './components/footer-bar';
import './components/story-card';
import './components/modal-loading';

import SyncHelper from './utils/sync-helper';
import NotificationHelper from './utils/notification-helper';

import App from './pages/app'; 

const app = new App({
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  
  // 1. SW Register
  if ('serviceWorker' in navigator) {
    try {
      const { Workbox } = await import('workbox-window');
      const wb = new Workbox('./sw.js', { type: 'module' });
      
      await wb.register(); 
      console.log('SW Registered');
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }

  // 2. Sync Offline Data
  if (navigator.onLine) {
    await SyncHelper.syncData();
  }

  // 3. Init Notification (PERBAIKAN DI SINI)
  await customElements.whenDefined('footer-bar');

  // Interval untuk memastikan elemen tombol benar-benar sudah ada di DOM
  const initNotification = setInterval(async () => {
    const footerBar = document.querySelector('footer-bar');
    if (footerBar) {
      // Karena tidak pakai Shadow DOM, kita bisa query langsung
      const subscribeBtn = footerBar.querySelector('#subscribeBtn');
      const unsubscribeBtn = footerBar.querySelector('#unsubscribeBtn');

      if (subscribeBtn && unsubscribeBtn) {
        clearInterval(initNotification); // Hentikan pengecekan jika tombol ketemu
        
        console.log('Tombol notifikasi ditemukan, menginisialisasi...');
        await NotificationHelper.init({
          subscribeButton: subscribeBtn,
          unsubscribeButton: unsubscribeBtn,
        });
      }
    }
  }, 500); // Cek setiap 0.5 detik

  // Safety break: Hentikan pengecekan setelah 10 detik jika gagal terus
  setTimeout(() => clearInterval(initNotification), 10000);
});

window.addEventListener('online', async () => {
  console.log('Online. Syncing...');
  await SyncHelper.syncData();
});