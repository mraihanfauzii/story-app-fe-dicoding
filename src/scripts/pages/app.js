import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    // Cegah default navigation hash saat skip link diklik
    const skipLinkElem = document.querySelector('.skip-link');
    if (skipLinkElem) {
      skipLinkElem.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah browser ubah URL jadi /#main-content
        const mainContent = document.querySelector('#main-content');
        if (mainContent) {
          mainContent.focus(); // Langsung fokus ke konten
          mainContent.scrollIntoView({ behavior: 'smooth' }); // scroll halus
        }
      });
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Update Navbar (Login/Logout state)
    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      navBar.render(); 
    }

    // Cek Halaman 404
    if (!page) {
      this._content.innerHTML = '<h2>Halaman tidak ditemukan</h2>';
      return;
    }

    if (!document.startViewTransition) {
      // Jika tidak mendukung : Langsung render seperti biasa
      await this._updateContent(page);
    } else {
      // Jika mendukung : Bungkus proses render dengan animasi
      document.startViewTransition(async () => {
        await this._updateContent(page);
      });
    }
  }

  async _updateContent(page) {
    this._content.innerHTML = await page.render();
    this._initDrawer();
    await page.afterRender();

    const mainContent = document.querySelector('#main-content');
    if (mainContent) {
      mainContent.focus();
    }
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
