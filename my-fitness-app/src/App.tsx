import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar         from './components/Navbar/Navbar';
import DashboardPage  from './pages/DashboardPage';
import NutritionPage  from './pages/NutritionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<DashboardPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
