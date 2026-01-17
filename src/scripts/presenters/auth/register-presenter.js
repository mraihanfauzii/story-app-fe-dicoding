class RegisterPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  init() {
    this._view.bindRegister(this._onRegister.bind(this));
  }

  async _onRegister() {
    const name = this._view.getName();
    const email = this._view.getEmail();
    const password = this._view.getPassword();
    const loading = document.querySelector('modal-loading');

    if (loading) loading.show();

    try {
      await this._model.register({ name, email, password });
      alert('Registrasi berhasil! Silakan login.');
      window.location.hash = '#/login';
    } catch (error) {
      alert(error.message);
    } finally {
      if (loading) loading.hide();
    }
  }
}

export default RegisterPresenter;