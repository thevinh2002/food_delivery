import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user && location.pathname === '/user') {
        // Nếu chưa đăng nhập và đang truy cập trang user, chuyển hướng về login
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập hoặc không phải trang user, render nội dung con
    return children;
}
