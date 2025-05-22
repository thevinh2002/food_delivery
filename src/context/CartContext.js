import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Thêm món vào giỏ hàng
  const addToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        // Nếu món đã có, tăng số lượng
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  // Xóa món khỏi giỏ
  const removeFromCart = (foodId) => {
    setCartItems(prev => prev.filter(item => item.id !== foodId));
  };

  // Cập nhật số lượng món
  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) return; // hoặc có thể xóa luôn món khi số lượng < 1
    setCartItems(prev =>
      prev.map(item =>
        item.id === foodId ? { ...item, quantity } : item
      )
    );
  };

  // Clear toàn bộ giỏ
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook tiện dụng để dùng context
export const useCart = () => useContext(CartContext);
