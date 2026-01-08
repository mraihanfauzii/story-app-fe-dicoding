import Stories from '../../network/stories';
import UrlParser from '../../routes/url-parser';
import MapHelper from '../../utils/map-helper';
import { showFormattedDate } from '../../utils/date-helper';

const DetailStory = {
  async render() {
    return `
      <div class="content-container">
        <a href="#/" class="btn-back">← Kembali ke Dashboard</a>
        
        <div id="story-detail" class="detail-container">
           </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log("Mengambil ID Story:", url.id);
    const loading = document.querySelector('modal-loading');
    const container = document.querySelector('#story-detail');

    if (loading) loading.show();

    try {
      // Ambil ID dari URL dan fetch data
      const story = await Stories.getDetail(url.id);
      
      // Render HTML Detail
      container.innerHTML = `
        <div class="detail-header">
          <h1 class="detail-name">${story.name}</h1>
          <p class="detail-date">${showFormattedDate(story.createdAt)}</p>
        </div>
        
        <div class="detail-image-wrapper">
          <img src="${story.photoUrl}" alt="Foto ${story.name}" class="detail-image">
        </div>
        
        <div class="detail-body">
          <h3>Deskripsi</h3>
          <p>${story.description}</p>
        </div>

        <div class="detail-map">
          <h3>Lokasi Pengambilan</h3>
          <div id="map-detail" style="height: 300px; width: 100%; border-radius: 8px;"></div>
        </div>
      `;

      // Render Map jika ada koordinat
      if (story.lat && story.lon) {
        const map = MapHelper.init('map-detail', [story.lat, story.lon], 13);
        MapHelper.addMarker(map, {
          lat: story.lat,
          lon: story.lon,
          description: `Lokasi story <b>${story.name}</b>`
        });
      } else {
        document.querySelector('.detail-map').innerHTML = '<p>Lokasi tidak tersedia untuk cerita ini.</p>';
      }

    } catch (error) {
      console.error(error);
      container.innerHTML = `<p class="error-msg">Gagal memuat detail story: ${error.message}</p>`;
    } finally {
      if (loading) loading.hide();
    }
  }
};

export default DetailStory;