import { openDB } from 'idb';

const DATABASE_NAME = 'dicoding-story-db';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'stories-offline';

const DBHelper = {
  async openDb() {
    return openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        // Jika object store belum ada, buat baru
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  },

  async addStory(story) {
    const db = await this.openDb();
    return db.add(OBJECT_STORE_NAME, story);
  },

  async getAllStories() {
    const db = await this.openDb();
    return db.getAll(OBJECT_STORE_NAME);
  },

  async deleteStory(id) {
    const db = await this.openDb();
    return db.delete(OBJECT_STORE_NAME, id);
  },
};

export default DBHelper;