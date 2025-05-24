import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import User from './pages/User';
import Pay from './pages/Pay';
import PurchaseHistory from './pages/PurchaseHistory';
import Product from './pages/Product';


import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './router/PrivateRoute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase-history"
            element={
              <PrivateRoute>
                <PurchaseHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/pay"
            element={
              <PrivateRoute>
                <Pay />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
