import useAuth from 'hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function VerificationGuard({ children }) {
  const user = useAuth();
  const location = useLocation();

  if (!user?.isEmailVerified) return <Navigate to="/emailConfirmation" state={{ from: location }} replace />;

  return <Outlet />;
}
