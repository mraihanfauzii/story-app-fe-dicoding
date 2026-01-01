import StorageHelper from '../utils/storage-helper';

class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Cek status login
    const isLoggedIn = StorageHelper.getToken();

    // Menu dinamis berdasarkan status login
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
          
          <button id="hamburger" class="navbar-toggler" aria-label="Buka menu navigasi">
            ☰
          </button>

          <div id="drawer" class="navbar-menu">
            <ul class="nav-list">
              <li class="nav-item"><a href="#/" class="nav-link">Dashboard</a></li>
              ${addStoryLink}
              <li class="nav-item"><a href="#/about" class="nav-link">About</a></li>
              ${authLink}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);