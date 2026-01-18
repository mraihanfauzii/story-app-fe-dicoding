import FavoriteIdb from '../../utils/favorite-idb';

class DetailPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._story = null;
  }

  async init(id) {
    const loading = document.querySelector('modal-loading');
    if (loading) loading.show();

    try {
      // 1. Ambil data dari API
      this._story = await this._model.getDetail(id);
      
      // 2. Tampilkan Detail
      this._view.showDetail(this._story);

      // 3. Cek Status Favorit & Render Tombol (Create/Delete)
      await this._renderLikeButton();

    } catch (error) {
      console.error(error);
      this._view.showError(`Gagal memuat detail story: ${error.message}`);
    } finally {
      if (loading) loading.hide();
    }
  }

  async _renderLikeButton() {
    const { id } = this._story;
    const buttonContainer = document.querySelector('#likeButtonContainer');

    // Cek di IndexedDB apakah id ini sudah ada
    if (await this._isStoryExist(id)) {
      this._renderLiked(buttonContainer);
    } else {
      this._renderLike(buttonContainer);
    }
  }

  async _isStoryExist(id) {
    const story = await FavoriteIdb.getStory(id);
    return !!story;
  }

  _renderLike(container) {
    container.innerHTML = this._view.getLikeButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    
    likeButton.addEventListener('click', async () => {
      // PROSES CREATE KE INDEXEDDB
      await FavoriteIdb.putStory(this._story);
      await this._renderLikeButton(); // Render ulang tombol
      alert('Cerita berhasil disimpan untuk dibaca offline!');
    });
  }

  _renderLiked(container) {
    container.innerHTML = this._view.getLikedButtonTemplate();
    const likedButton = document.querySelector('#likedButton');
    
    likedButton.addEventListener('click', async () => {
      // PROSES DELETE DARI INDEXEDDB
      await FavoriteIdb.deleteStory(this._story.id);
      await this._renderLikeButton(); // Render ulang tombol
      alert('Cerita dihapus dari daftar tersimpan.');
    });
  }
}

export default DetailPresenter;