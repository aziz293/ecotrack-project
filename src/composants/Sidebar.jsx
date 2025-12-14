import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('ecoConnecte');
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-green-800 text-white flex justify-between items-center p-4 shadow-md fixed mb-10 w-full top-0 z-[9999]">
        <h1 className="text-xl font-bold">🌍 EcoTrack</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col bg-green-800 text-white w-64 h-screen p-6 fixed top-0 left-0">
        <h2 className="text-2xl font-bold mb-8">🌍 EcoTrack</h2>
        <NavLinks isActive={isActive} handleLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar dropdown */}
      {open && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-green-800 text-white p-4 z-[9999] shadow-md">
          <NavLinks
            isActive={isActive}
            handleLogout={() => {
              setOpen(false);
              handleLogout();
            }}
          />
        </div>
      )}
    </>
  );
};

const NavLinks = ({ isActive, handleLogout }) => (
  <nav className="flex flex-col space-y-4">
    <Link to="/dashboard" className={`hover:text-green-300 ${isActive('/dashboard') ? 'font-bold underline' : ''}`}>🏠 Accueil</Link>
    <Link to="/eco-budget" className={`hover:text-green-300 ${isActive('/eco-budget') ? 'font-bold underline' : ''}`}>💰 EcoBudget</Link>
    <Link to="/signalement" className={`hover:text-green-300 ${isActive('/signalement') ? 'font-bold underline' : ''}`}>📢 Signalement</Link>
    <Link to="/utilisateurs" className={`hover:text-green-300 ${isActive('/utilisateurs') ? 'font-bold underline' : ''}`}>👥 Utilisateurs</Link>
    <Link to="/points-collecte" className={`hover:text-green-300 ${isActive('/points-collecte') ? 'font-bold underline' : ''}`}>♻️ Points de collecte</Link>
    <Link to="/formation" className={`hover:text-green-300 ${isActive('/formation') ? 'font-bold underline' : ''}`}>🎓 Formation</Link>

    <button
      onClick={handleLogout}
      className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      🔓 Se déconnecter
    </button>
  </nav>
);

export default Sidebar;