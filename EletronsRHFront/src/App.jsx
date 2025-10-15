import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContextProvider';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Vagas from './pages/public/Vagas';
import VagaDetalhes from './pages/public/VagaDetalhes';
import Eventos from './pages/public/Eventos';
import EventoDetalhes from './pages/public/EventoDetalhes';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminVagas from './pages/admin/Vagas';
import AdminEventos from './pages/admin/Eventos';
import Areas from './pages/admin/Areas';
import Candidatos from './pages/admin/Candidatos';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/vagas/:id" element={<VagaDetalhes />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<EventoDetalhes />} />
          </Route>

          {/* Admin Login (no layout) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vagas" element={<AdminVagas />} />
            <Route path="vagas/:vagaId/candidatos" element={<Candidatos />} />
            <Route path="eventos" element={<AdminEventos />} />
            <Route path="areas" element={<Areas />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* 404 - Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
