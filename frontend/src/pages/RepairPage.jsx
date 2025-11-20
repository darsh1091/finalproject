import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const RepairPage = () => {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ type: 'Appliance repair', date: '', window: '8-12', note: '' });

  useEffect(() => {
    if (token) api.get('/appointments').then((res) => setAppointments(res.data));
  }, [token]);

  const submit = async () => {
    if (!token) return alert('Login required');
    // Pattern: Forms and Controls - validate date
    if (!form.date) return alert('Date required');
    const res = await api.post('/appointments', form);
    setAppointments((prev) => [...prev, res.data]);
  };

  const cancel = async (id) => {
    await api.post(`/appointments/${id}/cancel`);
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
  };

  return (
    <div className="page">
      <h2>Repair & Delivery Scheduling</h2>
      {/* Pattern: Chunking Information - form grouped in card */}
      <div className="card">
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>Appliance repair</option>
          <option>Home repair</option>
          <option>Delivery window</option>
        </select>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input value={form.window} onChange={(e) => setForm({ ...form, window: e.target.value })} placeholder="Time window" />
        <textarea placeholder="Notes" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <button onClick={submit}>Schedule</button>
      </div>
      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            {a.type} on {a.date} ({a.window}) - {a.status}
            <button onClick={() => cancel(a.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairPage;
