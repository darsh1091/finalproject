import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { updateItem } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="page">
      {/* Pattern: Chunking Information - detail split into summary and reviews */}
      <div className="product-detail">
        <div>
          <h2>{product.name}</h2>
          <p>{product.department}</p>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => updateItem(product.id, 1)}>Add to Cart</button>
        </div>
        <div>
          <h3>Reviews</h3>
          {(product.reviews || []).map((r) => (
            <div key={r.id} className="review">
              <p>Rating {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
