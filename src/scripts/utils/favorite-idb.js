import { openDB } from 'idb';
import CONFIG from '../config/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const FavoriteIdb = {
  async openDb() {
    return openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        // Jika object store belum ada, buat baru
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  },

  async getStory(id) {
    if (!id) return;
    return (await this.openDb()).get(OBJECT_STORE_NAME, id);
  },

  async getAllStories() {
    return (await this.openDb()).getAll(OBJECT_STORE_NAME);
  },

  async putStory(story) {
    // Validasi sederhana: pastikan object story memiliki properti 'id'
    if (!story.hasOwnProperty('id')) return;
    return (await this.openDb()).put(OBJECT_STORE_NAME, story);
  },

  async deleteStory(id) {
    return (await this.openDb()).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteIdb;