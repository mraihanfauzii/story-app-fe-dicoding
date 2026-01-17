import Auth from '../../network/auth'; // Model
import RegisterView from '../../views/auth/register-view'; // View
import RegisterPresenter from '../../presenters/auth/register-presenter'; // Presenter

const Register = {
  async render() {
    this._view = new RegisterView();
    return this._view.getTemplate();
  },

  async afterRender() {
    this._presenter = new RegisterPresenter({
      view: this._view,
      model: Auth,
    });

    this._presenter.init();
  },
};

export default Register;