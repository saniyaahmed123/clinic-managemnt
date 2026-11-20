import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROLE_HOME } from './utils/constants';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicOnlyRoute from './components/routes/PublicOnlyRoute';
import Spinner from './components/ui/Spinner';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorsPage from './pages/patient/DoctorsPage';
import DoctorDetailPage from './pages/patient/DoctorDetailPage';
import BookAppointmentPage from './pages/patient/BookAppointmentPage';
import MyAppointmentsPage from './pages/patient/MyAppointmentsPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointmentsPage from './pages/doctor/DoctorAppointmentsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';

function IndexRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Spinner fullPage label="Loading" />
      </div>
    );
  }

  if (user) return <Navigate to={ROLE_HOME[user.role] || '/'} replace />;
  return <HomePage />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexRoute />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={['patient']} />}>
        <Route element={<AppShell />}>
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/doctors" element={<DoctorsPage />} />
          <Route path="/patient/doctors/:id" element={<DoctorDetailPage />} />
          <Route path="/patient/book" element={<BookAppointmentPage />} />
          <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['doctor']} />}>
        <Route element={<AppShell />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route element={<AppShell />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
