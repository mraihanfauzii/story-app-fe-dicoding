import StorageHelper from '../utils/storage-helper';

class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    // Bersihkan konten lama
    this.innerHTML = '';

    const isLoggedIn = StorageHelper.getToken();

    // LOGIC MENU DINAMIS
    let navigationLinks;

    if (isLoggedIn) {
      // TAMPILAN JIKA SUDAH LOGIN
      navigationLinks = `
        <li class="nav-item"><a href="#/" class="nav-link">Dashboard</a></li>
        <li class="nav-item"><a href="#/add" class="nav-link">Tambah Cerita</a></li>
        <li class="nav-item"><a href="#" id="logout-btn" class="nav-link btn-logout">Logout</a></li>
      `;
    } else {
      // TAMPILAN JIKA BELUM LOGIN (GUEST)
      navigationLinks = `
        <li class="nav-item"><a href="#/login" class="nav-link">Login</a></li>
        <li class="nav-item"><a href="#/register" class="nav-link">Register</a></li>
      `;
    }

    this.innerHTML = `
      <nav class="navbar">
        <div class="container navbar-container">
          <a href="#/" class="navbar-brand">Dicoding Story</a>
          
          <button id="hamburger" class="navbar-toggler" aria-label="Buka menu navigasi">
            ☰
          </button>

          <div id=\"drawer\" class="navbar-menu">
            <ul class="nav-list">
              ${navigationLinks}
            </ul>
          </div>
        </div>
      </nav>
    `;

    // Event Listener Logout (Hanya dipasang jika tombolnya ada)
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