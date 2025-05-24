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

    // Nếu chưa đăng nhập và đang truy cập trang user, pay hoặc purchase-history, chuyển hướng về login
    if (!user && (location.pathname === '/user' || location.pathname === '/pay' || location.pathname === '/purchase-history')) {
        return <Navigate to="/login" replace />;
    }

    // Các trường hợp khác render bình thường
    return children;
}
