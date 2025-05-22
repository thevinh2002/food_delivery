import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        // Nếu chưa đăng nhập, chuyển hướng về login
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập, render nội dung con
    return children;
}
