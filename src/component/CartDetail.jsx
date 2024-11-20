  // import React from "react";
  // import PropTypes from "prop-types";
  // import { Drawer, IconButton, Divider, Button } from "@mui/material";
  // import CloseIcon from "@mui/icons-material/Close";

  // const CartDetail = ({ cartItems, open, onClose, removeItem }) => {
  //   const totalPrice = cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );

  //   return (
  //     <Drawer anchor="right" open={open} onClose={onClose}>
  //       <div
  //         style={{
  //           width: "100%", // Adjust to 100% for responsiveness
  //           maxWidth: "300px", // Max width to constrain
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

  //                 {/* The remove button should be inside the map loop */}
  //                 <IconButton
  //                   onClick={() => {
  //                     console.log(removeItem); // Check if it's a function
  //                     removeItem(item._id); // Make sure item._id is valid
  //                   }}
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
  //           onClick={() => alert("Proceeding to checkout!")}
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
  //   removeItem: PropTypes.func.isRequired, // Make sure this is set as a function
  // };

  // export default CartDetail;


  import React from "react";
import PropTypes from "prop-types";
import { Drawer, IconButton, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const CartDetail = ({ cartItems, open, onClose, removeItem }) => {
  const navigate = useNavigate();  // Initialize useNavigate
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Navigate to the payment page
    navigate("/payment"); // Update this path to the actual payment page route
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
        <h2>Your Cart</h2>
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
                    {item.quantity} x ₹{item.price}
                  </p>
                </div>

                <IconButton
                  onClick={() => removeItem(item._id)}
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
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleCheckout} // Use the handleCheckout function to navigate
          disabled={cartItems.length === 0}
        >
          Buy Now
        </Button>
      </div>
    </Drawer>
  );
};

CartDetail.propTypes = {
  cartItems: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartDetail;
