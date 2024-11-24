


//   import React from "react";
// import PropTypes from "prop-types";
// import { Drawer, IconButton, Divider, Button } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const CartDetail = ({ cartItems, open, onClose, removeItem }) => {
//   const navigate = useNavigate();  // Initialize useNavigate
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleCheckout = () => {
//     // Navigate to the payment page
//     navigate("/payment"); // Update this path to the actual payment page route
//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "300px",
//           padding: "20px",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         }}
//       >
//         <h2>Your Cart</h2>
//         <Divider style={{ margin: "10px 0" }} />

//         <div style={{ flex: 1, overflowY: "auto" }}>
//           {cartItems.length === 0 ? (
//             <p>Your cart is empty!</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <img
//                   src={item.images || "placeholder.jpg"}
//                   alt={item.name}
//                   onError={(e) => (e.target.src = "placeholder.jpg")}
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <h4 style={{ fontSize: "14px", margin: "0" }}>{item.name}</h4>
//                   <p>
//                     {item.quantity} x ₹{item.price}
//                   </p>
//                 </div>

//                 <IconButton
//                   onClick={() => removeItem(item._id)}
//                   aria-label="Remove item"
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               </div>
//             ))
//           )}
//         </div>

//         <Divider style={{ margin: "10px 0" }} />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             fontWeight: "bold",
//           }}
//         >
//           <span>Total</span>
//           <span>₹{totalPrice}</span>
//         </div>

//         <Button
//           variant="contained"
//           color="primary"
//           style={{ marginTop: "20px" }}
//           onClick={handleCheckout} // Use the handleCheckout function to navigate
//           disabled={cartItems.length === 0}
//         >
//           Buy Now
//         </Button>
//       </div>
//     </Drawer>
//   );
// };

// CartDetail.propTypes = {
//   cartItems: PropTypes.array.isRequired,
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   removeItem: PropTypes.func.isRequired,
// };

// export default CartDetail;




import React from "react";
import PropTypes from "prop-types";
import { Drawer, IconButton, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const CartDetail = ({ cartItems, open, onClose, removeItem }) => {
  console.log("CartDetail.jsx: removeItem is a function?", typeof removeItem); // Debugging log

  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/payment", { state: { cartItems, totalPrice } });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h2>Cart</h2>
        <Divider style={{ margin: "10px 0" }} />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.images || "placeholder.jpg"}
                  alt={item.name}
                  onError={(e) => (e.target.src = "placeholder.jpg")}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "14px", margin: "0" }}>{item.name}</h4>
                  <p>
                    {/* {item.quantity} x ₹{item.price} */}
                    ₹{item.price}
                  </p>
                </div>

                <IconButton
                  onClick={() => {
                    if (typeof removeItem === 'function') {
                      console.log("CartDetail.jsx: removeItem function called for id:", item._id); // Debugging log
                      removeItem(item._id);  // Call removeItem if it's a function
                    } else {
                      console.error("removeItem is not a function");
                    }
                  }}
                  aria-label="Remove item"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))
          )}
        </div>

        <Divider style={{ margin: "10px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          {/* <span>Total</span>
          <span>₹{totalPrice}</span> */}
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Cart
        </Button>
      </div>
    </Drawer>
  );
};

CartDetail.propTypes = {
  cartItems: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,  // Ensure this is a function
};

export default CartDetail;

