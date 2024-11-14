import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PropTypes from 'prop-types';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/getProducts');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setClicked(product._id);
    addToCart(product);
    setTimeout(() => setClicked(null), 1000);
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <h3>Featured Products</h3>
      <div className="products">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id.$oid} className="product-item">
              <div className="product-image">
                <img
                  src={product.images || 'placeholder.jpg'}
                  alt={product.name}
                  onError={(e) => (e.target.src = 'placeholder.jpg')}
                />
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p>
                  Price: {product.price} {product.currency}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={clicked === product._id}
                >
                  <ShoppingBagIcon />
                  {clicked === product._id ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
