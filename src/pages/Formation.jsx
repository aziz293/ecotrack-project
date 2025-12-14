import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../composants/Layout';

const Formation = () => {
  return (
   <Layout>
     <div className="p-6 max-w-5xl mx-auto" pt-10>
      <h1 className="text-3xl font-bold mb-6">🎓 Espace Formation & Sensibilisation</h1>
      <p className="mb-6 text-gray-700">
        Apprenez et sensibilisez-vous sur les enjeux environnementaux, vos droits et les opportunités durables.
      </p>

      {/* Catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Métiers verts */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">🌱 Les métiers verts</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><a href="#" className="text-green-700 hover:underline">Vidéo : Recyclage, un métier d’avenir</a></li>
            <li><a href="#" className="text-green-700 hover:underline">Fiche : Devenir éco-animateur</a></li>
            <li><a href="#" className="text-green-700 hover:underline">Quiz : Quels métiers pour demain ?</a></li>
          </ul>
        </div>

        {/* Droits citoyens */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">⚖️ Les droits citoyens</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><a href="#" className="text-blue-700 hover:underline">Vidéo : Le droit à un environnement sain</a></li>
            <li><a href="#" className="text-blue-700 hover:underline">Fiche : Agir en tant que citoyen</a></li>
            <li><a href="#" className="text-blue-700 hover:underline">Quiz : Connais-tu tes droits ?</a></li>
          </ul>
        </div>

        {/* Économie circulaire */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">♻️ Économie circulaire</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><a href="#" className="text-yellow-700 hover:underline">Vidéo : Le cycle de vie d’un déchet</a></li>
            <li><a href="#" className="text-yellow-700 hover:underline">Fiche : Réduire, Réutiliser, Recycler</a></li>
            <li><a href="#" className="text-yellow-700 hover:underline">Quiz : Teste ta culture éco</a></li>
          </ul>
        </div>

        {/* Budget participatif */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">♻️ Budget participatif</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><a href="#" className="text-yellow-700 hover:underline">Vidéo :  </a></li>
            <li><a href="#" className="text-yellow-700 hover:underline">Fiche : </a></li>
            <li><a href="#" className="text-yellow-700 hover:underline">Quiz : </a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/dashboard"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-700"
        >
          ← Retour au tableau de bord
        </Link>
      </div>
    </div>
   </Layout>
  );
};

export default Formation;
