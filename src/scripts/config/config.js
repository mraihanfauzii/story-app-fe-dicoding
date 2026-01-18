const CONFIG = {
  BASE_URL: 'https://story-api.dicoding.dev/v1',
  DEFAULT_LANGUAGE: 'en-us',
  
  // Konfigurasi Database (IndexedDB)
  DATABASE_NAME: 'dicoding-story-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'favorite_stories', // Tempat menyimpan cerita favorit
  
  // Konfigurasi Push Notification
  PUSH_MSG_VAPID_PUBLIC_KEY: 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk',
};

export default CONFIG;