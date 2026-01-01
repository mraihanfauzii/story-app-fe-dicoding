import Stories from '../../../network/stories';
import StorageHelper from '../../../utils/storage-helper';
import MapHelper from '../../../utils/map-helper';
import { showFormattedDate } from '../../../utils/date-helper';

const Dashboard = {
  async render() {
    return `
      <div class="content-container">
        <h2 class="content-title">Daftar Cerita</h2>
        
        <div id="map-container" class="map-view"></div>

        <div id="stories-list" class="stories-grid"></div>
      </div>
    `;
  },

  async afterRender() {
    const token = StorageHelper.getToken();
    if (!token) {
      window.location.hash = '#/auth/login';
      return;
    }

    const loading = document.querySelector('modal-loading');
    if(loading) loading.show();

    try {
      const stories = await Stories.getAll();
      const storiesContainer = document.querySelector('#stories-list');

      stories.forEach((story) => {
        const storyElement = document.createElement('story-card');
        storyElement.story = story;
        storiesContainer.appendChild(storyElement);
      });

      const map = MapHelper.init('map-container', [-2.5489, 118.0149], 5);
      
      stories.forEach((story) => {
        if (story.lat && story.lon) {
          MapHelper.addMarker(map, {
            lat: story.lat,
            lon: story.lon,
            description: `<b>${story.name}</b><br>${story.description}`
          });
        }
      });

    } catch (error) {
      console.error(error);
      alert(`Gagal memuat data: ${error.message}`);
    } finally {
      if(loading) loading.hide();
    }
  }
};

export default Dashboard;