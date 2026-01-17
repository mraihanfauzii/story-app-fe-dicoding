import Auth from '../../network/auth'; // Model
import LoginView from '../../views/auth/login-view'; // View
import LoginPresenter from '../../presenters/auth/login-presenter'; // Presenter

const Login = {
  async render() {
    this._view = new LoginView();
    return this._view.getTemplate();
  },

  async afterRender() {
    this._presenter = new LoginPresenter({
      view: this._view,
      model: Auth,
    });

    this._presenter.init();
  },
};

export default Login;