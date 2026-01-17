import Stories from '../../network/stories'; // Model
import AddStoryView from '../../views/stories/add-story-view'; // View
import AddStoryPresenter from '../../presenters/stories/add-story-presenter'; // Presenter

const AddStory = {
  _presenter: null,

  async render() {
    this._view = new AddStoryView();
    return this._view.getTemplate();
  },

  async afterRender() {
    this._presenter = new AddStoryPresenter({
      view: this._view,
      model: Stories,
    });

    this._presenter.init();
  },

  // Method ini akan dipanggil oleh App.js saat pindah halaman
  async unmount() {
    if (this._presenter) {
      this._presenter.cleanup();
    }
  }
};

export default AddStory;