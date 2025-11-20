import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { updateItem } = useCart();
  return (
    <div className="card">
      {/* Pattern: Lists and Commands - card shows actions consistently */}
      <h3>{product.name}</h3>
      <p>{product.department}</p>
      <p>${product.price}</p>
      <p>Rating: {product.rating}</p>
      <div className="card-actions">
        <Link to={`/product/${product.id}`}>Details</Link>
        <button onClick={() => updateItem(product.id, 1)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
