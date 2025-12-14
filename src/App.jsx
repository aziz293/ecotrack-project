import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EcoBudget from './pages/EcoBudget';
import Signalement from './pages/Signalement';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UsersList from './pages/UsersList';
import CollecteList from './pages/CollecteList';
import Formation from './pages/Formation';
// import Report from './pages/Report';
 //import Learning from './pages/Learning';

 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />    
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eco-budget" element={<EcoBudget />} />
        <Route path="/signalement" element={<Signalement />} />
        <Route path="/utilisateurs" element={<UsersList />} />
        <Route path="/points-collecte" element={<CollecteList />} />
        <Route path="/formation" element={<Formation />} />
        <Route path="/entreprises-transformateurs" element={<entreprises-transformateurs />} />

entreprises-transformateurs
      </Routes>
    </Router>
  );
}

export default App;
