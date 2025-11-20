import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import ProductPage from './ProductPage.jsx';
import CartPage from './CartPage.jsx';
import OrdersPage from './OrdersPage.jsx';
import LoginPage from './LoginPage.jsx';
import AccountPage from './AccountPage.jsx';
import RepairPage from './RepairPage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const App = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      {/* Pattern: Layout of Screen Elements - persistent top nav for wayfinding */}
      <nav className="top-nav">
        <Link to="/">OnMart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/repairs">Repairs</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <button onClick={logout}>Logout {user.name}</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/repairs" element={<RepairPage />} />
      </Routes>
    </div>
  );
};

export default App;
