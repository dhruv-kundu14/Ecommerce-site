import React from 'react';
import '../App.css';

const ShoppingCart = ({ cartItems, totalPrice, cartOpen, toggleCart }) => {
  return (
    <div className={`shopping-cart ${cartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="close-cart" onClick={toggleCart}>X</button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="cart-total">
            <h4>Total: ₹{totalPrice}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
