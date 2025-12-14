import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Mot de passe oublié</h2>
        {envoye ? (
          <p className="text-green-600 text-center">
            📩 Si cet email existe, un lien vous a été envoyé.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700">
              Envoyer un lien de réinitialisation
            </button>
          </form>
        )}
        <p className="mt-4 text-sm text-center">
          <Link to="/" className="text-yellow-600">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
