import StorageHelper from '../../utils/storage-helper';

class LoginPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  init() {
    this._view.bindLogin(this._onLogin.bind(this));
  }

  async _onLogin() {
    const email = this._view.getEmail();
    const password = this._view.getPassword();
    const loading = document.querySelector('modal-loading');

    if (loading) loading.show();

    try {
      // Panggil API Login via Model
      const result = await this._model.login({ email, password });
      
      // Simpan Session
      StorageHelper.setToken(result.token);
      StorageHelper.saveName(result.name);

      // Redirect ke Dashboard
      window.location.hash = '#/';
    } catch (error) {
      alert(error.message);
    } finally {
      if (loading) loading.hide();
    }
  }
}

export default LoginPresenter;