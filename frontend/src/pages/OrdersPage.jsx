import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) api.get('/orders').then((res) => setOrders(res.data));
  }, [token]);

  const cancel = async (id) => {
    await api.post(`/orders/${id}/cancel`);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o)));
  };

  const chartData = orders.map((o) => ({ name: o.id.slice(0, 5), total: o.total }));

  return (
    <div className="page">
      <h2>Orders</h2>
      {/* Pattern: Interactive Information Graphics - spending chart */}
      <BarChart width={400} height={200} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.id} - ${order.total} - {order.status}
            <button onClick={() => cancel(order.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
