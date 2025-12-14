import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'aziz@ecotrack.sn' && motDePasse === '1234') {
      localStorage.setItem('ecoUser', JSON.stringify({ email }));
      navigate('/dashboard');
    } else {
      setErreur('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">🌿 Connexion à EcoTrack</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 font-semibold">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.sn"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {erreur && (
            <div className="text-red-500 text-sm text-center">{erreur}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            ✅ Se connecter
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
          <p>
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-green-700 font-semibold underline hover:text-green-900">
              Créer un compte
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-blue-600 underline hover:text-blue-800">
              Mot de passe oublié ?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
