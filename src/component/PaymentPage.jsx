import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";  // Ensure the styles are imported
// import "./PaymentPage.css";  // Import the structured CSS file

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { cartItems: initialCartItems, totalPrice: initialTotalPrice } =
    location.state || {};

  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice || 0);

  const updateQuantity = (itemId, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        const updatedQuantity = Math.max(item.quantity + change, 1);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);

    const newTotalPrice = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const deleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);

    const newTotalPrice = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  // Correctly placed handlePayment function
  const handlePayment = () => {
    // Redirect to CheckoutPage with updated cart data
    navigate("/checkout", {
      state: { cartItems, totalPrice },
    });
  };

  if (!cartItems.length) {
    return <p style={{ color: "black" }}>No cart items found.</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Shopping Cart</h2>

      <ul className="cartItemList">
        {cartItems.map((item) => (
          <li key={item._id} className="cartItem">
            <div className="cartItemImage">
              <img
                src={item.images || "placeholder.jpg"}
                alt={item.name}
                onError={(e) => (e.target.src = "placeholder.jpg")}
              />
            </div>
            <div className="cartItemDetails">
              <strong className="cartItemName">{item.name}</strong>
              <p className="cartItemStock">In stock</p>
              <p className="cartItemColor">Color: {item.color || "Black"}</p>
              <div className="cartItemControls">
                <button
                  onClick={() => updateQuantity(item._id, -1)}
                  className="quantityButton"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, 1)}
                  className="quantityButton"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <span className="cartItemPrice">₹{item.price * item.quantity}</span>
              <button
                onClick={() => deleteItem(item._id)}
                className="deleteButton"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="totalPrice">
        Total Price: ₹{totalPrice}
      </div>

      <div className="checkoutButtonContainer">
        <button
          onClick={handlePayment}
          className="checkoutButton"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
