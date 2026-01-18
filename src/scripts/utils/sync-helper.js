import DBHelper from './db-helper';
import Stories from '../network/stories';

const SyncHelper = {
  async syncData() {
    try {
      // 1. Ambil semua data dari IndexedDB
      const pendingStories = await DBHelper.getAllStories();
      
      if (pendingStories.length > 0) {
        console.log(`Syncing ${pendingStories.length} stories...`);
        
        // 2. Loop dan upload satu per satu
        for (const story of pendingStories) {
          try {
            const formData = new FormData();
            formData.append('description', story.description);
            formData.append('photo', story.photo); // Blob/File object
            
            if (story.lat && story.lon) {
              formData.append('lat', story.lat);
              formData.append('lon', story.lon);
            }

            // Kirim ke API
            await Stories.addStory(formData);

            // 3. Jika sukses, hapus dari IndexedDB
            await DBHelper.deleteStory(story.id);
            console.log(`Story ID ${story.id} synced successfully.`);
          } catch (error) {
            console.error(`Failed to sync story ID ${story.id}:`, error);
          }
        }
        
        // Refresh halaman atau beri notifikasi toast
        alert('Sinkronisasi data offline selesai! Cerita Anda telah diterbitkan.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during background sync:', error);
    }
  }
};

export default SyncHelper;