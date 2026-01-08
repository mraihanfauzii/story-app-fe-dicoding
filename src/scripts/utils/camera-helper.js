const CameraHelper = {
  async initCamera(videoElement) {
    if (!('mediaDevices' in navigator)) {
      throw new Error('Kamera tidak didukung di browser ini.');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Prioritaskan kamera belakang
        audio: false,
      });
      videoElement.srcObject = stream;
      return stream;
    } catch (error) {
      throw new Error('Gagal membuka kamera. Pastikan izin diberikan.');
    }
  },

  // Mengambil gambar dari video stream
  takePicture(videoElement, canvasElement) {
    const context = canvasElement.getContext('2d');
    const { videoWidth, videoHeight } = videoElement;

    // Set ukuran canvas sama dengan video
    canvasElement.width = videoWidth;
    canvasElement.height = videoHeight;

    // Gambar frame video ke canvas
    context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

    // Kembalikan data Blob (file gambar)
    return new Promise((resolve) => {
      canvasElement.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8); // Kualitas 80%
    });
  },

  // Matikan kamera (agar tidak memakan baterai user)
  stopCamera(stream) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }
};

export default CameraHelper;