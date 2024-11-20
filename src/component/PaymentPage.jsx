import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Implement actual payment gateway logic here
    alert("Payment successful!");
    navigate("/"); // Redirect to home after payment
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>
      <p>Your total amount is ₹[TotalAmount]</p>
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay Now
      </Button>
    </div>
  );
};

export default PaymentPage;
