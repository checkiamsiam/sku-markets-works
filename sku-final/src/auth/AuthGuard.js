import useAuth from 'hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMessage } from 'features/message/messageSlice';

export default function AuthGuard({ children }) {
  const user = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  if (!user?.token) return <Navigate to="/login" state={{ from: location }} replace />;

  if (user?.status !== 'active') {
    dispatch(addMessage({ message: 'Please complete your profile first', type: 'info' }));
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
