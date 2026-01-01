import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MapHelper = {
  init(containerId, initialCoords = [0, 0], zoom = 2) {
    const defaultIcon = L.icon({
      iconUrl: iconMarker,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;

    const map = L.map(containerId).setView(initialCoords, zoom);

    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    });

    openStreetMap.addTo(map);

    const baseMaps = {
      "OpenStreetMap": openStreetMap,
      "Satellite": googleSat,
    };
    L.control.layers(baseMaps).addTo(map);

    return map;
  },

  addMarker(map, { lat, lon, description }) {
    if (lat && lon) {
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(description || "Lokasi Story");
    }
  }
};

export default MapHelper;