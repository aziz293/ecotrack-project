import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import Layout from '../composants/Layout';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171'];

const depenses = [
  { poste: 'Ramassage des déchets', montant: 1500000 },
  { poste: 'Recyclage', montant: 800000 },
  { poste: 'Sensibilisation', montant: 300000 },
  { poste: 'Équipements verts', montant: 500000 },
];

const budgetPrevu = 3000000;

const EcoBudget = () => {
  const [commentaire, setCommentaire] = useState('');
  const [commentaires, setCommentaires] = useState([]);
  const [budgetAdmin, setBudgetAdmin] = useState(budgetPrevu);

  const ajouterCommentaire = () => {
    if (commentaire.trim()) {
      setCommentaires([...commentaires, commentaire]);
      setCommentaire('');
    }
  };

  const totalDepense = depenses.reduce((sum, d) => sum + d.montant, 0);
  const pourcentageUtilise = Math.min(Math.round((totalDepense / budgetAdmin) * 100), 100);

  const exportToPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Rapport de dépenses - EcoBudget", 20, 20);

  const tableColumn = ["Poste de dépense", "Montant (FCFA)"];
  const tableRows = depenses.map(dep => [dep.poste, dep.montant.toLocaleString()]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("eco-budget.pdf");
};


const exportToExcel = () => {
  const data = depenses.map(dep => ({
    "Poste de dépense": dep.poste,
    "Montant (FCFA)": dep.montant,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { 'EcoBudget': worksheet }, SheetNames: ['EcoBudget'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'eco-budget.xlsx');
};

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-700"
        >
          ← Retour au tableau de bord
        </Link>

        <h1 className="text-3xl font-bold mt-4 mb-6">💰 Espace EcoBudget</h1>

        <div className="flex flex-wrap gap-4 mt-4">
  <button
    onClick={exportToPDF}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    📄 Exporter en PDF
  </button>
  <button
    onClick={exportToExcel}
    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  >
    📊 Exporter en Excel
  </button>
</div>


        {/* Barre de progression animée */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Utilisation du budget</h2>
          <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-1000 ${
                pourcentageUtilise < 75 ? 'bg-green-500' :
                pourcentageUtilise < 90 ? 'bg-yellow-400' : 'bg-red-500'
              }`}
              style={{ width: `${pourcentageUtilise}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            {pourcentageUtilise}% du budget utilisé ({totalDepense.toLocaleString()} / {budgetAdmin.toLocaleString()} FCFA)
          </p>
        </div>

        {/* Tableau des dépenses */}
        <table className="w-full text-left border-collapse rounded shadow mb-8">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-3 border-b">Poste de dépense</th>
              <th className="p-3 border-b">Montant (FCFA)</th>
            </tr>
          </thead>
          <tbody>
            {depenses.map((dep, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border-b">{dep.poste}</td>
                <td className="p-3 border-b">{dep.montant.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="font-bold bg-green-50">
              <td className="p-3 border-t">Total</td>
              <td className="p-3 border-t">{totalDepense.toLocaleString()} FCFA</td>
            </tr>
          </tbody>
        </table>

        {/* Graphiques */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Graphe camembert */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Répartition des dépenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={depenses}
                  dataKey="montant"
                  nameKey="poste"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {depenses.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Graphe à barres */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Dépenses par poste</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={depenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="poste" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="montant" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commentaires citoyens */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-2">💬 Vos commentaires</h2>
          <textarea
            className="w-full p-3 border rounded mb-2"
            placeholder="Laissez une suggestion ou un avis..."
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
          />
          <button
            onClick={ajouterCommentaire}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Envoyer
          </button>
          <div className="mt-4">
            {commentaires.map((com, i) => (
              <div key={i} className="bg-gray-100 rounded p-3 mb-2 text-sm">
                {com}
              </div>
            ))}
          </div>
        </div>

        {/* Zone admin : modifier budget prévu */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">🔧 Zone d’administration</h2>
          <label className="block text-sm mb-1">Modifier le budget prévu :</label>
          <input
            type="number"
            className="border p-2 rounded w-64"
            value={budgetAdmin}
            onChange={(e) => setBudgetAdmin(Number(e.target.value))}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EcoBudget;
