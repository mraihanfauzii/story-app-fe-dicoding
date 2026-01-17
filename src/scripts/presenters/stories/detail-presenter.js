class DetailPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async init(id) {
    const loading = document.querySelector('modal-loading');
    if (loading) loading.show();

    try {
      // Ambil data dari Model
      const story = await this._model.getDetail(id);
      // Tampilkan via View
      this._view.showDetail(story);
    } catch (error) {
      console.error(error);
      this._view.showError(`Gagal memuat detail story: ${error.message}`);
    } finally {
      if (loading) loading.hide();
    }
  }
}

export default DetailPresenter;