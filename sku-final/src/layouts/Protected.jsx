import useAuth from 'hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Protected = () => {
    const user = useAuth();
    const location = useLocation();

    if (!user?.token)
        return <Navigate to="/login" state={{ from: location }} replace />;

    return <Outlet />;
};

export default Protected;
