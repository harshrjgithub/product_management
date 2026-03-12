import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/products" replace />;
    }

    return children;
};
