import '../sass/main.scss';

import './components/nav-bar';
import './components/footer-bar';
import './components/story-card';
import './components/modal-loading';

import SyncHelper from './utils/sync-helper';

import App from './pages/app';

const app = new App({
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  
  // REGISTRASI SERVICE WORKER (PWA)
  if ('serviceWorker' in navigator) {
    try {
      const { Workbox } = await import('workbox-window');
      const wb = new Workbox('/sw.js');
      wb.register();
      console.log('Service Worker registered');
    } catch (error) {
      console.log('Service Worker registration failed: ', error);
    }
  }

  if (navigator.onLine) {
    await SyncHelper.syncData();
  }
});

window.addEventListener('online', async () => {
  console.log('Internet back online. Syncing data...');
  await SyncHelper.syncData();
});