import { selectUser } from 'features/auth/authSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
    const auth = useSelector(selectUser);
    return useMemo(() => ({ ...auth }), [auth]);
};

export default useAuth;
