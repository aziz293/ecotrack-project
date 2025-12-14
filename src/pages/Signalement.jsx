import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapSection from '../composants/MapSection';
import Layout from '../composants/Layout';

const Signalement = () => {
  const [position, setPosition] = useState(null); // [latitude, longitude]
  const [photo, setPhoto] = useState(null);
  const [lieu, setLieu] = useState('');
  const [typeDechet, setTypeDechet] = useState('');
  const [description, setDescription] = useState('');
  const [idee, setIdee] = useState('');
  const [signalements, setSignalements] = useState(() => {
    const saved = localStorage.getItem('ecoSignalements');
    return saved ? JSON.parse(saved) : [];
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const ajouterSignalement = () => {
    if (!lieu || !typeDechet) {
      alert('Lieu et type de déchet requis.');
      return;
    }

    const nouveau = {
      photo,
      lieu,
      typeDechet,
      description,
      idee,
      date: new Date().toLocaleString(),
    };

    const updated = [...signalements, nouveau];
    setSignalements(updated);
    localStorage.setItem('ecoSignalements', JSON.stringify(updated));

    // Réinitialisation
    setPhoto(null);
    setLieu('');
    setTypeDechet('');
    setDescription('');
    setIdee('');
    setPosition(null);
  };

  const getPosition = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setLieu(data.display_name || `Lat: ${latitude}, Lng: ${longitude}`);
        } catch (err) {
          console.error("Erreur reverse geocoding :", err);
          setLieu(`Lat: ${latitude}, Lng: ${longitude}`);
        }
      },
      (error) => {
        alert("Échec de la géolocalisation : " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <Layout>
        <div className="p-6 max-w-3xl mx-auto">
       <Link
                to="/dashboard"
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-700"
              >
                ← Retour au tableau de bord
              </Link>

      <h1 className="text-2xl font-bold mb-4">📢 Zone de Signalement</h1>

      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {photo && (
          <img
            src={photo}
            alt="Aperçu"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <input
          type="text"
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          placeholder="Lieu ou coordonnées"
          className="w-full p-2 border rounded"
          readOnly={!!position}
        />
        <button
          onClick={getPosition}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          📍 Utiliser ma position
        </button>

        {position && <MapSection position={position} lieu={lieu} />}

        <select
          value={typeDechet}
          onChange={(e) => setTypeDechet(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Type de déchet --</option>
          <option value="Plastique">Plastique</option>
          <option value="Décharge sauvage">Décharge sauvage</option>
          <option value="Métaux">Métaux</option>
          <option value="Organique">Organique</option>
          <option value="Autre">Autre</option>
        </select>

        <textarea
          placeholder="Description (facultatif)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Proposez une idée ou une solution"
          value={idee}
          onChange={(e) => setIdee(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={ajouterSignalement}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ Envoyer le signalement
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          📋 Signalements précédents
        </h2>
        {signalements.map((s, i) => (
          <div
            key={i}
            className="border p-3 mb-3 rounded bg-gray-100 space-y-1"
          >
            {s.photo && (
              <img
                src={s.photo}
                alt=""
                className="w-24 h-24 object-cover mb-2"
              />
            )}
            <div>
              <strong>📍 Lieu :</strong> {s.lieu}
            </div>
            <div>
              <strong>♻️ Type :</strong> {s.typeDechet}
            </div>
            {s.description && (
              <div>
                <strong>🗒️ Description :</strong> {s.description}
              </div>
            )}
            {s.idee && (
              <div>
                <strong>💡 Idée :</strong> {s.idee}
              </div>
            )}
            <div>
              <strong>🕒 Date :</strong> {s.date}
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Signalement;
