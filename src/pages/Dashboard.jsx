import React from 'react';
import MapSection from '../composants/MapSection';
import { Link } from 'react-router-dom';
import Layout from '../composants/Layout';
import { FaRecycle, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import StatsChart from '../composants/StatsChart';
import CalendrierActivites from '../composants/CalendrierActivites';

const data = [
  {
    title: "Tonnage de déchets valorisés",
    value: "12,5 T",
    status: "vert",
    description: "Objectif atteint ce mois-ci",
    icon: <FaRecycle className="text-3xl text-green-700" />,
  },
  {
    title: "Activités communautaires en cours",
    value: "3",
    status: "orange",
    description: "2 prévues mais non démarrées",
    icon: <FaUsers className="text-3xl text-yellow-600" />,
  },
  {
    title: "Budget alloué vs dépensé",
    value: "65% utilisé",
    status: "rouge",
    description: "Dépassement budgétaire possible",
    icon: <FaMoneyBillWave className="text-3xl text-red-600" />,
  },
];

const statusColors = {
  vert: "bg-green-50 border-l-4 border-green-500 text-green-800",
  orange: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
  rouge: "bg-red-50 border-l-4 border-red-500 text-red-800",
};

function Dashboard() {
  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📊 Tableau de bord citoyen</h1>

        {/* Section indicateurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl shadow ${statusColors[item.status]}`}
            >
              <div>{item.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
            <StatsChart />
        </div>


        {/* Section carte */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2">📍 Ma commune</h2>
          <p className="text-gray-600 mb-4">
            Visualisez les dépôts signalés, les zones propres et les interventions des CLGD.
          </p>
          <MapSection />
        </div>

        <div className="mt-10">
            <CalendrierActivites />
        </div>
        

        {/* Liens d’action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <Link
            to="/eco-budget"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            💰 <span>Accéder à l’EcoBudget</span>
          </Link>

          <Link
            to="/signalement"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            🛑 <span>Zone de Signalement</span>
          </Link>

          <Link
            to="/formation"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            🎓 <span>Formation & Sensibilisation</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
