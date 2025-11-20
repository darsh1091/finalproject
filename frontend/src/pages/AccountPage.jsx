import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const AccountPage = () => {
  const { user } = useAuth();
  if (!user) return <p>Please login.</p>;
  return (
    <div className="page">
      <h2>Account</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default AccountPage;
