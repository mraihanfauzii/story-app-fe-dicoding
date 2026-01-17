import MapHelper from '../../../scripts/utils/map-helper';

class DashboardView {
  getTemplate() {
    return `
      <div class="content-container">
        <h2 class="content-title">Daftar Cerita</h2>
        
        <div class="filter-container">
          <input 
            type="text" 
            id="searchStory" 
            placeholder="Cari cerita berdasarkan nama..." 
            aria-label="Cari cerita"
          >
        </div>

        <div id="map-container" class="map-view"></div>

        <div id="stories-list" class="stories-grid"></div>
      </div>
    `;
  }

  // Menampilkan list cerita ke DOM
  showStories(stories) {
    const storiesContainer = document.querySelector('#stories-list');
    storiesContainer.innerHTML = '';

    if (stories.length === 0) {
      storiesContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Tidak ada cerita yang ditemukan.</p>';
      return;
    }

    stories.forEach((story) => {
      const storyElement = document.createElement('story-card');
      storyElement.story = story;
      storiesContainer.appendChild(storyElement);
    });
  }

  // Menampilkan peta dan marker
  showMap(stories) {
    // Inisialisasi map
    MapHelper.init('map-container', [-2.5489, 118.0149], 5);
    MapHelper.clearMarkers();

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        MapHelper.addMarker(
          [story.lat, story.lon], 
          {
            description: story.name, 
            url: `#/stories/${story.id}`
          }
        );
      }
    });
  }

  // Mengikat event listener search (agar Presenter tau kapan harus filter)
  bindSearch(handler) {
    const searchInput = document.getElementById('searchStory');
    searchInput.addEventListener('input', (event) => {
      handler(event.target.value);
    });
  }
}

export default DashboardView;