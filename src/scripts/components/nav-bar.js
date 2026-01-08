import StorageHelper from '../utils/storage-helper';

class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';

    const isLoggedIn = StorageHelper.getToken();

    const authLink = isLoggedIn 
      ? `<li class="nav-item"><a href="#" id="logout-btn" class="nav-link btn-logout">Logout</a></li>`
      : `<li class="nav-item"><a href="#/login" class="nav-link">Login</a></li>`;

    // Menu Tambah Cerita hanya muncul jika login
    const addStoryLink = isLoggedIn
      ? `<li class="nav-item"><a href="#/add" class="nav-link">Tambah Cerita</a></li>`
      : ``;

    this.innerHTML = `
      <nav class="navbar">
        <div class="container navbar-container">
          <a href="#/" class="navbar-brand">Dicoding Story</a>
          <button id="hamburger" class="navbar-toggler">☰</button>
          <div id="drawer" class="navbar-menu">
            <ul class="nav-list">
              <li class="nav-item"><a href="#/" class="nav-link">Dashboard</a></li>
              ${addStoryLink}
              ${authLink}
            </ul>
          </div>
        </div>
      </nav>
    `;

    if (isLoggedIn) {
      const logoutBtn = this.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          StorageHelper.removeToken();
          StorageHelper.saveName('');
          window.location.hash = '#/login';
          location.reload();
        });
      }
    }
  }
}

customElements.define('nav-bar', NavBar);