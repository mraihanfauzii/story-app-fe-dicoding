import API_ENDPOINT from '../config/api-endpoint';

class Auth {
  static async register({ name, email, password }) {
    try {
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(error.message || 'Gagal melakukan registrasi');
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(API_ENDPOINT.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.loginResult;
    } catch (error) {
      throw new Error(error.message || 'Gagal melakukan login');
    }
  }
}

export default Auth;