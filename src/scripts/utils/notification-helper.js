import CONFIG from '../config/config';
import StorageHelper from './storage-helper';

const NotificationHelper = {
  async init({ subscribeButton, unsubscribeButton }) {
    this._subscribeButton = subscribeButton;
    this._unsubscribeButton = unsubscribeButton;

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push Messaging not supported');
      return;
    }

    // Tambahkan log untuk debugging
    console.log('NotificationHelper initialized. Checking state...');
    
    await this._initialState();
    await this._initEventListener();
  },

  async _initialState() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Cek apakah registration valid
      if (!registration) {
        console.error('Service Worker registration not found.');
        return;
      }

      const subscription = await registration.pushManager.getSubscription();
      
      // Atur tampilan tombol berdasarkan status langganan
      if (subscription) {
        console.log('User ALREADY subscribed.');
        this._showUnsubscribeButton();
      } else {
        console.log('User NOT subscribed yet.');
        this._showSubscribeButton();
      }
    } catch (error) {
      console.error('Error at _initialState:', error);
      // Fallback: Jika error, tampilkan tombol subscribe agar user bisa mencoba lagi
      this._showSubscribeButton();
    }
  },

  async _initEventListener() {
    this._subscribeButton.addEventListener('click', async (event) => {
      event.preventDefault();
      await this._subscribePush();
    });

    this._unsubscribeButton.addEventListener('click', async (event) => {
      event.preventDefault();
      await this._unsubscribePush();
    });
  },

  async _subscribePush() {
    try {
      console.log('Subscribing...');
      
      // 1. Minta Izin Notifikasi
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // 2. Subscribe ke PushManager Browser
      const registration = await navigator.serviceWorker.ready;
      const subscribeOptions = {
        userVisibleOnly: true,
        // Gunakan Key dari Config
        applicationServerKey: this._urlBase64ToUint8Array(CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY),
      };

      const subscription = await registration.pushManager.subscribe(subscribeOptions);
      console.log('Browser subscribed:', subscription);

      // 3. Kirim data langganan ke API Dicoding
      await this._sendSubscriptionToBackend(subscription);

      // 4. Update UI
      this._showUnsubscribeButton();
      alert('Berhasil mengaktifkan notifikasi!');

    } catch (error) {
      console.error('Failed to subscribe:', error);
      alert('Gagal mengaktifkan notifikasi: ' + error.message);
    }
  },

  async _unsubscribePush() {
    try {
      console.log('Unsubscribing...');
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        alert('Tidak ada langganan yang ditemukan.');
        return;
      }

      // 1. Hapus data di API Dicoding
      try {
        await this._deleteSubscriptionFromBackend(subscription);
      } catch (e) {
        console.warn('Gagal hapus di backend, melanjutkan hapus di browser...', e);
      }

      // 2. Unsubscribe dari Browser
      await subscription.unsubscribe();

      // 3. Update UI
      this._showSubscribeButton();
      alert('Notifikasi dimatikan.');

    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      alert('Gagal mematikan notifikasi: ' + error.message);
    }
  },

  async _sendSubscriptionToBackend(subscription) {
    const token = StorageHelper.getToken();
    
    // Validasi token sebelum kirim
    if (!token) {
      throw new Error('Anda harus login untuk mengaktifkan notifikasi.');
    }

    const subscriptionJson = subscription.toJSON();

    console.log('Sending to backend:', JSON.stringify({
        endpoint: subscriptionJson.endpoint,
        keys: {
          p256dh: subscriptionJson.keys.p256dh,
          auth: subscriptionJson.keys.auth,
        },
    }));

    const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: subscriptionJson.endpoint,
        keys: {
          p256dh: subscriptionJson.keys.p256dh,
          auth: subscriptionJson.keys.auth,
        },
      }),
    });

    const responseJson = await response.json();
    console.log('Backend response:', responseJson);

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
  },

  async _deleteSubscriptionFromBackend(subscription) {
    const token = StorageHelper.getToken();
    if (!token) return; // Tidak perlu error jika logout

    const subscriptionJson = subscription.toJSON();

    const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: subscriptionJson.endpoint,
      }),
    });

    const responseJson = await response.json();
    console.log('Delete Backend response:', responseJson);
    
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  _showSubscribeButton() {
    this._subscribeButton.classList.remove('d-none');
    this._unsubscribeButton.classList.add('d-none');
  },

  _showUnsubscribeButton() {
    this._subscribeButton.classList.add('d-none');
    this._unsubscribeButton.classList.remove('d-none');
  },
};

export default NotificationHelper;