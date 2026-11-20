import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';
import { ROLE_HOME } from '../../utils/constants';

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Spinner fullPage label="Loading" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || '/'} replace />;
  }

  return <Outlet />;
}
