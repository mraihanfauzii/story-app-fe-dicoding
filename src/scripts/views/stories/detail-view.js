import MapHelper from '../../../scripts/utils/map-helper';
import { showFormattedDate } from '../../../scripts/utils/date-helper';

class DetailView {
  getTemplate() {
    return `
      <div class="content-container">
        <a href="#/" class="btn-back">← Kembali ke Dashboard</a>
        <div id="story-detail" class="detail-container"></div>
      </div>
    `;
  }

  showDetail(story) {
    const container = document.querySelector('#story-detail');
    
    // 1. Render HTML
    container.innerHTML = `
      <div class="detail-header">
        <h1 class="detail-name">${story.name}</h1>
        <p class="detail-date">${showFormattedDate(story.createdAt)}</p>
      </div>
      
      <div class="detail-image-wrapper">
        <img src="${story.photoUrl}" alt="Foto ${story.name}" class="detail-image">
      </div>
      
      <div id="likeButtonContainer" class="like-btn-container"></div>
      <div class="detail-body">
        <h2>Deskripsi</h2>
        <p>${story.description}</p>
      </div>

      <div class="detail-map">
        <h2>Lokasi Pengambilan</h2>
        <div id="map-detail" style="height: 300px; width: 100%; border-radius: 8px;"></div>
      </div>
    `;

    // 2. Render Map (Jika ada koordinat)
    if (story.lat && story.lon) {
      MapHelper.init('map-detail', [story.lat, story.lon], 13);
      
      MapHelper.addMarker(
        [story.lat, story.lon], 
        {
          description: `Lokasi story <b>${story.name}</b>`,
          url: null
        }
      );
    } else {
      document.querySelector('.detail-map').innerHTML = '<p>Lokasi tidak tersedia untuk cerita ini.</p>';
    }
  }

  getLikeButtonTemplate() {
    return `
      <button aria-label="Simpan Cerita" id="likeButton" class="btn btn-outline">
         🤍 Simpan Cerita (Tersedia Offline)
      </button>
    `;
  }

  getLikedButtonTemplate() {
    return `
      <button aria-label="Hapus Simpanan" id="likedButton" class="btn btn-primary">
         ❤️ Disimpan (Hapus)
      </button>
    `;
  }

  showError(message) {
    const container = document.querySelector('#story-detail');
    container.innerHTML = `<p class="error-msg">${message}</p>`;
  }
}

export default DetailView;