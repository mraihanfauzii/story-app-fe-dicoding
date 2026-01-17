import StorageHelper from '../../utils/storage-helper';

class DashboardPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    
    this._stories = []; // State internal untuk menyimpan data mentah dari API
  }

  async init() {
    // Cek Login
    const token = StorageHelper.getToken();
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    const loading = document.querySelector('modal-loading');
    if (loading) loading.show();

    try {
      // 1. Minta data ke Model (Stories.getAll)
      this._stories = await this._model.getAll();
      
      // 2. Suruh View menampilkan data awal
      this._view.showStories(this._stories);
      this._view.showMap(this._stories);
      
      // 3. Pasang logika pencarian
      // Kita bind 'this' agar tetap merujuk ke class Presenter
      this._view.bindSearch(this._onSearch.bind(this));

    } catch (error) {
      console.error(error);
      alert(`Gagal memuat data: ${error.message}`);
    } finally {
      if (loading) loading.hide();
    }
  }

  _onSearch(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    // Logic Filtering Data
    const filteredStories = this._stories.filter((story) => 
      story.name.toLowerCase().includes(lowerKeyword)
    );

    // Update Tampilan via View
    this._view.showStories(filteredStories);
    this._view.showMap(filteredStories);
  }
}

export default DashboardPresenter;