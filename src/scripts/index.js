import '../styles/styles.css';
import App from './pages/app';
import '../sass/main.scss';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('App Initialized');
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
