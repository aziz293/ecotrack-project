import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const activites = [
  { date: new Date(2025, 5, 21), titre: 'Nettoyage à Médina' },
  { date: new Date(2025, 5, 25), titre: 'Sensibilisation à Guédiawaye' },
  { date: new Date(2025, 5, 30), titre: 'Plantation d’arbres à Rufisque' },
];

const CalendrierActivites = () => {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());

  const activitesDuJour = activites.filter(
    (act) => act.date.toDateString() === dateSelectionnee.toDateString()
  );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">🗓️ Calendrier des Activités</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <Calendar
            onChange={setDateSelectionnee}
            value={dateSelectionnee}
            className="rounded-lg shadow-md p-2"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            Activités du {dateSelectionnee.toLocaleDateString()}
          </h3>
          {activitesDuJour.length > 0 ? (
            <ul className="space-y-2">
              {activitesDuJour.map((act, index) => (
                <li
                  key={index}
                  className="bg-green-100 border border-green-300 rounded px-4 py-2 shadow"
                >
                  ✅ {act.titre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune activité prévue ce jour-là.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendrierActivites;
