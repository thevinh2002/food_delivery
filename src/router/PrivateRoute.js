import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    // Nếu đã đăng nhập và đang ở trang login/register thì chuyển về trang chủ
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
        return <Navigate to="/" replace />;
    }

    // Nếu chưa đăng nhập và đang truy cập trang user, chuyển hướng về login
    if (!user && location.pathname === '/user') {
        return <Navigate to="/login" replace />;
    }

    // Các trường hợp khác render bình thường
    return children;
}
