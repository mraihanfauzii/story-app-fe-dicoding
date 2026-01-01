class FooterBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="footer-content">
        <p>&copy; ${new Date().getFullYear()} Story App. Dibuat untuk Submission Dicoding.</p>
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);