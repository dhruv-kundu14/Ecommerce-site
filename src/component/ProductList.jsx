import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/getProducts');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="product-list">
      <h3>Featured Products</h3>
      <div className="products">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id.$oid} className="product">
              <div className='product-up'>
                <img
                  src={product.images || 'placeholder.jpg'}
                  alt={product.name}
                />
              </div>
             
              <div className='product-detail'>
                <h4>{product.name}</h4>
                <p>Price: {product.price} {product.currency}</p>
                <button onClick={() => addToCart(product)}>  {/* Pass the product object */}
                  <ShoppingBagIcon /> Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
