import MapHelper from '../../../scripts/utils/map-helper';
import L from 'leaflet';

class AddStoryView {
  getTemplate() {
    return `
      <div class="content-container">
        <h1 class="content-title">Tambah Cerita Baru</h1>
        
        <form id="addStoryForm" class="story-form">
          <div class="image-preview-container">
            <img id="imagePreview" src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=" alt="Preview">
            <video id="cameraVideo" autoplay playsinline class="d-none"></video>
            <canvas id="cameraCanvas" class="d-none"></canvas>
          </div>

          <div class="camera-controls">
            <button type="button" id="btnStartCamera" class="btn btn-primary">Buka Kamera</button>
            <button type="button" id="btnCapture" class="btn btn-accent d-none">Ambil Foto</button>
            
            <span class="divider">ATAU</span>
            
            <div class="file-input-wrapper">
              <label for="fileInput" class="file-label">Pilih dari Galeri</label>
              <input type="file" id="fileInput" accept="image/*" class="file-input">
            </div>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea id="description" name="description" class="form-control" rows="4" required placeholder="Ceritakan pengalamanmu..."></textarea>
          </div>

          <div class="form-group">
            <label>Lokasi (Klik pada peta)</label>
            <div id="map-picker" style="height: 300px; width: 100%; margin-top: 10px;"></div>
            <p id="location-status" class="small-text">Lokasi belum dipilih.</p>
          </div>

          <button type="submit" class="btn btn-primary btn-full">Upload Cerita</button>
        </form>
      </div>
    `;
  }

  // --- Methods untuk Logika Tampilan ---

  initMapPicker(onLocationSelected) {
    const map = MapHelper.init('map-picker', [-2.5, 118], 4);
    let marker = null;

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      
      // Update Marker Visual
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
      
      document.getElementById('location-status').innerText = `Lat: ${lat.toFixed(4)}, Lon: ${lng.toFixed(4)}`;

      // Kirim koordinat kembali ke Presenter
      onLocationSelected({ lat, lon: lng });
    });
  }

  showCamera() {
    document.getElementById('cameraVideo').classList.remove('d-none');
    document.getElementById('imagePreview').classList.add('d-none');
    document.getElementById('btnCapture').classList.remove('d-none');
    document.getElementById('btnStartCamera').innerText = 'Tutup Kamera';
  }

  showPreview(imageUrl) {
    const imgPreview = document.getElementById('imagePreview');
    imgPreview.src = imageUrl;
    imgPreview.classList.remove('d-none');

    document.getElementById('cameraVideo').classList.add('d-none');
    document.getElementById('btnCapture').classList.add('d-none');
    document.getElementById('btnStartCamera').innerText = 'Buka Kamera';
  }

  // Getter Element untuk Presenter
  getVideoElement() { return document.getElementById('cameraVideo'); }
  getCanvasElement() { return document.getElementById('cameraCanvas'); }
  getFileInputElement() { return document.getElementById('fileInput'); }
  getFormElement() { return document.getElementById('addStoryForm'); }
  getDescriptionElement() { return document.getElementById('description'); }
}

export default AddStoryView;