import API_ENDPOINT from '../config/api-endpoint';
import StorageHelper from '../utils/storage-helper';

class Stories {
  static async getAll() {
    try {
      const token = StorageHelper.getToken();
      
      const response = await fetch(API_ENDPOINT.GET_ALL_STORIES, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.listStory;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengambil daftar cerita');
    }
  }

  static async getDetail(id) {
    try {
      const token = StorageHelper.getToken();
      const response = await fetch(API_ENDPOINT.DETAIL_STORY(id), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.story;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengambil detail cerita');
    }
  }

  static async addStory(storyData) {
    try {
      const token = StorageHelper.getToken();
      
      const response = await fetch(API_ENDPOINT.ADD_STORY, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: storyData,
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupload cerita');
    }
  }
}

export default Stories;