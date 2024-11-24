import React, { useState } from "react";

const PaymentMethodSelection = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [balanceCode, setBalanceCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleApplyBalance = () => {
    if (!balanceCode) {
      alert("Please enter a valid code!");
    } else {
      alert(`Balance code "${balanceCode}" applied!`);
    }
  };

  const paymentMethods = [
    {
      id: "card",
      label: "Credit or debit card",
      icons: ["visa", "mastercard", "maestro", "rupay"],
    },
    {
      id: "netBanking",
      label: "Net Banking",
      options: ["HDFC", "SBI", "ICICI", "Axis"],
    },
    { id: "upi", label: "Other UPI Apps" },
    { id: "emi", label: "EMI" },
    { id: "cod", label: "Cash on Delivery/Pay on Delivery" },
  ];

  const addresses = [
    { id: "address1", label: "Home - 123 Main Street, City, State, 12345" },
    {
      id: "address2",
      label: "Work - 456 Office Park, Business District, 67890",
    },
  ];

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        1. Select an address
      </h2>

      {/* Address Selection Section */}
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
        }}
      >
        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
          Delivery Address
        </h3>
        {addresses.map((address) => (
          <div key={address.id} style={{ marginBottom: "10px" }}>
            <input
              type="radio"
              id={address.id}
              name="address"
              value={address.id}
              checked={selectedAddress === address.id}
              onChange={() => handleAddressSelect(address.id)}
              style={{ marginRight: "10px" }}
            />
            <label htmlFor={address.id} style={{ cursor: "pointer" }}>
              {address.label}
            </label>
          </div>
        ))}
        <button
          onClick={() => {
            alert("Add a new address functionality to be implemented!");
          }}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            backgroundColor: "#0073e6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New Address
        </button>
      </div>

      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        2. Select a payment method
      </h2>

      {/* Available Balance Section */}
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
        }}
      >
        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
          Your available balance
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter Code"
            value={balanceCode}
            onChange={(e) => setBalanceCode(e.target.value)}
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleApplyBalance}
            style={{
              padding: "8px 12px",
              backgroundColor: "#0073e6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
        }}
      >
        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
          Another payment method
        </h3>
        {paymentMethods.map((method) => (
          <div key={method.id} style={{ marginBottom: "10px" }}>
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={selectedPaymentMethod === method.id}
              onChange={() => handlePaymentSelect(method.id)}
              style={{ marginRight: "10px" }}
            />
            <label htmlFor={method.id} style={{ cursor: "pointer" }}>
              {method.label}
            </label>
            {method.icons && (
              <div style={{ marginTop: "5px", marginLeft: "25px" }}>
                {method.icons.map((icon) => (
                  <img
                    key={icon}
                    src={`https://example.com/icons/${icon}.png`} // Replace with actual icon URLs
                    alt={icon}
                    style={{ width: "30px", marginRight: "5px" }}
                  />
                ))}
              </div>
            )}
            {method.options && (
              <select
                style={{
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "25px",
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="">Choose an Option</option>
                {method.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            if (!selectedAddress) {
              alert("Please select a delivery address!");
            } else if (!selectedPaymentMethod) {
              alert("Please select a payment method!");
            } else {
              alert(`Address and payment method selected.`);
            }
          }}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f0c14b",
            color: "#111",
            border: "1px solid #a88734",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Use this address and payment method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
