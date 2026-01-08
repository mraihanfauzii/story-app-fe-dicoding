import Stories from '../../network/stories';
import MapHelper from '../../utils/map-helper';
import CameraHelper from '../../utils/camera-helper';

const AddStory = {
  async render() {
    return `
      <div class="content-container">
        <h2 class="content-title">Tambah Cerita Baru</h2>
        
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
            
            <input type="file" id="fileInput" accept="image/*" class="file-input">
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
  },

  async afterRender() {
    let currentStream = null;
    let currentFile = null;
    let locationData = { lat: null, lon: null };
    let isCameraActive = false;

    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const imagePreview = document.getElementById('imagePreview');
    const btnStartCamera = document.getElementById('btnStartCamera');
    const btnCapture = document.getElementById('btnCapture');
    const fileInput = document.getElementById('fileInput');
    const loading = document.querySelector('modal-loading');

    // Logic Peta Picker
    const map = MapHelper.init('map-picker', [-2.5, 118], 4);
    let marker = null;

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      locationData = { lat, lon: lng };
      
      // Update/Buat Marker
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
      
      document.getElementById('location-status').innerText = `Lat: ${lat.toFixed(4)}, Lon: ${lng.toFixed(4)}`;
    });

    // Logic Kamera
    btnStartCamera.addEventListener('click', async () => {
      if (isCameraActive) {
        // Jika sedang aktif, tombol berfungsi sebagai "Tutup Kamera"
        CameraHelper.stopCamera(currentStream);
        video.classList.add('d-none');
        imagePreview.classList.remove('d-none');
        btnCapture.classList.add('d-none');
        btnStartCamera.innerText = 'Buka Kamera';
        isCameraActive = false;
        return;
      }

      try {
        currentStream = await CameraHelper.initCamera(video);
        video.classList.remove('d-none');
        imagePreview.classList.add('d-none');
        btnCapture.classList.remove('d-none');
        btnStartCamera.innerText = 'Tutup Kamera';
        isCameraActive = true;
      } catch (error) {
        alert(error.message);
      }
    });

    btnCapture.addEventListener('click', async () => {
      const blob = await CameraHelper.takePicture(video, canvas);
      currentFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      
      // Tampilkan hasil foto di preview
      imagePreview.src = URL.createObjectURL(currentFile);
      
      // Matikan kamera setelah foto diambil
      CameraHelper.stopCamera(currentStream);
      video.classList.add('d-none');
      imagePreview.classList.remove('d-none');
      btnCapture.classList.add('d-none');
      btnStartCamera.innerText = 'Buka Kamera';
      isCameraActive = false;
    });

    // File Input (Fallback)
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        currentFile = file;
        imagePreview.src = URL.createObjectURL(file);
      }
    });

    // Submit Form
    document.getElementById('addStoryForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const description = document.getElementById('description').value;

      if (!currentFile) {
        alert('Mohon masukkan gambar (via kamera atau upload file).');
        return;
      }

      if (loading) loading.show();

      try {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('photo', currentFile);
        
        if (locationData.lat && locationData.lon) {
          formData.append('lat', locationData.lat);
          formData.append('lon', locationData.lon);
        }

        await Stories.addStory(formData);
        
        alert('Cerita berhasil diupload!');
        window.location.hash = '#/';
      } catch (error) {
        alert(error.message);
      } finally {
        if (loading) loading.hide();
      }
    });
  },
};

export default AddStory;