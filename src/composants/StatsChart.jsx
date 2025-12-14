import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', déchets: 8 },
  { name: 'Fév', déchets: 12 },
  { name: 'Mar', déchets: 15 },
  { name: 'Avr', déchets: 10 },
];

const StatsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Évolution mensuelle des déchets collectés</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="déchets" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
