import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

const CartPage = () => {
  const { items, updateItem, removeItem, clearCart } = useCart();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('123 Demo St');
  const [payment, setPayment] = useState({ cardNumber: '', name: '', expiry: '' });

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  const total = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const checkout = async () => {
    if (!token) return alert('Login required');
    // Pattern: Forms and Controls - validation before submit
    if (!payment.cardNumber || !payment.name) return alert('Payment data required');
    await api.post('/orders', { items, address, payment });
    clearCart();
    alert('Order placed');
  };

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {/* Pattern: Lists and Commands - items with actions */}
      <ul>
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <li key={item.productId}>
              {product?.name} qty
              <input type="number" value={item.quantity} onChange={(e) => updateItem(item.productId, Number(e.target.value))} />
              <button onClick={() => removeItem(item.productId)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <p>Subtotal: ${total.toFixed(2)}</p>
      {/* Pattern: Chunking Information - payment grouped */}
      <div className="card">
        <h3>Checkout</h3>
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input placeholder="Card number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
        <input placeholder="Name" value={payment.name} onChange={(e) => setPayment({ ...payment, name: e.target.value })} />
        <input placeholder="Expiry" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
        <button onClick={checkout}>Pay & Order</button>
      </div>
    </div>
  );
};

export default CartPage;
