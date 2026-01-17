import CameraHelper from '../../utils/camera-helper';
import StorageHelper from '../../utils/storage-helper';

class AddStoryPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    
    // State Internal
    this._currentStream = null;
    this._currentFile = null;
    this._locationData = { lat: null, lon: null };
    this._isCameraActive = false;
  }

  init() {
    // 1. Cek Login
    const token = StorageHelper.getToken();
    if (!token) {
      alert('Anda harus login terlebih dahulu.');
      window.location.hash = '#/login';
      return;
    }

    // 2. Setup Map
    this._view.initMapPicker((location) => {
      this._locationData = location;
    });

    // 3. Setup Events
    this._bindCameraEvents();
    this._bindFileEvents();
    this._bindSubmitEvent();
  }

  _bindCameraEvents() {
    const btnStart = document.getElementById('btnStartCamera');
    const btnCapture = document.getElementById('btnCapture');
    const video = this._view.getVideoElement();
    const canvas = this._view.getCanvasElement();

    btnStart.addEventListener('click', async () => {
      if (this._isCameraActive) {
        this._stopCamera();
        return;
      }
      try {
        this._currentStream = await CameraHelper.initCamera(video);
        this._isCameraActive = true;
        this._view.showCamera();
      } catch (error) {
        alert(error.message);
      }
    });

    btnCapture.addEventListener('click', async () => {
      const blob = await CameraHelper.takePicture(video, canvas);
      this._currentFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      
      const url = URL.createObjectURL(this._currentFile);
      this._view.showPreview(url);
      this._stopCamera();
    });
  }

  _bindFileEvents() {
    const fileInput = this._view.getFileInputElement();
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        this._currentFile = file;
        if (this._isCameraActive) this._stopCamera();
        
        const url = URL.createObjectURL(file);
        this._view.showPreview(url);
      }
    });
  }

  _bindSubmitEvent() {
    const form = this._view.getFormElement();
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!this._currentFile) {
        alert('Mohon masukkan gambar.');
        return;
      }

      const description = this._view.getDescriptionElement().value;
      const loading = document.querySelector('modal-loading');
      if (loading) loading.show();

      try {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('photo', this._currentFile);
        
        if (this._locationData.lat) {
          formData.append('lat', this._locationData.lat);
          formData.append('lon', this._locationData.lon);
        }

        await this._model.addStory(formData);
        alert('Cerita berhasil diupload!');
        window.location.hash = '#/';
      } catch (error) {
        alert(error.message);
      } finally {
        if (loading) loading.hide();
      }
    });
  }

  _stopCamera() {
    if (this._currentStream) {
      CameraHelper.stopCamera(this._currentStream);
      this._currentStream = null;
    }
    this._isCameraActive = false;
    
    // Kembalikan UI ke mode preview (gunakan placeholder jika file kosong)
    const url = this._currentFile 
      ? URL.createObjectURL(this._currentFile)
      : 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
    
    this._view.showPreview(url);
  }

  cleanup() {
    this._stopCamera();
  }
}

export default AddStoryPresenter;