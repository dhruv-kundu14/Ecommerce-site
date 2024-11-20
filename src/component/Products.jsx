import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PropTypes from 'prop-types';

const ProductList = ({ addToCart, filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      setError(null); // Reset error state on filter change
    
      try {
        // Dynamically build the query string using the filters prop
        const queryString = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) {
              acc[key] = Array.isArray(value) ? value.join(',') : value;
            }
            return acc;
          }, {})
        ).toString();
    
        console.log('Query String:', queryString);
    
        // const endpoint = queryString
        //   ? `http://localhost:5003/api/products?${queryString}`
        //   : 'http://localhost:5002/getProducts'; // Fallback endpoint if no filters
   
        const endpoint = queryString
          ? `https://ecommerce-backend-59dz.onrender.com/common-backend/fetchProducts?${queryString}`
          : 'https://ecommerce-backend-59dz.onrender.com/common-backend/getProducts'; // Fallback endpoint if no filters
   

        const response = await axios.get(endpoint);
    
        // Ensure response is an array
        console.log('API Response:', response.data);
        setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    

    fetchFilteredProducts();
  }, [filters]); // Re-fetch products whenever filters change

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = (product) => {
    setClicked(product._id);
    addToCart(product);
    setTimeout(() => setClicked(null), 1000);
  };

  return (
    <div className="product-list">
      <h3>Featured Products</h3>
      <div className="products">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-item">
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
  filters: PropTypes.object.isRequired,
};

export default ProductList;
