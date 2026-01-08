import Auth from '../../network/auth';

const Register = {
  async render() {
    return `
      <div class="auth-container">
        <h2 class="auth-title">Daftar Akun Baru</h2>
        <form id="registerForm" class="auth-form">
          <div class="form-group">
            <label for="name">Nama Lengkap</label>
            <input type="text" id="name" name="name" class="form-control" required placeholder="Nama Anda">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control" required placeholder="email@example.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control" minlength="8" required placeholder="Minimal 8 karakter">
          </div>
          <button type="submit" class="btn btn-primary btn-full">Daftar Sekarang</button>
        </form>
        <p class="auth-footer">
          Sudah punya akun? <a href="#/login">Login di sini</a>
        </p>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.getElementById('registerForm');
    const loading = document.querySelector('modal-loading');

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (loading) loading.show();

      try {
        await Auth.register({ name, email, password });
        alert('Registrasi berhasil! Silakan login.');
        window.location.hash = '#/login';
      } catch (error) {
        alert(error.message);
      } finally {
        if (loading) loading.hide();
      }
    });
  },
};

export default Register;