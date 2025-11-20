import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import api from '../services/api.js';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    api
      .get('/products', { params: { q: query, department, sort } })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [query, department, sort]);

  return (
    <div className="page">
      <header>
        <h1>OnMart Superstore</h1>
        {/* Pattern: Chunking Information - search and filter grouped */}
        <div className="filters">
          <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">All Departments</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Grocery">Grocery</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports">Sports</option>
            <option value="Appliances">Appliances</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </header>
      {/* Pattern: Layout of Screen Elements - grid for catalog */}
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
