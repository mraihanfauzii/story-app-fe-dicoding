import FavoriteIdb from '../../utils/favorite-idb'; // Model (IDB)
import FavoriteView from '../../views/stories/favorite-view'; // View
import FavoritePresenter from '../../presenters/stories/favorite-presenter'; // Presenter

const Favorite = {
  async render() {
    this._view = new FavoriteView();
    return this._view.getTemplate();
  },

  async afterRender() {
    // Inisialisasi Presenter
    // Modelnya diisi FavoriteIdb
    this._presenter = new FavoritePresenter({
      view: this._view,
      favoriteIdb: FavoriteIdb,
    });

    await this._presenter.init();
  }
};

export default Favorite;