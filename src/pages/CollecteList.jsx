// src/pages/CollecteList.jsx
import React, { useState } from 'react';
import Sidebar from '../composants/Sidebar';
import MapSection from '../composants/MapSection';

const initialPointsCollecte = [
  {
    id: 1,
    nom: 'Parc Hann',
    localisation: 'Avenue Cheikh Anta Diop',
    type: 'Plastique',
    frequence: 'Hebdomadaire',
    proprete: 'Propre',
    commentaires: 'Bien entretenu',
    pointcollecte: 'Point de collecte homologué',
  },
  {
    id: 2,
    nom: 'Marché Tilène',
    localisation: 'Rue 6, Dakar',
    type: 'Organique',
    frequence: 'Quotidienne',
    proprete: 'Sale',
    commentaires: 'Besoin de plus de bacs',
    pointcollecte: 'Point d\'enfouissement',
  },
  {
    id: 3,
    nom: 'Cité Keur Gorgui',
    localisation: 'Rue des Ambassades',
    type: 'Verre',
    frequence: 'Mensuelle',
    proprete: 'Moyen',
    commentaires: 'À surveiller',
    pointcollecte: 'Point de traitement',
  }
];

const typesDePoints = [
  'Point de collecte homologué',
  'Point d\'enfouissement',
  'Point de traitement',
];

const typesDeDechets = ['Plastique', 'Organique', 'Verre'];

const CollecteList = () => {
  const [pointsCollecte, setPointsCollecte] = useState(initialPointsCollecte);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [sortKey, setSortKey] = useState('nom');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pointToEdit, setPointToEdit] = useState(null);
  const itemsPerPage = 5;

  const [newPoint, setNewPoint] = useState({
    nom: '',
    localisation: '',
    type: 'Plastique',
    frequence: '',
    proprete: '',
    commentaires: '',
    pointcollecte: typesDePoints[0],
  });

  const filteredPoints = pointsCollecte
    .filter(p =>
      p.nom.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === 'Tous' || p.pointcollecte === filterType)
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase() ?? '';
      const valB = b[sortKey]?.toLowerCase() ?? '';
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const totalPages = Math.ceil(filteredPoints.length / itemsPerPage);
  const paginatedPoints = filteredPoints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (key) => {
    setSortKey(key);
    setSortAsc(key === sortKey ? !sortAsc : true);
  };

  const handleAddPoint = () => {
    const newId = Math.max(0, ...pointsCollecte.map(p => p.id)) + 1;
    setPointsCollecte([{ id: newId, ...newPoint }, ...pointsCollecte]);
    setNewPoint({
      nom: '',
      localisation: '',
      type: 'Plastique',
      frequence: '',
      proprete: '',
      commentaires: '',
      pointcollecte: typesDePoints[0],
    });
    setShowModal(false);
    setCurrentPage(1);
  };

  const handleUpdatePoint = () => {
    setPointsCollecte(pointsCollecte.map(p => p.id === pointToEdit.id ? pointToEdit : p));
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce point ?')) {
      setPointsCollecte(pointsCollecte.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 p-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold">♻️ Points de Collecte</h1>
          <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            ➕ Ajouter un point de collecte
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded w-full md:w-1/3 lg:w-1/4"
          >
            <option value="Tous">Tous</option>
            {typesDePoints.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                {['nom', 'Type de point', 'localisation', 'type de déchet', 'frequence', 'proprete', 'commentaires'].map(col => (
                  <th key={col} onClick={() => toggleSort(col)} className="p-3 cursor-pointer text-left hover:bg-gray-200 capitalize">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </th>
                ))}
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPoints.length > 0 ? (
                paginatedPoints.map(p => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{p.nom}</td>
                    <td className="p-3">{p.pointcollecte}</td>
                    <td className="p-3">{p.localisation}</td>
                    <td className="p-3">{p.type}</td>
                    <td className="p-3">{p.frequence}</td>
                    <td className="p-3">{p.proprete}</td>
                    <td className="p-3">{p.commentaires}</td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      <button onClick={() => { setPointToEdit(p); setEditModalOpen(true); }}
                        className="bg-blue-400 text-black px-3 py-1 rounded text-sm">✏️</button>
                      <button onClick={() => handleDelete(p.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm">🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="text-center p-4 text-gray-500">Aucun point trouvé.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">← Précédent</button>
          <span className="text-sm text-gray-600">Page {currentPage} sur {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Suivant →</button>
        </div>

        {/* Modal Ajouter */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 space-y-3">
              <h2 className="text-xl font-bold">Ajouter un Point</h2>
              {['nom', 'localisation', 'frequence', 'proprete', 'commentaires'].map(field => (
                <input key={field} type="text" placeholder={field} value={newPoint[field]} onChange={(e) => setNewPoint({ ...newPoint, [field]: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded" />
              ))}
              <select value={newPoint.type} onChange={(e) => setNewPoint({ ...newPoint, type: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded">
                {typesDeDechets.map(type => <option key={type}>{type}</option>)}
              </select>
              <select value={newPoint.pointcollecte} onChange={(e) => setNewPoint({ ...newPoint, pointcollecte: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded">
                {typesDePoints.map(pt => <option key={pt}>{pt}</option>)}
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600">Annuler</button>
                <button onClick={handleAddPoint} className="px-4 py-2 bg-green-600 text-white rounded">Ajouter</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Modifier */}
        {editModalOpen && pointToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 space-y-3">
              <h2 className="text-xl font-bold">Modifier le Point</h2>
              {['nom', 'localisation', 'frequence', 'proprete', 'commentaires'].map(field => (
                <input key={field} type="text" value={pointToEdit[field]} onChange={(e) => setPointToEdit({ ...pointToEdit, [field]: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded" />
              ))}
              <select value={pointToEdit.type} onChange={(e) => setPointToEdit({ ...pointToEdit, type: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded">
                {typesDeDechets.map(type => <option key={type}>{type}</option>)}
              </select>
              <select value={pointToEdit.pointcollecte} onChange={(e) => setPointToEdit({ ...pointToEdit, pointcollecte: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded">
                {typesDePoints.map(pt => <option key={pt}>{pt}</option>)}
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 border rounded text-gray-600">Annuler</button>
                <button onClick={handleUpdatePoint} className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollecteList;
