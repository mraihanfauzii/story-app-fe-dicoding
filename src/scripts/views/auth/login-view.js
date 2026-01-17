class LoginView {
  getTemplate() {
    return `
      <div class="auth-container">
        <h1 class="auth-title">Masuk ke Dicoding Story</h1>
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
  }

  bindLogin(handler) {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(event);
    });
  }

  // Getter untuk mengambil value input
  getEmail() {
    return document.getElementById('email').value;
  }

  getPassword() {
    return document.getElementById('password').value;
  }
}

export default LoginView;