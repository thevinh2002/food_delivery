import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!email || !password) {
            setErrorMsg('Email và mật khẩu không được để trống.');
            return;
        }

        setLoading(true);
        
        try {
            // Lấy danh sách users từ localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Tìm user trong danh sách
            const user = users.find(u => u.email === email && u.password === password);
            
            setTimeout(() => {
                if (user) {
                    // Đăng nhập thành công
                    const loginSuccess = login(email, password); // Gọi hàm login từ AuthContext
                    if (loginSuccess) {
                        setSuccessMsg('Đăng nhập thành công!');
                        // Lưu thông tin user hiện tại vào localStorage và đánh dấu đã đăng nhập
                        localStorage.setItem('currentUser', JSON.stringify({
                            ...user,
                            isLoggedIn: true
                        }));
                        navigate('/');
                    } else {
                        setErrorMsg('Có lỗi xảy ra khi đăng nhập.');
                    }
                } else {
                    setErrorMsg('Email hoặc mật khẩu không đúng.');
                }
                setLoading(false);
            }, 1000);
        } catch (error) {
            setErrorMsg('Có lỗi xảy ra khi đăng nhập.');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Đăng nhập
                </Typography>

                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

                <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
                    </Button>
                    <Typography align="center" sx={{ mt: 2 }}>
                        Chưa có tài khoản?{' '}
                        <Button onClick={() => navigate('/register')} size="small">Đăng ký</Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
