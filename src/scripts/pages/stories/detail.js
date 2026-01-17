import Stories from '../../network/stories'; // Model
import UrlParser from '../../routes/url-parser';
import DetailView from '../../views/stories/detail-view'; // View
import DetailPresenter from '../../presenters/stories/detail-presenter'; // Presenter

const DetailStory = {
  async render() {
    this._view = new DetailView();
    return this._view.getTemplate();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    
    // Inisialisasi Presenter
    this._presenter = new DetailPresenter({
      view: this._view,
      model: Stories,
    });

    // Jalankan logika
    await this._presenter.init(url.id);
  }
};

export default DetailStory;