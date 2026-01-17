class RegisterView {
  getTemplate() {
    return `
      <div class="auth-container">
        <h1 class="auth-title">Daftar Akun Baru</h1>
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
  }

  bindRegister(handler) {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(event);
    });
  }

  // Getters
  getName() { return document.getElementById('name').value; }
  getEmail() { return document.getElementById('email').value; }
  getPassword() { return document.getElementById('password').value; }
}

export default RegisterView;