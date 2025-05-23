import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const register = (email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const token = generateToken();
    const newUser = { email, password, token };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Automatically log in after registration
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('currentUser', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
