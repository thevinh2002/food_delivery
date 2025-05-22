import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // danh sách người dùng đăng ký

  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const register = (email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const token = generateToken();
    const newUser = { email, password, token };
    setUsers(prev => [...prev, newUser]);

    console.log('✅ Token for user:', token); // chỉ để debug
    return true;
  };

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
