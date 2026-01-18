import StorageHelper from '../../utils/storage-helper';

class FavoritePresenter {
  constructor({ view, favoriteIdb }) {
    this._view = view;
    this._favoriteIdb = favoriteIdb;
  }

  async init() {
    // LOGIC CEK LOGIN (Sama seperti AddStory)
    const token = StorageHelper.getToken();
    if (!token) {
      alert('Anda harus login terlebih dahulu untuk melihat daftar favorit.');
      window.location.hash = '#/login';
      return;
    }

    const loading = document.querySelector('modal-loading');
    if (loading) loading.show();

    try {
      // READ: Ambil semua data dari IndexedDB
      const stories = await this._favoriteIdb.getAllStories();
      
      // Tampilkan ke View
      this._view.showFavoriteStories(stories);
    } catch (error) {
      console.error(error);
      alert('Gagal memuat cerita favorit.');
    } finally {
      if (loading) loading.hide();
    }
  }
}

export default FavoritePresenter;