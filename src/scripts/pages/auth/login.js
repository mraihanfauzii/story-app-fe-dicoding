import Auth from '../../network/auth';
import StorageHelper from '../../utils/storage-helper';

const Login = {
  async render() {
    return `
      <div class="auth-container">
        <h2 class="auth-title">Masuk ke Dicoding Story</h2>
        <form id="loginForm" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control" required placeholder="email@example.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control" minlength="8" required placeholder="********">
          </div>
          <button type="submit" class="btn btn-primary btn-full">Login</button>
        </form>
        <p class="auth-footer">
          Belum punya akun? <a href="#/register">Daftar di sini</a>
        </p>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('loginForm');
    const loading = document.querySelector('modal-loading');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (loading) loading.show();

      try {
        const result = await Auth.login({ email, password });
        
        StorageHelper.setToken(result.token);
        StorageHelper.saveName(result.name);

        window.location.hash = '#/';
      } catch (error) {
        alert(error.message);
      } finally {
        if (loading) loading.hide();
      }
    });
  },
};

export default Login;