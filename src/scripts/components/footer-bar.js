class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="footer-content">
        <p class="copyright">
          &copy; 2026 Story App. Dibuat untuk Submission Dicoding.
        </p>
        
        <div class="notification-controls">
          <button id="subscribeBtn" class="btn-notif d-none">
            🔔 Aktifkan Notifikasi
          </button>
          <button id="unsubscribeBtn" class="btn-notif d-none">
            🔕 Matikan Notifikasi
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);