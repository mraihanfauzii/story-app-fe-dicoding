import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MapHelper = {
  map: null,
  markerLayer: null,

  init(containerId, initialCoords = [0, 0], zoom = 2) {
    // Setup Icon Default
    const defaultIcon = L.icon({
      iconUrl: iconMarker,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = defaultIcon;

    // Inisialisasi Map (Hanya jika container kosong/belum ada map)
    const container = document.getElementById(containerId);
    if (!container) return null;

    // Cek apakah map sudah ada di container ini (re-init prevention)
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.map = L.map(containerId).setView(initialCoords, zoom);

    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    });

    openStreetMap.addTo(this.map);

    const baseMaps = {
      "OpenStreetMap": openStreetMap,
      "Satellite": googleSat,
    };

    L.control.layers(baseMaps).addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);

    return this.map;
  },

  addMarker(coords, { description, url }) {
    if (!this.map || !this.markerLayer) return;

    const marker = L.marker(coords);
    const popupContent = `
      <div style="min-width: 150px; text-align: center;">
        <b>${description}</b><br>
        <a href="${url}" style="color: blue; text-decoration: underline;">Lihat Detail</a>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    this.markerLayer.addLayer(marker);
  },

  clearMarkers() {
    if (this.markerLayer) {
      this.markerLayer.clearLayers();
    }
  }
};

export default MapHelper;