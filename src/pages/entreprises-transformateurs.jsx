"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Chargement dynamique de la carte côté client uniquement
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const useMap = dynamic(() => import("react-leaflet").then(mod => mod.useMap), { ssr: false });

// Icônes personnalisées
const iconMap = {
  entreprise: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968953.png',
    iconSize: [28, 28],
  }),
};

const entreprises = [
  {
    id: 1,
    position: [14.701, -17.45],
    label: "Recyplast - Transformation plastique",
  },
  {
    id: 2,
    position: [14.689, -17.44],
    label: "EcoDéchet Sénégal - Recyclage solide",
  },
  {
    id: 3,
    position: [14.694, -17.435],
    label: "PlastiVert - Collecte et revalorisation",
  },
];

// Recentrage sur la carte si position dynamique (ex. via GPS)
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

export default function EntreprisesPage() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setPosition(null);
        }
      );
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Cartographie des entreprises de transformation des déchets</h1>
      <div className="h-[500px] w-full rounded-xl overflow-hidden shadow">
        <MapContainer center={[14.6928, -17.4467]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {entreprises.map((e) => (
            <Marker key={e.id} position={e.position} icon={iconMap.entreprise}>
              <Popup>{e.label}</Popup>
            </Marker>
          ))}

          {position && (
            <>
              <Marker position={position}>
                <Popup>Votre position</Popup>
              </Marker>
              <RecenterMap position={position} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
