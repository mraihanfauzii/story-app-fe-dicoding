import '../sass/main.scss';

import './components/nav-bar';
import './components/footer-bar';
import './components/story-card';
import './components/modal-loading';

import App from './pages/app';

const app = new App({
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});