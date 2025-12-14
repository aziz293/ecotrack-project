import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirm, setConfirm] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (motDePasse !== confirm) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    localStorage.setItem('ecoUser', JSON.stringify({ email, motDePasse }));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Créer un compte</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Mot de passe"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmer le mot de passe"
            className="w-full p-2 border rounded"
          />
          {erreur && <div className="text-red-500 text-sm">{erreur}</div>}
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            S’inscrire
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Déjà inscrit ? <Link to="/" className="text-green-600">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
