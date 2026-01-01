import '../styles/styles.css';
import '../sass/main.scss';

import './components/nav-bar';
import './components/footer-bar';
import './components/story-card';
import './components/modal-loading';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    header: document.querySelector('#header-content'),
    footer: document.querySelector('#footer-content'),
  });
  
  app.renderPage();

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });
});
