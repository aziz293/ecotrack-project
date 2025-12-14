import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Données simulées (points fixes de pollution/CLGD/zones propres)
const points = [
  {
    id: 1,
    type: 'pollution',
    position: [14.6928, -17.4467],
    label: 'Dépôt sauvage signalé par un citoyen',
  },
  {
    id: 2,
    type: 'propre',
    position: [14.695, -17.443],
    label: 'Zone nettoyée par les volontaires',
  },
  {
    id: 3,
    type: 'clgd',
    position: [14.698, -17.44],
    label: 'Intervention CLGD du 5 juin',
  },
];

// Icônes personnalisés
const iconMap = {
  pollution: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/483/483361.png',
    iconSize: [25, 25],
  }),
  propre: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190406.png',
    iconSize: [25, 25],
  }),
  clgd: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [25, 25],
  }),
  user: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png', // icône bleue
    iconSize: [30, 30],
  }),
};

// Pour recentrer la carte quand la position change
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
}

function MapSection({ position, lieu }) {
  return (
    <div className="h-96 w-full mt-8 rounded-xl overflow-hidden shadow">
      <MapContainer
        center={position || [14.6928, -17.4467]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Points prédéfinis */}
        {points.map((p) => (
          <Marker key={p.id} position={p.position} icon={iconMap[p.type]}>
            <Popup>{p.label}</Popup>
          </Marker>
        ))}

        {/* Position de l'utilisateur */}
        {position && (
          <>
            <Marker position={position} icon={iconMap.user}>
              <Popup>{lieu || 'Votre position'}</Popup>
            </Marker>
            <RecenterMap position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapSection;
