import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content, header, footer }) {
    this._content = content;
    this._header = header;
    this._footer = footer;

    this._initialAppShell();
  }

  _initialAppShell() {}

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (!page) {
      this._content.innerHTML = '<h2>Halaman tidak ditemukan</h2>';
      return;
    }

    this._content.innerHTML = await page.render();
    
    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      const hamburgerButton = navBar.querySelector('#hamburger');
      const drawerMenu = navBar.querySelector('#drawer');
      
      if (hamburgerButton && drawerMenu) {
        DrawerInitiator.init({
          button: hamburgerButton,
          drawer: drawerMenu,
          content: this._content,
        });
      }
    }

    await page.afterRender();
  }
}

export default App;
