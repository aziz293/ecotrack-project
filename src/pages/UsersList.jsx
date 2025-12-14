import React, { useState } from 'react';
import Sidebar from '../composants/Sidebar';

const initialUsers = [
  { id: 1, prenom: 'Fatou', nom: 'Diop', telephone: '770000001', email: 'fatou@example.com', role: 'Citoyenne' },
  { id: 2, prenom: 'Mamadou', nom: 'Ndiaye', telephone: '770000002', email: 'mamadou@example.com', role: 'Volontaire' },
  { id: 3, prenom: 'Aïcha', nom: 'Sow', telephone: '770000003', email: 'aicha@example.com', role: 'Agent CLGD' },
  { id: 4, prenom: 'Amadou', nom: 'Ba', telephone: '770000004', email: 'amadou@example.com', role: 'Volontaire' },
  { id: 5, prenom: 'Seynabou', nom: 'Fall', telephone: '770000005', email: 'seynabou@example.com', role: 'Citoyenne' },
  { id: 6, prenom: 'Cheikh', nom: 'Gueye', telephone: '770000006', email: 'cheikh@example.com', role: 'Volontaire' },
  { id: 7, prenom: 'Khady', nom: 'Niane', telephone: '770000007', email: 'khady@example.com', role: 'Agent CLGD' },
  { id: 8, prenom: 'Aliou', nom: 'Cissé', telephone: '770000008', email: 'aliou@example.com', role: 'Volontaire' },
  { id: 9, prenom: 'Mame', nom: 'Diouf', telephone: '770000009', email: 'mame@example.com', role: 'Citoyenne' },
  { id: 10, prenom: 'Binta', nom: 'Kane', telephone: '770000010', email: 'binta@example.com', role: 'Volontaire' },
  { id: 11, prenom: 'Serigne', nom: 'Fallou', telephone: '770000011', email: 'serigne@example.com', role: 'Agent CLGD' },
];

const UsersList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('Tous');
  const [sortKey, setSortKey] = useState('prenom');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ prenom: '', nom: '', telephone: '', email: '', role: 'Citoyenne' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const itemsPerPage = 10;

  const roles = ['Citoyenne', 'Volontaire', 'Agent CLGD'];

  const allFilteredUsers = users
    .filter(user =>
      (`${user.prenom} ${user.nom}`.toLowerCase().includes(search.toLowerCase())) &&
      (filterRole === 'Tous' || user.role === filterRole)
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() ?? '';
      const valB = b[sortKey]?.toLowerCase?.() ?? '';
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const totalPages = Math.ceil(allFilteredUsers.length / itemsPerPage);
  const paginatedUsers = allFilteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleUpdateUser = () => {
    setUsers(users.map(u => u.id === userToEdit.id ? userToEdit : u));
    setEditModalOpen(false);
  };

  const handleAddUser = () => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const added = { id: newId, ...newUser };
    setUsers([added, ...users]);
    setShowModal(false);
    setNewUser({ prenom: '', nom: '', telephone: '', email: '', role: 'Citoyenne' });
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">👥 Liste des Utilisateurs</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Ajouter un utilisateur
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Rechercher un utilisateur..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          >
            <option value="Tous">Tous</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border border-gray-300 rounded shadow-sm overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th onClick={() => toggleSort('prenom')} className="text-left p-3 cursor-pointer hover:bg-gray-200">Prénom</th>
                <th onClick={() => toggleSort('nom')} className="text-left p-3 cursor-pointer hover:bg-gray-200">Nom</th>
                <th className="text-left p-3">📞 Téléphone</th>
                <th className="text-left p-3">✉️ Email</th>
                <th className="text-left p-3">Rôle</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.prenom}</td>
                    <td className="p-3">{user.nom}</td>
                    <td className="p-3">{user.telephone}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {
                          setUserToEdit(user);
                          setEditModalOpen(true);
                        }}
                        className="bg-blue-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-black px-3 py-1 rounded text-sm"
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">← Précédent</button>
          <span className="text-sm text-gray-600">Page {currentPage} sur {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Suivant →</button>
        </div>

        {/* Modal Ajouter */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
              <div className="space-y-3">
                <input type="text" placeholder="Prénom" value={newUser.prenom} onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="text" placeholder="Nom" value={newUser.nom} onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="text" placeholder="Téléphone" value={newUser.telephone} onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full border border-gray-300 p-2 rounded">
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-700">Annuler</button>
                <button onClick={handleAddUser} className="px-4 py-2 bg-green-600 text-white rounded">Ajouter</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Modifier */}
        {editModalOpen && userToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
              <div className="space-y-3">
                <input type="text" placeholder="Prénom" value={userToEdit.prenom} onChange={(e) => setUserToEdit({ ...userToEdit, prenom: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="text" placeholder="Nom" value={userToEdit.nom} onChange={(e) => setUserToEdit({ ...userToEdit, nom: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="text" placeholder="Téléphone" value={userToEdit.telephone} onChange={(e) => setUserToEdit({ ...userToEdit, telephone: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <input type="email" placeholder="Email" value={userToEdit.email} onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })} className="w-full border border-gray-300 p-2 rounded" />
                <select value={userToEdit.role} onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })} className="w-full border border-gray-300 p-2 rounded">
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 border rounded text-gray-700">Annuler</button>
                <button onClick={handleUpdateUser} className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UsersList;