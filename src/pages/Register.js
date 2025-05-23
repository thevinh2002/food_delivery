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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || !confirmPassword) {
      setErrorMsg('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Get existing users from localStorage or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      const userExists = existingUsers.some(user => user.email === email);
      
      if (userExists) {
        setLoading(false);
        setErrorMsg('Tài khoản đã tồn tại.');
        return;
      }

      // Add new user
      const newUser = { email, password };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      const success = register(email, password);
      setLoading(false);

      if (success) {
        setSuccessMsg('Đăng ký thành công! Hãy đăng nhập.');
        navigate('/login');
      } else {
        setErrorMsg('Có lỗi xảy ra khi đăng ký.');
      }
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Đăng ký
        </Typography>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          <TextField
            label="Xác nhận mật khẩu"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
