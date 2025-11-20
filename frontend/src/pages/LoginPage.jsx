import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('New User');
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    // Pattern: Forms and Controls - validated inputs
    if (!email || !password) return alert('Email and password required');
    if (mode === 'login') await login(email, password);
    else await register({ email, password, name });
    navigate('/');
  };

  return (
    <div className="page">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} className="card">
        {mode === 'register' && <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        Switch to {mode === 'login' ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default LoginPage;
