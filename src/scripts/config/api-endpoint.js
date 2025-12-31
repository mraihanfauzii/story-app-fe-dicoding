import CONFIG from './config';

const API_ENDPOINT = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY_GUEST: `${CONFIG.BASE_URL}/stories/guest`,
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories`,
  DETAIL_STORY: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
};

export default API_ENDPOINT;