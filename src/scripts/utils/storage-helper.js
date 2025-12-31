import CONFIG from '../config/config';

const StorageHelper = {
  setToken(token) {
    localStorage.setItem(CONFIG.USER_TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(CONFIG.USER_TOKEN);
  },

  removeToken() {
    localStorage.removeItem(CONFIG.USER_TOKEN);
  },
  
  saveName(name) {
    localStorage.setItem('user_name', name);
  },

  getName() {
    return localStorage.getItem('user_name');
  }
};

export default StorageHelper;