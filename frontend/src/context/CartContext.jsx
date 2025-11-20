import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (token) {
      api.get('/cart').then((res) => setItems(res.data));
    }
  }, [token]);

  const updateItem = async (productId, quantity) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === productId);
      if (existing) return prev.map((p) => (p.productId === productId ? { ...p, quantity } : p));
      return [...prev, { productId, quantity }];
    });
    if (token) await api.post('/cart', { productId, quantity });
  };

  const removeItem = async (productId) => {
    setItems((prev) => prev.filter((p) => p.productId !== productId));
    if (token) await api.delete(`/cart/${productId}`);
  };

  const clearCart = () => setItems([]);

  return <CartContext.Provider value={{ items, updateItem, removeItem, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
