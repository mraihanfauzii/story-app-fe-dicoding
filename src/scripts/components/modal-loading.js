class ModalLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loading-overlay d-none" id="loadingOverlay">
        <div class="spinner"></div>
        <p>Memuat data...</p>
      </div>
    `;
  }

  show() {
    this.querySelector('#loadingOverlay').classList.remove('d-none');
  }

  hide() {
    this.querySelector('#loadingOverlay').classList.add('d-none');
  }
}

customElements.define('modal-loading', ModalLoading);