import Stories from '../../network/stories'; // Model
import DashboardView from '../../views/stories/dashboard-view'; // View
import DashboardPresenter from '../../presenters/stories/dashboard-presenter'; // Presenter

const Dashboard = {
  async render() {
    this._view = new DashboardView();
    return this._view.getTemplate();
  },

  async afterRender() {
    // Inisialisasi Presenter dengan Dependency Injection
    this._presenter = new DashboardPresenter({
      view: this._view,
      model: Stories,
    });

    // Jalankan logika presenter
    await this._presenter.init();
  }
};

export default Dashboard;