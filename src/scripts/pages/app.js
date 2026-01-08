import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {}

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      navBar.render(); 
    }

    if (!page) {
      this._content.innerHTML = '<h2>Halaman tidak ditemukan</h2>';
      return;
    }

    this._content.innerHTML = await page.render();
    
    this._initDrawer();

    await page.afterRender();
  }

  _initDrawer() {
    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      const hamburgerButton = document.querySelector('#hamburger');
      const drawerMenu = document.querySelector('#drawer');
      
      if (hamburgerButton && drawerMenu) {
        DrawerInitiator.init({
          button: hamburgerButton,
          drawer: drawerMenu,
          content: this._content,
        });
      }
    }
  }
}

export default App;
